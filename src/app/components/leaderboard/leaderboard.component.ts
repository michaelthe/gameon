import {Component} from '@angular/core'

import {ApiService} from '../../api.service'

import {LoadingComponent} from '../LoadingCompont';

@Component({
  selector: 'go-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent extends LoadingComponent {
  public users = [];
  public colors = [{backgroundColor: ['#e53935', '#1E88E5', '#43A047']}];

  constructor(private apiService: ApiService) {
    super()
  }

  load() {
    console.log('Loading leaderboard...');
    this.apiService
      .leaderboard()
      .subscribe((users: any[]) => {
        this.users = users;
      })
  }
}
