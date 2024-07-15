import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LlamaChatApiService } from '../../llama-chat-api.service';
import { SharedService } from '../../shared.service';
import { HeaderComponent } from '../../ChatPage/header/header.component';
import { AuthenticationService } from '../../services/services';
import { AuthenticationRequest, RegistrationRequest } from '../../services/models';
import { TokenService } from '../../services/token/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,],
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSignDivVisiable: boolean = true;
  authRequest: AuthenticationRequest = {email: '', password: ''};
  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  message: string = '';

  constructor(
    private router: Router,
    private llamaservice: LlamaChatApiService,
    private sharedService: SharedService,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  onRegister() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/activate-account');
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
          this.showAlerts();
        }
      });
  }
  onLogin() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
       this.router.navigateByUrl('/selectCharacter');
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
          this.showAlerts();
        } else {
          this.errorMsg.push(err.error.errorMsg);
          this.showAlerts();
        }
      }
    });
  }
  showAlerts() {
    if (this.errorMsg.length) {
      alert(this.errorMsg.join('\n'));
    }
}
}
