import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';

import { UserModel} from '../models/user.model';

import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //       public name: string,
  //       public specialty: string,
  //       public imageUrl: string,
  //       public userId: string,

  private _users = new BehaviorSubject<UserModel[]>(
    [
      new UserModel(
        'Mom (Admin/Y)',
        'Dermatology',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=124&q=80',
        'abc'
      ),
      new UserModel(
        'Dad ',
        'The Dad',
        'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=124&q=80',
        'abc'
      ),
      new UserModel(
        'Teacher',
        'School Teacher',
        'https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=124&q=80',
        'abc'
      ),

  ]);

  private _userTest: UserModel[] = [
    {
      name: 'School Teacher',
      specialty: 'School Teacher',
      photo: 'https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=124&q=80',
      userId: 'abc'
    }
];

get userTest() {
  return [...this._userTest];
}



  get users() {
    return this._users.asObservable(); //gives us a subscribable object - but will not allow us to emmit new events
  }

  addUser(
    name: string,
    specialty: string,
    // imageUrl: string,
  ) {
      const newUser = new UserModel(
        name,
        specialty,
        'https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=124&q=80',
        Math.random().toString(), // later we will generate this through the backend server
    );
    this.users.pipe(take(1)).subscribe(users => {
      this._users.next(users.concat(newUser));
    });

  }

}