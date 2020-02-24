import {Component, OnInit} from '@angular/core'

import {ApiService, User} from '../../api.service'

@Component({
  selector: 'go-user',
  templateUrl: './slips.component.html',
  styleUrls: ['./slips.component.scss']
})
export class SlipsComponent implements OnInit {
  public user: User;

  constructor(
    private apiService: ApiService
  ) {
  }

  public ngOnInit() {
    this.apiService
      .user()
      .subscribe(user => {
        this.user = user;
      })
  }
}
