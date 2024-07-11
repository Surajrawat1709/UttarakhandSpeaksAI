import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LlamaChatApiService } from '../../llama-chat-api.service';
import { SharedService } from '../../shared.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-select-character',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    RouterOutlet,
    RouterModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './select-character.component.html',
  styleUrl: './select-character.component.scss',
})
export class SelectCharacterComponent {
  message: string = '';
  data1: string = '';
 animeData:string ='';
 msg: string = '';
 selectedOption: string = '';
 currentImage: string='/assets/anime/character_1/market_traditional_standing.png';
 loading: boolean = false;
  constructor(
    private router: Router,
    private llamaservice: LlamaChatApiService,private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.sharedService.currentData.subscribe(data1 => this.data1 = data1);
    this.sharedService.currentAnimeData.subscribe(animeData => this.animeData = animeData);
  }

  onChat(data: string) {
    this.msg = data;
    this.llamaservice.createChat(this.data1, this.animeData, this.msg).subscribe(
      (response) => {
        this.message = response.response;
        console.log(this.message);
        console.log(this.msg);
        console.log(this.data1);
        console.log(this.animeData);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.message = 'An error occurred while creating the user.';
      }
    );
    this.sharedService.changeImage(this.currentImage);
    this.router.navigateByUrl('/chatpage');
  }


  // generateImg() {
  //   const randomIndex = Math.floor(Math.random() * this.view.length);
  //   this.favoriteView = this.view[randomIndex];
  // }


  favoriteView: string ='Home';
  favoriteClothing: string ='Standing';
  favoriteAction: string ='Casual';

  view: string[] = ['Home', 'Village', 'City', 'Market'];
  type: string[] = ['Male', 'Female', 'Old', 'Child'];
  mood: string[] = ['Happy', 'Sad', 'Busy', 'Angry'];

  generateImg() {
    const fallbackImages = [
      '/assets/anime/img1.jpeg',
        '/assets/anime/img2.jpeg',
       '/assets/anime/img4.jpeg',
        '/assets/anime/img12.jpeg',
       '/assets/anime/img14.jpeg',
       '/assets/anime/img15.jpeg'
      // Add more fallback images as needed
    ];
    this.loading = true; // Start loading
    setTimeout(() => {
   if (this.favoriteView && this.favoriteClothing && this.favoriteAction) {

     this.currentImage = `/assets/Dress_c1/${this.favoriteView.toLowerCase()}_${this.favoriteClothing.toLowerCase()}_${this.favoriteAction.toLowerCase()}.png`;
//this.currentImage='/assets/anime/character_1/school_dress_close.png';
  // alert(this.currentImage)
  this.checkImageExists(this.currentImage).then(exists => {
    if (!exists) {
      this.currentImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }
    this.loading = false; // Stop loading
    this.sharedService.changeImage(this.currentImage);
    console.log(this.currentImage);
   // alert(this.currentImage);
  });
      } else {
        alert("Please choose from all options before generating image");
      this.currentImage = 'src/assets/anime/character_1/default.png';
      this.sharedService.changeImage(this.currentImage);
      console.log(this.currentImage);
     }

  },.1000);
}
checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
  // images = {
  //   option1:'/assets/anime/img1.jpeg',
  //   option2:  '/assets/anime/img2.jpeg',
  //   option3: '/assets/anime/img4.jpeg',
  //    option4: '/assets/anime/img12.jpeg',
  //    default:'/assets/anime/img14.jpeg'
  // };
}
