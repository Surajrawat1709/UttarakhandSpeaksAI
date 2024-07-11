import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LlamaChatApiService } from '../../llama-chat-api.service';
import { SharedService } from '../../shared.service';
import { HeaderComponent } from '../../ChatPage/header/header.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSignDivVisiable: boolean = true;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  message: string = '';

  constructor(
    private router: Router,
    private llamaservice: LlamaChatApiService,
    private sharedService: SharedService
  ) {}

  onRegister() {
    alert('Registration Success');
    this.sharedService.changeData(this.signUpObj.name);
    this.llamaservice
      .createUser(this.signUpObj.name, this.signUpObj.name)
      .subscribe(
        (response) => {
          this.message = response.message;
          console.log(this.message);
        },
        (error) => {
          console.error('Error creating user:', error);
          this.message = 'An error occurred while creating the user.';
        }
      );
    const localUser = localStorage.getItem('angular17users');
    if (localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users));
    }
  }

  onLogin() {
    const localUsers = localStorage.getItem('angular17users');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);

      const isUserPresent = users.find(
        (user: SignUpModel) =>
          user.email == this.loginObj.email &&
          user.password == this.loginObj.password
      );
      if (isUserPresent != undefined) {
        alert('User Found...');
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/selectCharacter');
      } else {
        alert('No User Found');
      }
    }
  }
}

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.name = '';
    this.password = '';
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
