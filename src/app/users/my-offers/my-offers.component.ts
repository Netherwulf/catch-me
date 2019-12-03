import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {UserDataModel} from '../../shared/user-data.model';
import {OfferModel} from '../../shared/offer.model';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  offers: Observable<any[]>;
  myOffers: OfferModel[];

  constructor(public userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              public db: AngularFireDatabase,
              public router: Router) {
    this.offers = db.list('offers').valueChanges();
  }

  ngOnInit() {
    this.userService.getCurrentUser()
      .then(res => {
        const email = res.email;
        console.log(email);
        this.offers.subscribe(offer => {
          console.log(offer);
          let offersData = offer as OfferModel[];
          offersData = offersData.filter(offerElement => offerElement.userId === email);
          this.myOffers = offersData;
        });
      });
  }

  onBackToUserPage() {
    this.router.navigate(['/user']);
  }

}
