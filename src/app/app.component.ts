import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ScrollServiceService } from './services/scroll-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  navBarItems = [{
    label: 'Home',
    isActive: true,
    scrollToSection: 'home-page'
  }, {
    label: 'Experience',
    isActive: false,
    scrollToSection: 'exp-page'
  }, {
    label: 'Skills',
    isActive: false,
    scrollToSection: 'skills-page'
  },
  {
    label: 'Contact',
    isActive: false,
    scrollToSection: 'contacts-page'
  }

  ]

  constructor(private renderer: Renderer2, public el: ElementRef, private http: HttpClient,
    private scrollService: ScrollServiceService) { };

  scrollToSection(sectionId: string, i: number) {
    const element = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView();
    }
  }

  resetNavItemState(){
    this.navBarItems.forEach((item) => {
      item.isActive = false
    })
  }

  sectionIds = ['home-page', 'exp-page', 'skills-page', 'contacts-page'];

  activeNavItem='home-page';

  @HostListener('window:scroll', ['$event'])
   onScroll(event: any) {
    console.log("Scrolled")
    this.setActivePage(window.scrollY);
    //  this.scrollEvent.emit(window.scrollY);
   }

   setActivePage(scrollPosition:number){
    for (const sectionId of this.sectionIds) {
      const element = document.getElementById(sectionId);

      if (element) {
        const elementOffset = element.offsetTop-50;
        const elementHeight = element.offsetHeight;

        if (scrollPosition >= elementOffset && scrollPosition < elementOffset + elementHeight) {
          this.resetNavItemState();
          this.navBarItems[this.sectionIds.indexOf(sectionId)].isActive=true;
          break;
        }
      }
    }
   }

  ngOnInit() {
    this.scrollService.scrollEvent.subscribe((scrollPosition: number) => {
   
    });
  }
}
