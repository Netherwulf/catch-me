import { Component, OnInit } from '@angular/core';
import {UserDataModel} from "../shared/user-data.model";
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../users/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {

  user: UserDataModel;

  constructor(public db: AngularFireDatabase,
              public authService: AuthService,
              public userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.user = this.router.getCurrentNavigation().extras.state.user;
  }

  ngOnInit() {
  }

  onOpinionAdd() {
    this.router.navigate(['addOpinion'], {'state': {'user': this.user}})
  }

}
