import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../shared/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserDataModel} from '../shared/user-data.model';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Observable<any[]>;
  user: FirebaseUserModel = new FirebaseUserModel();
  userData: UserDataModel;


  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    public db: AngularFireDatabase,
    public router: Router
  ) {
    this.users = db.list('users').valueChanges();
    // this.getUsersList();
    // console.log(this.users);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(res => {
        const email = res.email;
        console.log(email);
        this.users.subscribe(user => {
          console.log(user);
          let usersData = user as UserDataModel[];
          usersData = usersData.filter(userData => userData.email === email);
          this.userData = usersData[0];
        });
      });
  }

  onOffersView() {
    this.router.navigate(['myOffers']);
  }

}
