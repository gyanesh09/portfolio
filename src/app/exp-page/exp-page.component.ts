import { Component } from '@angular/core';

@Component({
  selector: 'app-exp-page',
  templateUrl: './exp-page.component.html',
  styleUrl: './exp-page.component.scss'
})
export class ExpPageComponent {
  
  public experience:String='';

  ngOnInit(){    
    let startDate = '2021-06-01';
    this.experience = this.calculateExperience(startDate);
  }

   calculateExperience(startDate:string) {
    let today:any = new Date();
    let start:any = new Date(startDate);
  
    let timeDifference = today - start;
    let years = timeDifference / (365.25 * 24 * 60 * 60 * 1000);
  
    let wholeYears = Math.floor(years);
    let remainingMonths = Math.floor((years - wholeYears) * 12);
  
    let formattedResult = `${wholeYears}.${remainingMonths}`;
  
    return formattedResult;
  }

}
