import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'go-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  public users = []
  public colors = [{backgroundColor: ['#e53935', '#1E88E5', '#43A047']}]

  constructor (private apiService: ApiService) { }

  ngOnInit () {
    this.apiService.leaderboard().subscribe((users: any[]) => {
      let verifiedUsers = users.filter(user => user.verified === true)
      let inactiveUsers = users.filter(user => user.verified === false)
      this.users = [...verifiedUsers,...inactiveUsers]
    })
  }
}
