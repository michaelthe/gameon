import { Component, Input, OnInit } from '@angular/core'
import { ApiService, BET, Match, Odd, Team, User } from '../../api.service'

@Component({
  selector: 'go-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() public odd: Odd

  public bet = BET
  public match: Match
  public homeTeam: Team
  public awayTeam: Team
  public betCount = 0

  constructor (private apiService: ApiService) {}

  ngOnInit () {
    this.apiService
      .match(this.odd.matchId)
      .subscribe((match: Match) => {
        this.match = match
        this.apiService
          .team(this.match.homeTeamId)
          .subscribe(team => this.homeTeam = team)

        this.apiService
          .team(this.match.awayTeamId)
          .subscribe(team => this.awayTeam = team)
      })

    this.apiService
      .user()
      .subscribe(async (user: User) => {
        const activeSlips = user.slips.filter(slip => slip.status === 'pending')
        for (const slip of activeSlips) {
          for (const bet of slip.bets) {
            const odd = <Odd> (await this.apiService.odd(bet.oddId).toPromise())

            if (odd.matchId === this.odd.matchId) {
              this.betCount++
            }
          }
        }
      })
  }

  public toggle (bet: BET) {
    this.apiService.toggle(this.odd.matchId, bet)
  }
}
