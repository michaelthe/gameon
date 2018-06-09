import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const components = [
  HomeComponent,
  LoginComponent,
  SignupComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  exports: components,
  declarations: [
    ...components,
    MatchComponent,
  ]
})
export class ComponentsModule {}
