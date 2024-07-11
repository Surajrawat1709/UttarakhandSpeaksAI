import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterOutlet,
    RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {

  constructor(
    private router: Router
  ) {}

}

