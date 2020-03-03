import {Component} from '@angular/core'

import {ApiService, User} from '../../api.service'

import {LoadingComponent} from '../LoadingCompont';

@Component({
  selector: 'go-user',
  templateUrl: './slips.component.html',
  styleUrls: ['./slips.component.scss']
})
export class SlipsComponent extends LoadingComponent {
  public user: User;

  constructor(
    private apiService: ApiService
  ) {
    super()
  }

  load() {
    console.log('Loading user...');
    this.apiService
      .user()
      .subscribe(user => {
        this.user = user;
      });
  }
}
