import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFireAction, AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserDataModel} from '../shared/user-data.model';
import {FirebaseListObservable} from "@angular/fire/database-deprecated";

@Injectable()
export class UserService {

  userRef: AngularFireObject<any>;
  usersRef: AngularFireList<UserDataModel[]> = null;
  offersRef;
  // users: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  // users: Observable<any[]>;
  email: BehaviorSubject<string|null>;
  usersList: FirebaseListObservable<any>;
  users: Subscription;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    this.usersRef = db.list('/users'); // This is of type FirebaseListObservable
  }

  getUsersList(email: string) {
    return this.users;
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

  createUser(value) {

    this.userRef = this.db.object('/users/' + value.email.split('.').join('_'));
    this.userRef.set({
      email: value.email,
      password: value.password,
      name: value.name,
      surname: value.surname,
      phoneNumber: value.phoneNumber
    });
  }

  createOffer(value, index: string) {
    this.offersRef = this.db.object('/offers/' + index);
    this.offersRef.set({
      title: value.title,
      category: value.category,
      description: value.description,
      city: value.city,
      exchangeList: value.exchangeList,
      userId: value.userId
    });
  }

  createOpinion(value, index: string) {
    this.offersRef = this.db.object('/opinions/' + index);
    this.offersRef.set({
      text: value.text,
      grade: value.grade,
      authorId: value.authorId,
      recipientId: value.recipientId
    });
  }

  getUserData(email) {
    return new Promise<UserDataModel>((resolve, reject) => {
      this.db.list('/users', ref => ref.orderByChild('email').equalTo(email));
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
