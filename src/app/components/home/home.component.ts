import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'go-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loading = true

  constructor (private apiService: ApiService) {}

  public ngOnInit () {
    this.apiService
      .isLoggedIn$
      .subscribe(loggedIn => {
        if (!loggedIn) {
          return window.location.href = '/login'
        }
      })

    setTimeout(() => {
      window.localStorage.setItem('loaded', 'true')
      this.loading = false
    }, window.localStorage.getItem('loaded') === 'true' ? 2000 : 10000)
  }
}
