import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  navBarItems=[{
    label:'Home',
    isActive:true,
    scrollToSection:'home-page'
  },{
    label:'Experience',
    isActive:false,
    scrollToSection:'exp-page'
  },{
    label:'Skills',
    isActive:false,
    scrollToSection:'skills-page'
  },
  {
    label:'Contact',
    isActive:false,
    scrollToSection:'contacts-page'
  }

]

  constructor(private renderer: Renderer2,public el: ElementRef, private http: HttpClient){};

  scrollToSection(sectionId: string, i:number) {
    const element = this.el.nativeElement.querySelector(`#${sectionId}`);
    this.navBarItems.forEach((item)=>{
      item.isActive=false
    })
    this.navBarItems[i].isActive=true
    if (element) {
      element.scrollIntoView();
    }
  }
}
