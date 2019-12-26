import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {OpinionModel} from "../../shared/opinion.model";
import {UserDataModel} from "../../shared/user-data.model";
import {UserService} from "../user.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
  selector: 'app-opinions-received',
  templateUrl: './opinions-received.component.html',
  styleUrls: ['./opinions-received.component.css']
})
export class OpinionsReceivedComponent implements OnInit {

  opinions: Observable<any[]>;
  opinionsReceived: OpinionModel[];
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
      opinionsData = opinionsData.filter(opinionElement => opinionElement.recipientId === this.user.email);
      this.opinionsReceived = opinionsData;
    });
  }

  onBackToUserPage() {
    this.router.navigate(['/user']);
  }
}
