import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ChartsModule } from 'ng2-charts'
import { HttpClientModule } from '@angular/common/http'
import { VirtualScrollModule } from 'angular2-virtual-scroll'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { ApiService } from './api.service'
import { MaterialModule } from './material.module'
import { AppRoutingModule } from './app-routing.module'

const modules = [
  FormsModule,
  CommonModule,
  ChartsModule,
  MaterialModule,
  HttpClientModule,
  AppRoutingModule,
  VirtualScrollModule,
]

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
  ]
})
export class SharedModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ApiService]
    }
  }
}
