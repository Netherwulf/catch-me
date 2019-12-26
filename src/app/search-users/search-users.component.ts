import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {OfferModel} from "../shared/offer.model";
import {UserDataModel} from "../shared/user-data.model";
import {AngularFireDatabase} from "@angular/fire/database";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../users/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  errorMessage = '';
  successMessage = '';
  hide = true;
  users: Observable<any[]>;
  foundUsers: UserDataModel[] = [];

  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.users = db.list('users').valueChanges();
  }

  email = new FormControl(null);
  name = new FormControl(null);
  surname = new FormControl(null);
  phoneNumber = new FormControl(null);


  ngOnInit() {
  }

  tryFindUsers() {
    let email = this.email.value;
    let name = this.name.value;
    let surname = this.surname.value;
    let phoneNumber = this.phoneNumber.value;

    this.users.subscribe(user => {
      // console.log(offer);
      let usersData = user as UserDataModel[];
      console.log(usersData);
      usersData = usersData.filter(userElement =>
        (userElement.email.includes(email) || email === null)
        && (userElement.name === name || name === null)
        && (userElement.surname === surname || surname === null)
        && (userElement.phoneNumber === phoneNumber || phoneNumber === null));
      this.foundUsers = usersData;
      this.email.reset();
      this.name.reset();
      this.surname.reset();
      this.phoneNumber.reset();
    });
  }

  onUserSelected(user: UserDataModel) {
    this.router.navigate(['otherUser'], {'state': {'user': user}})
  }
}
