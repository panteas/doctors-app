import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  AngularFirestoreModule,
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'models/user';
import * as firebase from 'firebase/compat/app';
import * as fireabse from 'firebase/compat';
import 'firebase/compat/firestore';
import { from, of, Observable } from 'rxjs';
import { catchError, flatMap, map, mergeMap, take } from 'rxjs/operators';

import { ToastService } from '../toast.service';
import { formatNumber } from '@angular/common';
import { Doctor } from 'models/doctor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  doctorsCollections: AngularFirestoreCollection<Doctor>;
  doctors: Observable<Doctor[]>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private route: Router,
    private toastService: ToastService
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  googleSignIn() {
    this.auth
      .signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      .then((userCredential) => {
        this.updateUserData(
          userCredential.user,
          'user',
          userCredential.user.displayName
        );
        this.route.navigate(['/tabs/discover']);
      })
      .catch((err) => this.errorHandler(err));
  }

  registerNewUser(user) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        this.updateUserData(userCredentials.user, 'user', user.fullName);
        this.route.navigate(['/tabs/discover']);
      })
      .catch((err) => this.errorHandler(err));
  }

  currentUser(userUID) {
    return from(this.db.doc(`users/${userUID}`).valueChanges());
  }

  getAppointments(appUID) {
    return from(this.db.doc(`appointments/${appUID}`).valueChanges());
  }

  login(user) {
    this.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((_) => this.route.navigate(['tabs/discover']))
      .catch((err) => this.errorHandler(err));
  }

  logout() {
    return this.auth.signOut().then((_) => {
      localStorage.removeItem('user');
      this.route.navigate(['/login']);
    });
  }

  sendPasswordReset(email) {
    this.auth.sendPasswordResetEmail(email);
    this.toastService.displaySuccess('Reset password link sent to your email');
  }

  public getOneDoctor(uid) {
    return from(
      this.db
        .collection('/doctors', (ref) => ref.where('uid', '==', uid))
        .valueChanges()
    );
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  addAppointmentIDtoDoctor(doctorUID, appointmentUID) {
    console.log('DOCTOR IN AUTH: ' + doctorUID);

    firebase.default.firestore.FieldValue.arrayUnion(appointmentUID);

    const dbRef = this.db.doc(`doctors/${doctorUID}`);

    return dbRef
      .set(
        {
          appointments:
            firebase.default.firestore.FieldValue.arrayUnion(appointmentUID),
        },
        { merge: true }
      )
      .then(() => console.log('UPDATED in doctors'))
      .catch((err) => console.log('ERROR ', err));
  }

  getAppointmentsFromDoctor(doctorUID) {
    return from(this.db.doc(`doctors/${doctorUID}`).valueChanges());
  }

  addAppointmentIDtoUser(userUID, appointmentUID) {
    console.log('USER IN AUTH: ' + userUID);

    const dbRef = this.db.doc(`users/${userUID}`);

    return dbRef
      .set(
        {
          appointments:
            firebase.default.firestore.FieldValue.arrayUnion(appointmentUID),
        },
        { merge: true }
      )
      .then(() => console.log('UPDATED in users'))
      .catch((err) => console.log('ERROR ', err));
  }

  public getAllDoctors(): Observable<Doctor[]> {
    return from(this.db.collection<Doctor>('doctors').valueChanges());
  }

  private updateUserData(
    user: fireabse.default.User,
    role: string,
    name?: string
  ) {
    const userRef: AngularFirestoreDocument = this.db.doc(`users/${user.uid}`);

    const data = {
      email: user.email,
      fullName: user.displayName || name,
      role,
    };

    return userRef.set(data, { merge: true });
  }

  private errorHandler(err) {
    this.toastService.displayError(err);
    return of([]);
  }
}
