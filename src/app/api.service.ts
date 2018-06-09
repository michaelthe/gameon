import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _token = '';
  private _isLoggedIn = false;
  private _apiEndpoint = 'https://gameon-world.herokuapp.com';

  private _odds: Odd[] = [];
  private _teams = {};
  private _matches = {};

  private _odds$: ReplaySubject<Odd[]> = new ReplaySubject(1);

  constructor (private httpClient: HttpClient) {
    this._token = window.localStorage.getItem('token') || '';
    this._isLoggedIn = !!this._token;

    this._teams = JSON.parse(window.localStorage.getItem('teams')) || {};
    this._matches = JSON.parse(window.localStorage.getItem('matches')) || {};

    this.httpClient
      .get(this._apiEndpoint + '/odds', {headers: {Authorization: 'Bearer-' + this._token}})
      .subscribe((odds: Odd[]) => {
        this._odds = odds;
        this._odds$.next(this._odds);
      });

    this.user().subscribe();
  }

  public get isLoggedIn () {
    return this._isLoggedIn;
  }

  public login (username, password) {
    return this.httpClient
      .post(this._apiEndpoint + '/login', {username, password})
      .pipe(tap(response => {
        this._isLoggedIn = true;
        this._token = response['access_token'];
        window.localStorage.setItem('token', this._token);
      }));
  }

  public signup (email, nickname, username, password) {
    return this.httpClient
      .post(this._apiEndpoint + '/user', {email, nickname, username, password})
      .pipe(tap(response => {
        this._isLoggedIn = true;
        this._token = response['access_token'];
        window.localStorage.setItem('token', this._token);
      }));
  }

  public user () {
    return this.httpClient
      .get(this._apiEndpoint + '/user', {headers: {Authorization: 'Bearer ' + this._token}})
      .pipe(tap((user: any) => {
        console.log({user});
      }));
  }

  public odds () {
    return this._odds$;
  }

  public match (id) {
    if (this._matches[id]) {
      return of(this._matches[id]);
    }

    return this.httpClient
      .get(this._apiEndpoint + '/match?id=' + id, {headers: {Authorization: 'Bearer-' + this._token}})
      .pipe(tap((match: Match) => {
        this._matches[match.id] = match;
        window.localStorage.setItem('matches', JSON.stringify(this._matches));
        console.log({match});
      }));
  }

  public team (id) {
    if (this._teams[id]) {
      return of(this._teams[id]);
    }

    return this.httpClient
      .get(this._apiEndpoint + '/team?id=' + id, {headers: {Authorization: 'Bearer-' + this._token}})
      .pipe(tap((team: Team) => {
        this._teams[team.id] = team;
        window.localStorage.setItem('teams', JSON.stringify(this._teams));
        console.log({team});
      }));
  }

  public select (oddId: number, bet: BET) {
    this._odds.forEach(odd => {
      if (odd.id !== oddId) {
        return;
      }

      odd.selected = odd.selected === bet ? BET.NONE : bet;
    });

    this._odds$.next(this._odds);
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
