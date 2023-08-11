import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './modules/main/main.module';
import { LoginModule } from './modules/auth/login/login.module';
import { RegModule } from './modules/auth/reg/reg.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    LoginModule,
    RegModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
