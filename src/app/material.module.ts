import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material'

const modules = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule {}
