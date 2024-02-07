import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ScrollServiceService } from './services/scroll-service.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  isSideBarOpen = false
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

  scrollToSection(sectionId: string, i: number, isSideBar = false, event:Event) {
    if (isSideBar) {
      this.toggleSideBar(event);
    }
    const element = this.el.nativeElement.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView();
    }
  }

  resetNavItemState() {
    this.navBarItems.forEach((item) => {
      item.isActive = false
    })
  }

  sectionIds = ['home-page', 'exp-page', 'skills-page', 'contacts-page'];

  activeNavItem = 'home-page';

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.setActivePage(window.scrollY);
  }
  
  setActivePage(scrollPosition: number) {
    for (const sectionId of this.sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementOffset = rect.top + window.scrollY - 50;
        const elementHeight = rect.height;
  
        if (scrollPosition >= elementOffset && scrollPosition < elementOffset + elementHeight) {
          console.log("Event Trigger");
          this.resetNavItemState();
          this.navBarItems[this.sectionIds.indexOf(sectionId)].isActive = true;
          break;
        }
      }
    }
  }
  

  ngOnInit() {
    this.scrollService.scrollEvent.subscribe((scrollPosition: number) => {
    });
  }

  toggleSideBar(event:Event) {
    event.stopPropagation();
    this.isSideBarOpen = !this.isSideBarOpen
  }

  closeSideBar(event:Event) {
    event.stopPropagation();
    this.isSideBarOpen = false
  }


  @ViewChild('sidebar') sidebar!: ElementRef;

  @HostListener('document:click', ['$event'])
  public onClick(event: Event): void {
    if (!this.sidebar.nativeElement.contains(event.target)) {
      if(this.isSideBarOpen)
        this.closeSideBar(event);
    }
  }
}