// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private dataSource = new BehaviorSubject<string>('default value');
  currentData = this.dataSource.asObservable();

  changeData(data: string) {
    this.dataSource.next(data);
  }

  private dataAnimeSource = new BehaviorSubject<string>('default value');
  currentAnimeData = this.dataAnimeSource.asObservable();

  changeAnime(data:string){
    this.dataAnimeSource.next(data);
  }

  private sendImage = new BehaviorSubject<string>('default value');
  currentImageData = this.dataAnimeSource.asObservable();

  changeImage(data:string){
    this.dataAnimeSource.next(data);
  }
}
