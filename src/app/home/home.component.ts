import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private renderer: Renderer2,public el: ElementRef, private http: HttpClient){};

  @Output()
  scrollToSection:EventEmitter<string>=new EventEmitter();

  ngAfterViewInit(){
    const elementToModify = this.el.nativeElement.querySelector('.typewriter-forward');
    setTimeout(()=>{
      this.renderer.removeClass(elementToModify,'typewriter-forward');
      this.renderer.addClass(elementToModify,'typewriter-reverse');
    },1300) 
    setTimeout(()=>{
      this.renderer.addClass(elementToModify,'typewriter-forward');
      this.renderer.removeClass(elementToModify,'typewriter-reverse');
      this.renderer.setProperty(elementToModify,'textContent','Backend Developer');
    },3200)
    setTimeout(()=>{
      this.renderer.removeClass(elementToModify,'typewriter-forward');
      this.renderer.addClass(elementToModify,'typewriter-reverse');
    },4500)
    setTimeout(()=>{
      this.renderer.addClass(elementToModify,'typewriter-forward');
      this.renderer.removeClass(elementToModify,'typewriter-reverse');
      this.renderer.setProperty(elementToModify,'textContent','Full Stack Developer');
    },6500)
    setTimeout(()=>{
      this.renderer.setStyle(this.el.nativeElement.querySelector('.scroll-down'),'display','block');
    },10000)
  }

  downloadFile(): Observable<Blob> {
    const url = 'assets/gyanesh_cv.pdf';
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadCV(): void {
    this.downloadFile().subscribe((blob: Blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "Gyanesh_CV.pdf";
      link.click();
    });
    const toastMsg=this.el.nativeElement.querySelector('.toast-msg');
    setTimeout (()=>{
      this.renderer.setStyle(toastMsg,'display','flex');
      setTimeout(()=>{
        this.renderer.setStyle(toastMsg,'display','none');
      },5000)
    },200)
  }

  scrollPage(sectionId: string) {
    this.scrollToSection.emit('exp-page');
  }

}
