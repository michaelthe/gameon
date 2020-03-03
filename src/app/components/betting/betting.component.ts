import {Component} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar';

import {ApiService, BET, Odd} from '../../api.service'

import {LoadingComponent} from '../LoadingCompont';

@Component({
  selector: 'go-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent extends LoadingComponent {
  public odds: Odd[] = [];
  public amount: number;
  public betting: Odd[] = [];
  public loading = false;
  public showSlip = false;


  constructor(
    private snackBar: MatSnackBar,
    private apiService: ApiService,
  ) {
    super();
    this.amount = JSON.parse(window.localStorage.getItem('amount')) || 1
  }

  public get potential() {
    return (this.amount * this.betting.reduce((multiple, bet) => multiple * bet.odds[bet.selected], 1)).toFixed(2)
  }

  public amountChange() {
    window.localStorage.setItem('amount', JSON.stringify(this.amount))
  }

  public bet() {
    this.loading = true;
    this.apiService.bet(this.amount)
      .subscribe((result: { message: string }) => {
        this.loading = false;
        this.snackBar.open(result.message, 'ok')
      }, error => {
        this.loading = false;
        this.snackBar.open(error.error.message, 'ok')
      })
  }

  public discard() {
    this.apiService.discard();
    this.amount = 1
  }

  load() {
    console.log('Loading odds...');
    this.apiService
      .odds()
      .subscribe(async (odds: Odd[]) => {
        this.odds = odds;
        this.betting = odds.filter(odd => odd.selected && odd.selected !== BET.NONE);
      })
  }
}
