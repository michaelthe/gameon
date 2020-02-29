import {Component, OnDestroy, OnInit} from '@angular/core'

import {ApiService, User} from '../../api.service'

@Component({
  selector: 'go-user',
  templateUrl: './slips.component.html',
  styleUrls: ['./slips.component.scss']
})
export class SlipsComponent implements OnInit, OnDestroy {
  public user: User;

  private _time = 0;
  private _destroy = false;

  constructor(
    private apiService: ApiService
  ) {
  }

  public ngOnInit() {
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

    console.log('Loading user...');
    this._time = Date.now() + 60 * 1000;

    this.apiService
      .user()
      .subscribe(user => {
        this.user = user;

        this._load()
      });
  }
}
