import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegistrationComponent } from './components/registration/registration/registration.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthPageComponent, LoginComponent, RegistrationComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [AuthPageComponent, LoginComponent, RegistrationComponent],
})
export class AuthModule {}
