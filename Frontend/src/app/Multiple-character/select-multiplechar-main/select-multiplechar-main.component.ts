import { Component } from '@angular/core';
import { HeaderComponent } from '../../ChatPage/header/header.component';
import { SelectFromMultiplecharComponent } from '../select-from-multiplechar/select-from-multiplechar.component';

@Component({
  selector: 'app-select-multiplechar-main',
  standalone: true,
  imports: [HeaderComponent,SelectFromMultiplecharComponent],
  templateUrl: './select-multiplechar-main.component.html',
  styleUrl: './select-multiplechar-main.component.scss'
})
export class SelectMultiplecharMainComponent {

}
