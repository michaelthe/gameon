import {Component, OnDestroy, OnInit} from '@angular/core'
import {ApiService} from '../../api.service'

@Component({
  selector: 'go-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  public users = [];
  public colors = [{backgroundColor: ['#e53935', '#1E88E5', '#43A047']}];

  private _time = 0;
  private _destroy = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this._load()
  }

  public ngOnDestroy() {
    this._destroy = true
  }

  private _load() {
    if (this._destroy) {
      return
    }

    if (Date.now() < this._time) {
      return requestAnimationFrame(() => {
        setTimeout(() => this._load(), 1000)
      })
    }

    console.log('Loading leaderboard...');
    this._time = Date.now() + 60 * 1000;

    this.apiService
      .leaderboard()
      .subscribe((users: any[]) => {
        this.users = users;

        this._load()
      })
  }
}
