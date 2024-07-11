import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const ENTER_KEY_ASCII = 13;

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserInputComponent {
  @Output() sendMessageEmitter = new EventEmitter<string>();
  message: string = '';

  sendMessage() {
    if (this.message) {
      this.sendMessageEmitter.emit(this.message);
    }
  }

  onKeyUp($event: any) {
    if ($event.which === ENTER_KEY_ASCII) {
      this.sendMessage();
      this.message = '';
    }
  }
}
