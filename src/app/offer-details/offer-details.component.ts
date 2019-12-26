import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../users/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OfferModel} from "../shared/offer.model";
import {Observable} from "rxjs";
import {UserDataModel} from "../shared/user-data.model";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  offer: OfferModel;
  users: Observable<any[]>;
  userData: UserDataModel;

  constructor(public db: AngularFireDatabase,
              public authService: AuthService,
              public userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.users = db.list('users').valueChanges();
    this.offer = this.router.getCurrentNavigation().extras.state.offer;
  }

  ngOnInit() {
    let email = this.offer.userId;
    this.users.subscribe(user => {
      console.log(user);
      let usersData = user as UserDataModel[];
      usersData = usersData.filter(userData => userData.email === email);
      this.userData = usersData[0];
    });
  }

}
