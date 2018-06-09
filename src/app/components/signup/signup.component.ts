import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../api.service';

@Component({
  selector: 'go-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public email = '';
  public nickname = '';
  public username = '';
  public password = '';

  constructor (private apiService: ApiService, private snackBar: MatSnackBar) { }

  public ngOnInit () {

  }

  public signup () {
    this.apiService
      .signup(this.email, this.nickname, this.username, this.password)
      .subscribe(res => {
        window.location.href = '/home';
      }, error => {
        this.snackBar.open(error.error.message, 'ok');
      });
  }
}
