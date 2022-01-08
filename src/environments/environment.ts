// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const environment = {
  firebase: {
    projectId: 'doctor-appointment-d790f',
    appId: '1:1012737270762:web:87206b8d284d6a9c3b8893',
    databaseURL: 'https://doctor-appointment-d790f-default-rtdb.firebaseio.com',
    storageBucket: 'doctor-appointment-d790f.appspot.com',
    apiKey: 'AIzaSyANFsKpZBbI58-wfjJI-M1M2mG019En0Hs',
    authDomain: 'doctor-appointment-d790f.firebaseapp.com',
    messagingSenderId: '1012737270762',
    measurementId: 'G-7N5JJ951X2',
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
