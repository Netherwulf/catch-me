import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../shared/user.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    // this.getUsersList();
    // console.log(this.users);
  }

  ngOnInit(): void {
    // this.route.data.subscribe(routeData => {
    //   let data = routeData['data'];
    //   if (data) {
    //     this.user = data;
    //     this.createForm(this.user.name);
    //   }
    // })
    // this.userService.getCurrentUser()
    //   .then(res => {
    //     console.log(res);
    //     const users = this.userService.getUserByEmail(res.email)
    //       .then()
    //     console.log(users);
    //     this.user = users[0];
    //   }, err => {
    //     console.log(err);
    //   });

  }

  getUsersList() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      this.users = users;
    });
  }

  // createForm(name) {
  //   this.profileForm = this.fb.group({
  //     name: [name, Validators.required]
  //   });
  // }
  //
  // save(value) {
  //   this.userService.updateCurrentUser(value)
  //     .then(res => {
  //       console.log(res);
  //     }, err => console.log(err))
  // }
  //
  // logout() {
  //   this.authService.doLogout()
  //     .then((res) => {
  //       this.location.back();
  //     }, (error) => {
  //       console.log("Logout error", error);
  //     });
  // }

}
