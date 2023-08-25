import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/pages/auth-page/auth-page.component';
import { MainPageComponent } from './modules/main/pages/main-page/main-page.component';
import { EndPageComponent } from './modules/main/components/end/pages/end-page/end-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'two-up', component: MainPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'end', component: EndPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
