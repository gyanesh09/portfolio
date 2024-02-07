import { Component } from '@angular/core';

@Component({
  selector: 'app-exp-page',
  templateUrl: './exp-page.component.html',
  styleUrl: './exp-page.component.scss'
})
export class ExpPageComponent {

  public experience: String = '';
  activeExpIndex = 0;

  expContent = [{
    companyName: "NielsenIQ",
    isActive: true,
    description: [
      "Contributed to the development of two distinct analytics products, showcasing adaptability and proficiency in varied project environments.",
      "Led the end-to-end development of a cutting-edge product, leveraging expertise in HighCharts, Angular 15, Spring Boot 3, and Java 17. Utilized MongoDB and PostgreSQL for robust data storage and management.",
      "Oversaw asset management procedures, ensuring secure storage and retrieval of user assets for enhanced data integrity. Implemented MongoDB and PostgreSQL databases for efficient data handling.",
      "Managed preference systems, demonstrating a commitment to providing a personalized user experience by storing and optimizing application preferences using MongoDB and PostgreSQL.",
      "Ensured code quality through the seamless integration of SonarQube and Snyk, implementing rigorous checks to maintain high software standards. Leveraged MongoDB and PostgreSQL for ,effective data storage and retrieval.",
      "Played a key role in the setup of infrastructure, proxy, and DNS on Azure, showcasing proficiency in cloud technologies for optimal product performance. Employed MongoDB and PostgreSQL databases for efficient data management.",
      "Crafted a comprehensive High-Level Design (HLD) for the new product, showcasing a strategic approach to system architecture and planning. Integrated MongoDB and PostgreSQL databases for scalable and reliable data storage.",
      "Thrived in a Scaled Agile Framework environment, applying Agile Test Practices, SCRUM methodologies, and adeptly scripting test cases for Test-Driven Development, ensuring efficient and collaborative project execution. Implemented MongoDB and PostgreSQL databases for robust data management.",
      "Developed a custom Angular library to enhance component reusability, effectively minimizing code redundancy and promoting a modular and efficient codebase.",
      "Engaged in advanced ngRX state management, leveraging RxJS operators to proficiently handle data retrieval and maintenance processes, contributing to a streamlined and responsive application architecture.",
      "Implemented MongoDB and PostgreSQL databases for efficient and scalable data storage, ensuring optimal performance and reliability throughout the application's lifecycle.",

    ]
  }, {
    companyName: "TCS",
    isActive: false,
    description: [
      "Providing solutions for Business Intelligence - Data analytics team, taking care of complete front-end of the application and at the same time providing support for Java-backend as well which is embedded with Microstrategy BI SDK",
      "Developed complete new UI page as perthe Product Leaders and UX recommendations for Adhoc Analysis application and implemented changes for Microsubscription model transition.",
      "Fixed critical Production Bugs and worked on major enhancements like advanced Search integration and Stories functionality involving use of java, Vanilla JS and Angular",
      "Worked on integrating DataDog for more statistical logs summary.",
      "Worked on creating jenkins pipeline for environment based deployment",
      "Working in Agile Environment, applied Agile Test Practices SCRUM , Scripted Test Cases for Test Driven Development."
    ]
  },
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

  switchActive(company: string, i: number) {
    this.expContent.forEach((currCompany) => {
      currCompany.isActive = false;
    })
    this.expContent[i].isActive = true;
    this.activeExpIndex = i;
  }
}
