import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent {
  skillsData:any=[];
  selectedIndex=0;
  skillsData1 = [
    {
      label: "Angular",
      rating: 4,
      icon: "assets/img/angular-icon.png"
    },
    {
      label:"Typescript",
      rating:4,
      icon: "assets/img/typescript-icon.png"
    },
    {
      label:"Redux",
      rating:4,
      icon: "assets/img/redux-icon.webp"
    },
    {
      label:"Sass",
      rating:4,
      icon:"assets/img/sass-icon.png"
    },
    {
      label:"JavaScript",
      rating:4,
      icon:"assets/img/js-icon.webp"
    },
    {
      label: "HTML",
      rating:4,
      icon:"assets/img/html-icon.png"
    },
    {
      label:"CSS",
      rating:4,
      icon:"assets/img/css-icon.png"
    },
    {
      label:"Figma",
      rating:3,
      icon:"assets/img/figma-icon.png"
    }
  ];

  skillsData2 = [
    {
      label:"Java",
      rating:4,
      icon:"assets/img/java-icon.webp"
    },
    {
      label:"Spring Boot",
      rating:4,
      icon:"assets/img/spring-boot-icon.png"
    },
    {
      label:"Postgres",
      rating:4,
      icon:"assets/img/postgres-icon.png"
    },
    {
      label:"Mongo",
      rating:3,
      icon:"assets/img/mongo-icon.png"
    },
    {
      label:"Azure",
      rating:3,
      icon:"assets/img/azure-icon.png"
    },
    {
      label:"Docker",
      rating:4,
      icon:"assets/img/docker-icon.png"
    },
    {
      label:"Jenkins",
      rating:4,
      icon:"assets/img/jenkins-icon.png"
    },
    {
      label:"Datadog",
      rating:3,
      icon:"assets/img/datadog-icon.png"
    }
  ]

  skillsData3 = [
    {
      label:"Datadog",
      rating:3,
      icon:"assets/img/datadog-icon.png"
    }
  ]

  ngOnInit(){
    this.skillsData.push(this.skillsData1,this.skillsData2,this.skillsData3);
    console.log(this.skillsData)
  }

  onPrevClick(){
    this.selectedIndex-1 >=0 ? this.selectedIndex-=1 : this.selectedIndex=this.skillsData.length-1;
  }

  onNextClick(){
    (this.selectedIndex+1 <= this.skillsData.length-1) ? this.selectedIndex+=1 : this.selectedIndex=0
  }

  setSelectedIndex(i:number){
    this.selectedIndex=i;
  }
}
