import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './users/user.component';
import {LoginComponent} from './login/login.component';

import { UserResolver } from './users/user.resolver';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {MatListModule} from '@angular/material';
import {MatSidenavModule} from "@angular/material/sidenav";
import { AddOfferComponent } from './add-offer/add-offer.component';
import {MatSelectModule} from "@angular/material/select";
import { MyOffersComponent } from './users/my-offers/my-offers.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { SearchUsersComponent } from './search-users/search-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    AddOfferComponent,
    MyOffersComponent,
    SearchOffersComponent,
    OfferDetailsComponent,
    SearchUsersComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatSelectModule,
        MatGridListModule,
        // imports firebase/auth, only needed for auth features
    ],
  providers: [AuthService, AngularFirestoreModule, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
