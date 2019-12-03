import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth/auth.guard';
import {UserResolver} from './users/user.resolver';
import {UserComponent} from './users/user.component';
import {LoginComponent} from './login/login.component';
import {AddOfferComponent} from './add-offer/add-offer.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, resolve: {data: UserResolver}},
  {path: 'addOffer', component: AddOfferComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
