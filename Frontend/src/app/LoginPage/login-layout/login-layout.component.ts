import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
//import { AppRoutingModule } from '../../app-routing.module';
@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss',
})
export class LoginLayoutComponent {
  loggedUser: any;
  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
  }

  onLogoff() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }
}
