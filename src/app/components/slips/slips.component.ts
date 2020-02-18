import {ApiService, User} from '../../api.service'
import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'go-user',
  templateUrl: './slips.component.html',
  styleUrls: ['./slips.component.scss']
})
export class SlipsComponent implements OnInit {
  public user;

  constructor(private apiService: ApiService) {
  }

  public ngOnInit() {
    this.apiService
      .user()
      .subscribe((user: User) => {
        this.user = user
      })
  }
}
