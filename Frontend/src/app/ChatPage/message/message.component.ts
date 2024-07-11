import { Component,OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MessagePanelComponent } from '../message-panel/message-panel.component';
import { LLamaAIResponse, Message, MESSAGE_TYPE} from '../../utility/constants';
import { UserInputComponent } from '../user-input/user-input.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { LlamaChatApiService } from '../../llama-chat-api.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule,
            RouterModule,
            HeaderComponent,
            MessagePanelComponent,
            UserInputComponent,
            ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent  {
  title = 'exploring-angular';
  data: Message[] = [];
  loading: boolean = false
  res_from_api: string = "hello pankf"
  console = console

  data1: string = '';
  animeData:string='';
  constructor(private llamaservice: LlamaChatApiService,private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentData.subscribe(data1 => this.data1 = data1);
    this.sharedService.currentAnimeData.subscribe(animeData => this.animeData = animeData);
  }

  getMessage($event: string){
    this.llamaservice.getInitResponse().subscribe(
      (response: any):void => {
        this.console.log("hello")
        this.console.log(response.msg)
      }
    )
    if(!this.loading){
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
      this.loading = true
      console.log(this.animeData);
      this.llamaservice.QueryPrompt(this.data1,this.animeData,$event).subscribe(
        (response: any):void => {
          messageObject = this.createMessage(response.response, MESSAGE_TYPE.ASSISTANT)
          this.data = [...this.data].concat(messageObject)
          this.loading = false;
          this.res_from_api = response.response;
          console.log(this.animeData);
        }
      )
    }
    else{
      let messageObject: Message = this.createMessage($event, MESSAGE_TYPE.USER)
      this.data = [...this.data].concat(messageObject)
    }
  }

  createMessage(content: string, type: MESSAGE_TYPE): Message{
    return {
      id: uuidv4(),
      sender: type,
      content: content,
      dateTime: new Date(),
    }
  }

  public debounce(func: Function, timeout = 400){
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}
