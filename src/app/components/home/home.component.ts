import { Component, OnInit } from '@angular/core';
import { ApiService, BET, Odd } from '../../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor (private apiService: ApiService) {}

  public ngOnInit () {
    this.apiService
      .isLoggedIn$
      .subscribe(loggedIn => {
        if (!loggedIn) {
          return window.location.href = '/login';
        }
      });
  }
}
