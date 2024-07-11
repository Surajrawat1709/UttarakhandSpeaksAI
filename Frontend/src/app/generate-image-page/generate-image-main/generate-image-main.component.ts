import { Component } from '@angular/core';
import { HeaderComponent } from '../../ChatPage/header/header.component';
import { GenerateImageComponent } from '../generate-image/generate-image.component';
@Component({
  selector: 'app-generate-image-main',
  standalone: true,
  imports: [HeaderComponent,GenerateImageComponent],
  templateUrl: './generate-image-main.component.html',
  styleUrl: './generate-image-main.component.scss'
})
export class GenerateImageMainComponent {

}
