import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { RegistrationComponent } from './components/registration/registration.component';



@NgModule({
  declarations: [
    RegPageComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegModule { }
