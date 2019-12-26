import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../users/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDataModel} from "../shared/user-data.model";
import {FormControl, Validators} from "@angular/forms";
import {OfferModel} from "../shared/offer.model";
import {Observable} from "rxjs";
import {OpinionModel} from "../shared/opinion.model";

@Component({
  selector: 'app-add-opinion',
  templateUrl: './add-opinion.component.html',
  styleUrls: ['./add-opinion.component.css']
})
export class AddOpinionComponent implements OnInit {

  user: UserDataModel;
  grades: string[];
  errorMessage = '';
  successMessage = '';
  opinions: Observable<any[]>;

  constructor(public db: AngularFireDatabase,
              public authService: AuthService,
              public userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.opinions = db.list('opinions').valueChanges();
    this.user = this.router.getCurrentNavigation().extras.state.user;
    this.grades = ['1', '2', '3', '4', '5']
  }

  text = new FormControl(null, [Validators.required]);
  grade = new FormControl(null, [Validators.required]);

  ngOnInit() {
  }

  getTextErrorMessage() {
    return this.text.hasError('required') ? 'Pole wymagane' : '';
  }

  tryAddOpinion() {
    let email: string = '';
    let doOnce = false;
    this.userService.getCurrentUser()
      .then(res => {
        email = res.email;
        console.log(email);
        this.opinions.subscribe(opinion => {
          console.log(opinion);
          const opinions = opinion as OpinionModel[];
          let opinionsCount = opinions.length + 1;
          if (doOnce === false) {
            const createdOpinion = {
              text: this.text.value,
              grade: this.grade.value,
              authorId: email,
              recipientId: this.user.email
            };
            console.log('Offers count: ' + opinionsCount.toString());
            this.userService.createOpinion(createdOpinion, opinionsCount.toString());
            this.errorMessage = '';
            this.successMessage = 'Opinia została dodana pomyślnie';
            doOnce = true;
            this.text.reset();
            this.grade.reset();
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

}
