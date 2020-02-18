import {switchMap} from 'rxjs/operators'
import {Component, Input, OnInit} from '@angular/core'
import {ApiService, Match, Odd} from '../../api.service'

@Component({
  selector: 'go-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {

  @Input() public bet;

  public odd;
  public match;
  public homeTeam;
  public awayTeam;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService
      .odd(this.bet.oddId)
      .pipe(switchMap((odd: Odd) => {
        this.odd = odd;
        return this.apiService.match(this.odd.matchId)
      }))
      .subscribe((match: Match) => {
        this.match = match;

        this.apiService
          .team(this.match.homeTeamId)
          .subscribe(team => this.homeTeam = team);

        this.apiService
          .team(this.match.awayTeamId)
          .subscribe(team => this.awayTeam = team)
      })
  }
}
