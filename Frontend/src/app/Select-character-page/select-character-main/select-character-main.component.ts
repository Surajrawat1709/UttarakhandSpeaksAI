import { Component } from '@angular/core';
import { HeaderComponent } from '../../ChatPage/header/header.component';
import { SelectCharacterComponent } from '../select-character/select-character.component';

@Component({
  selector: 'app-select-character-main',
  standalone: true,
  imports: [HeaderComponent,SelectCharacterComponent],
  templateUrl: './select-character-main.component.html',
  styleUrl: './select-character-main.component.scss'
})
export class SelectCharacterMainComponent {

}
