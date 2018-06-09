import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule.forRoot(),
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
