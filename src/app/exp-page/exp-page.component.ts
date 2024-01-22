import { Component } from '@angular/core';

@Component({
  selector: 'app-exp-page',
  templateUrl: './exp-page.component.html',
  styleUrl: './exp-page.component.scss'
})
export class ExpPageComponent {

  public experience: String = '';
  activeExpIndex=0;

  expContent = [{
    companyName: "NielsenIQ",
    isActive:true,
    description: ["Working for NielsenIQ client deliverables.",
      "Providing solutions for Business Intelligence - Data analytics team, taking care of complete front-end of the application and at the same time providing support for Java-backend as well which is embedded with Microstrategy BI SDK",
      "Developed complete new UI page as perthe Product Leaders and UX recommendations for Adhoc Analysis application and implemented changes for Microsubscription model transition.",
      "Fixed critical Production Bugs and worked on major enhancements like advanced Search integration and Stories functionality involving use of java, Vanilla JS and Angular",
      "Worked on integrating DataDog for more statistical logs summary.",
      "Worked on creating jenkins pipeline for environment based deployment",
      "Working in Agile Environment, applied Agile Test Practices SCRUM , Scripted Test Cases for Test Driven Development."
    ]
  },{
  companyName: "TCS",
  isActive:false,
  description: [
    "Providing solutions for Business Intelligence - Data analytics team, taking care of complete front-end of the application and at the same time providing support for Java-backend as well which is embedded with Microstrategy BI SDK",
    "Developed complete new UI page as perthe Product Leaders and UX recommendations for Adhoc Analysis application and implemented changes for Microsubscription model transition.",
    "Fixed critical Production Bugs and worked on major enhancements like advanced Search integration and Stories functionality involving use of java, Vanilla JS and Angular",
    "Worked on integrating DataDog for more statistical logs summary.",
    "Worked on creating jenkins pipeline for environment based deployment",
    "Working in Agile Environment, applied Agile Test Practices SCRUM , Scripted Test Cases for Test Driven Development."
  ]},
]

  ngOnInit() {
    let startDate = '2021-06-01';
    this.experience = this.calculateExperience(startDate);
  }

  calculateExperience(startDate: string) {
    let today: any = new Date();
    let start: any = new Date(startDate);

    let timeDifference = today - start;
    let years = timeDifference / (365.25 * 24 * 60 * 60 * 1000);

    let wholeYears = Math.floor(years);
    let remainingMonths = Math.floor((years - wholeYears) * 12);

    let formattedResult = `${wholeYears}.${remainingMonths}`;

    return formattedResult;
  }

  switchActive(company:string,i:number){
    this.expContent.forEach((currCompany)=>{
      currCompany.isActive=false;
    })
    this.expContent[i].isActive=true;
    this.activeExpIndex=i;
  }
}
