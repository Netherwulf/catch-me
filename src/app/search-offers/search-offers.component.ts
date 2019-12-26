import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../users/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {OfferModel} from "../shared/offer.model";

@Component({
  selector: 'app-find-offer',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.css']
})
export class SearchOffersComponent implements OnInit {

  errorMessage = '';
  successMessage = '';
  hide = true;
  offers: Observable<any[]>;
  foundOffers: OfferModel[] = [];
  categories: string[];

  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.categories = ['Figurki', 'Gry planszowe', 'Plakaty'];
    this.offers = db.list('offers').valueChanges();
  }

  title = new FormControl(null);
  category = new FormControl(null);
  city = new FormControl(null);

  ngOnInit() {
  }

  tryFindOffers() {
    let title = this.title.value;
    let category = this.category.value;
    let city = this.city.value;

    this.offers.subscribe(offer => {
      // console.log(offer);
      let offersData = offer as OfferModel[];
      console.log(offersData);
      offersData = offersData.filter(offerElement =>
        (offerElement.title.includes(title) || title === null)
        && (offerElement.category === category || category === null)
        && (offerElement.city === city || city === null));
      this.foundOffers = offersData;
      this.title.reset();
      this.category.reset();
      this.city.reset();
    });
  }

  onOfferSelected(offer: OfferModel) {
    this.router.navigate(['offerDetails'], {'state': {'offer': offer}})
  }

}
