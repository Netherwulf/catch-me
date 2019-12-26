import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../users/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserDataModel} from '../shared/user-data.model';
import {Observable} from 'rxjs';
import {OfferModel} from '../shared/offer.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  hide = true;
  offers: Observable<any[]>;
  categories: string[];

  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.offers = db.list('offers').valueChanges();
    this.categories = ['Figurki', 'Gry planszowe', 'Plakaty'];
    // this.createForm();
  }

  // createForm() {
  //   this.registerForm = this.fb.group({
  //     email: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  title = new FormControl(null, [Validators.required]);
  category = new FormControl(null, [Validators.required]);
  description = new FormControl(null, [Validators.required]);
  city = new FormControl(null, [Validators.required]);
  exchangeList = new FormControl(null);

  getTitleErrorMessage() {
    return this.title.hasError('required') ? 'Pole wymagane' : '';
  }

  getCategoryErrorMessage() {
    return this.category.hasError('required') ? 'Pole wymagane' : '';
  }

  getDescriptionErrorMessage() {
    return this.description.hasError('required') ? 'Pole wymagane' : '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'Pole wymagane' : '';
  }

  getExchangeListErrorMessage() {
    return this.exchangeList.hasError('required') ? 'Pole wymagane' : '';
  }

  tryAddOffer() {
    let offersCount: number = null;
    let email = '';
    let doOnce = false;
    this.userService.getCurrentUser()
      .then(res => {
        email = res.email;
        console.log(email);
        this.offers.subscribe(offer => {
          console.log(offer);
          const offers = offer as OfferModel[];
          // offers = offers.filter(singleOffer => singleOffer.userId === email);  TO USE LATER FOR DISPLAYING SPECIFIED USER OFFERS
          offersCount = offers.length + 1;
          if (doOnce === false) {
            const createdOffer = {
              title: this.title.value,
              category: this.category.value,
              description: this.description.value,
              city: this.city.value,
              exchangeList: this.exchangeList.value.split(', '),
              userId: email
            };
            console.log('Offers count: ' + offersCount.toString());
            this.userService.createOffer(createdOffer, offersCount.toString());
            this.errorMessage = '';
            this.successMessage = 'Oferta została dodana pomyślnie';
            doOnce = true;
            this.title.reset();
            this.category.reset();
            this.description.reset();
            this.city.reset();
            this.exchangeList.reset();
          }
          // console.log('Offers length: ' + offersCount.toString());
          // this.router.navigate(['/user']);
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
        });
        });
      }

  ngOnInit() {
  }

}
