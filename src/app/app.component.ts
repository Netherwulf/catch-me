import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catch-me';
  @ViewChild('sidenav', { static: false, }) sideNav: MatSidenav;

  constructor(public router: Router) {
  }

  public onSidenavClose() {
    this.sideNav.close();
  }

  public onMainSiteSelect() {
    this.router.navigate(['/']);
    this.sideNav.close();
  }

  public onUserSiteSelect() {
    this.router.navigate(['/user']);
    this.sideNav.close();
  }

  public onAddOfferSelect() {
    this.router.navigate(['/addOffer']);
    this.sideNav.close();
  }

  public onSearchOffersSelect() {
    this.router.navigate(['/searchOffers']);
    this.sideNav.close();
  }
}
