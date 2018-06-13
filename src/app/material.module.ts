import { NgModule } from '@angular/core';
import {
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
} from '@angular/material';

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
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule {}
