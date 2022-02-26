import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/objects/User';
import { UserService } from 'src/app/services/user.service';
import {MatDialog, DialogPosition} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]);

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
    // Do nothing.
  }

  ngOnInit(): void {
    // Do nothing.
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value.';
    }

    return this.username.hasError('email') ? 'Not a valid email.' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value.';
    }

    return this.password.hasError('pattern') ? 'Not a valid password. Must be between 8-20 characters, must contain letters (upper and lower case), at least 1 number, and 1 special character.' : '';
  }

  validateAndLogin(){
    // Perform validation on username field.
    if(!this.username.valid){
      this.username.markAsTouched();
      document.getElementById("UsernameField")?.focus();
      return;
    }

    // Perform validation on password field.
    if(!this.password.valid){
      this.password.markAsTouched();
      document.getElementById("PasswordField")?.focus();
      return;
    }

    let user: User;

    user = new User(this.username.value, this.password.value);

    // Save the username in local storage if credentials are correct else show error message.
    if(this.userService.login(user)){
      sessionStorage.setItem('loggedInUser', user.username);
      this.router.navigate(['/']);
    }
    else{
      let dialogPosition: DialogPosition = {};

      dialogPosition.top = "20px"
      this.dialog.open(DialogComponent, {
        position: dialogPosition,
        width: '500px',
        data: {title: "Login Failed", details: "Recheck your credentials and try again."}
      });
    }
  }
}