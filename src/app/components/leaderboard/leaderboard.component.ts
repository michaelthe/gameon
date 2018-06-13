import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'go-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  public users = [];
  public colors = [{backgroundColor: ['#43A047', '#e53935', '#1E88E5']}];

  constructor (private apiService: ApiService) { }

  ngOnInit () {
    this.apiService.leaderboard().subscribe((users: any[]) => this.users = users);
  }
}
