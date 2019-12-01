import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  userRef: AngularFireObject<any>;
  user: Observable<any>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    this.user = this.userRef.valueChanges();
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getUsersCount() {
    const usersListRef = this.db.list('/users', ref => ref.orderByChild('name'));
    return usersListRef.length;
  }

  createUser(value) {

    this.userRef = this.db.object('/users' + );
    this.userRef.set({
      email: value.email,
      password: value.password,
      name: value.name,
      surname: value.surname,
      phoneNumber: value.phoneNumber
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}
