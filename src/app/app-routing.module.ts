import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth/auth.guard';
import {UserResolver} from './users/user.resolver';
import {UserComponent} from './users/user.component';
import {LoginComponent} from './login/login.component';
import {AddOfferComponent} from './add-offer/add-offer.component';
import {MyOffersComponent} from './users/my-offers/my-offers.component';
import {SearchOffersComponent} from "./search-offers/search-offers.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, resolve: {data: UserResolver}},
  {path: 'myOffers', component: MyOffersComponent},
  {path: 'addOffer', component: AddOfferComponent},
  {path: 'searchOffers', component: SearchOffersComponent},
  {path: 'offerDetails', component: OfferDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
