import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {ChartsModule} from 'ng2-charts'
import {HttpClientModule} from '@angular/common/http'
import {VirtualScrollModule} from 'angular2-virtual-scroll'
import {ModuleWithProviders, NgModule} from '@angular/core'

import {ApiService} from './api.service'
import {MaterialModule} from './material.module'
import {SlipFilterPipe} from './slipFilter.pipe'
import {AppRoutingModule} from './app-routing.module'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    HttpClientModule,
    VirtualScrollModule,

    MaterialModule,
    AppRoutingModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    HttpClientModule,
    VirtualScrollModule,

    MaterialModule,
    SlipFilterPipe,
    AppRoutingModule,
  ],
  declarations: [
    SlipFilterPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [ApiService]
    }
  }
}
