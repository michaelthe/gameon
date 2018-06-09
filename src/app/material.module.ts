import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatFormFieldModule, MatButtonToggleModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatButtonToggleModule
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule {}
