// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { forkJoin, from, Observable, of } from 'rxjs';
// import { mergeMap, map } from 'rxjs/operators';
// import { Identifiable } from 'models/identifiable';
// import { User } from 'models/user';

// @Injectable({
//   providedIn: 'root',
// })
// export class LocalStorageService {
//   constructor(private storage: Storage) {}

//   setCurrentUser(user: User): Observable<User> {
//     return this.setItemWithKey('currentUser', user).pipe(
//       map((cachedUser) => new User(cachedUser)),
//       mergeMap((newUser) => this.setItem<User>(newUser))
//     );
//   }

//   setItemWithKey<T>(key: string, item: T): Observable<T> {
//     if (!key || !key.length || !item) {
//       return of(undefined);
//     }

//     return from(this.storage.set(key, item).then((newItem) => newItem as T));
//   }

//   setItem<T extends Identifiable>(item: T): Observable<T> {
//     if (!item) {
//       return of(undefined);
//     }

//     return from(
//       this.storage.set(item.uid, item).then((newItem) => newItem as T)
//     );
//   }
// }
