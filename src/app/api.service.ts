import * as moment from 'moment'

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map, switchMap, tap } from 'rxjs/operators'
import { of, ReplaySubject, timer } from 'rxjs'

import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public isLoggedIn$ = new ReplaySubject(1)

  private _token = ''

  private _activeOdds: Odd[] = []

  private _odds = {}
  private _teams = {}
  private _matches = {}
  private _selected = {}

  private _odds$: ReplaySubject<Odd[]> = new ReplaySubject(1)
  private _version = '00004'

  constructor (private httpClient: HttpClient) {
    if (window.localStorage.getItem('version') !== this._version) {
      window.localStorage.clear()
      window.localStorage.setItem('version', this._version)
    }

    this._odds = JSON.parse(window.localStorage.getItem('odds')) || {}
    this._teams = JSON.parse(window.localStorage.getItem('teams')) || {}
    this._matches = JSON.parse(window.localStorage.getItem('matches')) || {}
    this._selected = JSON.parse(window.localStorage.getItem('selected')) || {}

    this._token = window.localStorage.getItem('token') || ''

    this.user()
      .subscribe(res => {
        this.isLoggedIn$.next(true)

        timer(0, 30 * 1000)
          .pipe(switchMap(_ => this.httpClient.get(environment.apiEndpoint + '/odds', this._options())))
          .subscribe((odds: Odd[]) => {
            this._activeOdds = odds
            this._nextOdds()
          })
      }, error => {
        window.localStorage.setItem('token', this._token = '')
        this.isLoggedIn$.next(false)
      })
  }

  public login (username, password) {
    return this.httpClient
      .post(environment.apiEndpoint + '/login', {username, password})
      .pipe(tap(response => {
        window.localStorage.setItem('token', this._token = response['access_token'])
        this.isLoggedIn$.next(true)
      }))
  }

  public signup (email, nickname, username, password) {
    return this.httpClient
      .post(environment.apiEndpoint + '/user', {email, nickname, username, password})
      .pipe(tap(response => {
        window.localStorage.setItem('token', this._token = response['access_token'])
        this.isLoggedIn$.next(true)
      }))
  }

  public logout () {
    return this.httpClient
      .get(environment.apiEndpoint + '/logout', this._options())
      .pipe(tap(() => {
        window.localStorage.setItem('token', this._token = '')
        this.isLoggedIn$.next(false)

        window.location.href = '/login'
      }))
  }

  public user () {
    return this.httpClient
      .get(environment.apiEndpoint + '/user', this._options())
    // .pipe(map((user: any) => {
    // user.slip = user.slip.reverse();
    // return user;
    // }));
  }

  public leaderboard () {
    return this.httpClient.get(environment.apiEndpoint + '/leaderboard', this._options())
  }

  public odds () {
    return this._odds$
  }

  public odd (id) {
    if (this._odds[id]) {
      return of(this._odds[id])
    }

    return this.httpClient
      .get(environment.apiEndpoint + '/odd?id=' + id, this._options())
      .pipe(tap((odd: Odd) => {
        this._odds[odd.id] = odd
        window.localStorage.setItem('odds', JSON.stringify(this._odds))
      }))
  }

  public match (id) {
    if (this._matches[id] && (Date.now() < this._matches[id].startTime || this._matches[id].startTime + 3 * 60 * 60 * 1000 < Date.now())) {
      return of(this._matches[id])
    }

    return this.httpClient
      .get(environment.apiEndpoint + '/match?id=' + id, this._options())
      .pipe(map((match: Match) => {
        this._matches[match.id] = match

        // add date
        this._matches[id].date = moment(this._matches[id].startTime).format('ddd, Do HH:mm')

        window.localStorage.setItem('matches', JSON.stringify(this._matches))

        this._nextOdds()
        return this._matches[match.id]
      }))
  }

  public team (id) {
    if (this._teams[id]) {
      return of(this._teams[id])
    }

    return this.httpClient
      .get(environment.apiEndpoint + '/team?id=' + id, this._options())
      .pipe(tap((team: Team) => {
        this._teams[team.id] = team
        window.localStorage.setItem('teams', JSON.stringify(this._teams))
      }))
  }

  public toggle (matchId: number, bet: BET) {
    this._selected[matchId] = this._selected[matchId] === bet ? BET.NONE : bet
    window.localStorage.setItem('selected', JSON.stringify(this._selected))
    this._nextOdds()
  }

  public discard () {
    this._selected = {}
    window.localStorage.setItem('selected', JSON.stringify(this._selected))
    this._nextOdds()
  }

  public bet (amount) {
    const bets = this._activeOdds
      .filter(odd => odd.selected && odd.selected !== BET.NONE)
      .map(odd => ({oddId: odd.id, selected: odd.selected}))

    return this.httpClient
      .post(environment.apiEndpoint + '/slip', {bets, amount}, this._options())
      .pipe(tap(() => this.discard()))
  }

  private _nextOdds () {
    this._activeOdds
      .forEach(odd => {
        odd.selected = this._selected[odd.matchId] || BET.NONE
      })

    const sorted = this._activeOdds
      .sort((a: Odd, b: Odd) => {
        const now = Date.now()
        const ma = this._matches[a.matchId] ? this._matches[a.matchId].startTime : now
        const mb = this._matches[b.matchId] ? this._matches[b.matchId].startTime : now

        return ma - mb
      })

    this._odds$.next(sorted)
  }

  private _options () {
    return {headers: {Authorization: 'Bearer ' + this._token}}
  }
}

export enum BET {
  HOME = 'home',
  DRAW = 'draw',
  AWAY = 'away',
  NONE = 'none',
}

export interface Odd {
  id: number;
  active: boolean;
  selected: BET;
  matchId: number;
  odds: { home: number, draw: number, away: number };
}

export interface Match {
  id: number;
  date: string;
  score: string;
  result: string;
  startTime: number;
  awayTeamId: number;
  homeTeamId: number;
}

export interface Team {
  id: number;
  name: string;
  country: string;
  logo_url: string;
}
