import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { SlipsComponent } from './components/slips/slips.component'
import { LoginComponent } from './components/login/login.component'
import { LogoutComponent } from './components/logout/logout.component'
import { SignupComponent } from './components/signup/signup.component'
import { BettingComponent } from './components/betting/betting.component'
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'slips', component: SlipsComponent},
      {path: 'betting', component: BettingComponent},
      {path: 'leaderboard', component: LeaderboardComponent},
      {path: '**', redirectTo: '/home/betting', pathMatch: 'full'}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
