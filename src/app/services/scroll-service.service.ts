import { EventEmitter, HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {

  constructor() {
    
   }
   scrollEvent = new EventEmitter<number>();

   @HostListener('window:scroll', ['$event'])
   onScroll(event: any) {
     this.scrollEvent.emit(window.scrollY);
   }
}
