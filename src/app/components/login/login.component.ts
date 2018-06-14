import { Component } from '@angular/core'
import { MatSnackBar } from '@angular/material'

import { ApiService } from '../../api.service'

@Component({
  selector: 'go-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username = ''
  public password = ''

  constructor (private apiService: ApiService, private snackBar: MatSnackBar) {
  }

  public login () {
    this.apiService
      .login(this.username, this.password)
      .subscribe(res => {
        window.location.href = '/home'
      }, error => {
        this.snackBar.open(error.error.message, 'ok')
      })
  }
}
