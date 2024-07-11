import { Component,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
import { CharacterConstants } from '../../utility/constants';
@Component({
  selector: 'app-select-from-multiplechar',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './select-from-multiplechar.component.html',
  styleUrl: './select-from-multiplechar.component.scss',
})
export class SelectFromMultiplecharComponent  implements AfterViewInit  {
  message: string = '';

  data1: string = '';
  @ViewChild('descData') descData!: ElementRef;


  constructor(
    private router: Router,
    private llamaservice: LlamaChatApiService,
    private sharedService: SharedService
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  onCustomize(data: string) {
    this.data1 = data;
    this.sharedService.changeAnime( this.data1);
    this.llamaservice.createAnime( this.data1, this.data1,this.descData.nativeElement.textContent).subscribe(
      (response) => {
        this.message = response.message;
        console.log(this.message);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.message = 'An error occurred while creating the user.';
      }
    );
    this.router.navigateByUrl('/selectVisuals');
  }
  character = CharacterConstants.CHARACTERS;

  onChat(data: string) {
    this.data1 = data;
    this.sharedService.changeAnime( this.data1);
    const selectedCharacter = this.character.find((char) => char.name.includes(data));
    if (selectedCharacter) {
    this.llamaservice.createAnime( this.data1, this.data1,this.data1).subscribe(
      (response) => {
        this.message = response.message;
        console.log(this.message);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.message = 'An error occurred while creating the user.';
      }
    );
    this.sharedService.changeImage(selectedCharacter.image);
    this.router.navigateByUrl('/chatpage');
  }else {
    console.error('Character not found');
    this.message = 'Character not found.';
  }
  }
}
