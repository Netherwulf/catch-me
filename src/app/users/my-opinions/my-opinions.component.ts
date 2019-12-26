import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {OfferModel} from "../../shared/offer.model";
import {OpinionModel} from "../../shared/opinion.model";
import {UserService} from "../user.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";
import {UserDataModel} from "../../shared/user-data.model";

@Component({
  selector: 'app-my-opinions',
  templateUrl: './my-opinions.component.html',
  styleUrls: ['./my-opinions.component.css']
})
export class MyOpinionsComponent implements OnInit {

  opinions: Observable<any[]>;
  myOpinions: OpinionModel[];
  user: UserDataModel;

  constructor(public userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              public db: AngularFireDatabase,
              public router: Router) {
    this.opinions = db.list('opinions').valueChanges();
    this.user = this.router.getCurrentNavigation().extras.state.user;
  }

  ngOnInit() {
    this.opinions.subscribe(opinion => {
      console.log(opinion);
      let opinionsData = opinion as OpinionModel[];
      opinionsData = opinionsData.filter(opinionElement => opinionElement.authorId === this.user.email);
      this.myOpinions = opinionsData;
    });
  }

  onBackToUserPage() {
    this.router.navigate(['/user']);
  }
}
