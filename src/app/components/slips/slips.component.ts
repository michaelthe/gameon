import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'go-user',
  templateUrl: './slips.component.html',
  styleUrls: ['./slips.component.scss']
})
export class SlipsComponent implements OnInit {
  public user

  constructor (private apiService: ApiService) {}

  public ngOnInit () {
    this.apiService
      .user()
      .subscribe((user: any) => {
        this.user = user
      })
  }
}
