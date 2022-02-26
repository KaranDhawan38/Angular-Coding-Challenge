import { Injectable } from '@angular/core';
import { User } from 'src/app/objects/User';
import { MockUsers } from '../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    // Do nothing.
  }

  /**
     * This method is used to login the user.
     * Return true if user exists.
     */
   login(user: User): boolean{
    // Real API call will be made here. Right now just mocking data from file.
    let userExists = false;

    // Iterate through all users and check if the user exists.
    MockUsers.forEach(mockUser => {
      if(mockUser.username === user.username && mockUser.password === user.password){
        userExists = true;
        return;
      }
    }); 
    return userExists;
  }

  /**
   * This method will return wheather username is present in session storage or not.
   */
   isSessionPresent(): boolean{
    return !!sessionStorage.getItem('loggedInUser'); // !! will convert value to boolean and return. 
  }
}
