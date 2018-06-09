import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public odds = [];

  constructor (private apiService: ApiService) { }

  public ngOnInit () {
    if (!this.apiService.isLoggedIn) {
      return window.location.href = '/login';
    }

    this.apiService
      .odds()
      .subscribe(async (odds: any[]) => this.odds = odds);
  }
}
