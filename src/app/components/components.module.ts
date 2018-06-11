import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BettingComponent } from './betting/betting.component';
import { SlipsComponent } from './slips/slips.component';
import { LogoutComponent } from './logout/logout.component';
import { BetComponent } from './bet/bet.component';

const components = [
  HomeComponent,
  LoginComponent,
  SignupComponent,
  LogoutComponent,
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: components,
  declarations: [
    ...components,
    BetComponent,
    MatchComponent,
    SlipsComponent,
    BettingComponent,
  ]
})
export class ComponentsModule {}
