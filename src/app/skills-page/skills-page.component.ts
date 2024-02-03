import { Component, ViewChild } from '@angular/core';
import { CloudData, CloudOptions, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent {
  public chartOptions: any = {
    series: [
      {
        name: 'Proficiency',
        data: [90, 80, 90, 70, 70, 85, 70, 75, 80]
      }
    ],
    plotOptions: {
      radar: {
        polygons: {
          strokeColor: '#e8e8e8',
          fill: {
            colors: ['#000000', '#1c1c1c']
          }
        }
      }
    },
    fill: {
      opacity: 0.2,
      colors: ['#14FF00']
    },

    markers: {
      size: 5,
      hover: {
        size: 10
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['#14FF00'],
      dashArray: 0
    },
    chart: {
      width: '250%',
      type: 'radar',
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
    },
    responsive: [{
      breakpoint: 450,
      options: {
        chart: {
          width: '130%'
        }
      },
    },
    {
      breakpoint: 600,
      options: {
        chart: {
          width: '180%'
        }
      }
    },
    {
      breakpoint: 380,
      options: {
        chart: {
          width: '115%'
        }
      }
    },
    {
      breakpoint: 300,
      options: {
        chart: {
          width: '95%'
        }
      }
    }

    ],
    xaxis: {
      categories: ['Angular', 'Java', 'TypeScript', 'Spring Boot', 'Python', 'CSS', 'Azure', 'Redux', 'Javascript'],
      labels: {
        style: {
          colors: ['#d1d1d1', '#d1d1d1', '#d1d1d1', '#d1d1d1', '#d1d1d1', '#d1d1d1'],
          fontSize: '1.2rem'
        },
      }
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: ['#d1d1d1', '#d1d1d1', '#d1d1d1', '#d1d1d1', '#d1d1d1', '#d1d1d1'],
        },
      },
    },
    dataLabels: {
      enabled: false,
      background: {
        enabled: true,
        borderRadius: 50,
        foreColor: '#fff',
        opacity: 0.3,
        padding: 5
      },
      style: {
        fontSize: '1.1rem',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined
      },
    }
  };

  @ViewChild('radarChart') radarChart!: ChartComponent;

  ngOnInit(): void {
    this.updateTagCloudDim(window.innerWidth);
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.updateTagCloudDim(event.target.innerWidth);
  // }

  updateTagCloudDim(screenWidth: number) {
    if (screenWidth < 600) {
      this.tagCloudoptions.width = 0.8
      this.data = [
        { text: 'Angular', weight: 10, color: '#14FF00' },
        { text: 'Python', weight: 7, color: '#CED4DA' },
        { text: 'Java', weight: 9, color: '#E9ECEF' },
        { text: 'Spring Boot', weight: 8, color: '#CED4DA' },
        { text: 'Redux', weight: 8, color: '#CED4DA' },
        { text: 'TypeScript', weight: 8, color: '#ADB5BD' },
        { text: 'JavaScript', weight: 7, color: '#ADB5BD' },
        { text: 'CSS', weight: 4, color: '#6C757D' },
        { text: 'HTML', weight: 4, color: '#6C757D' },
        { text: 'Datadog', weight: 4, color: '#6C757D' },
        { text: 'Bitbucket', weight: 3, color: '#6C757D' },
        { text: 'Github', weight: 3, color: '#6C757D' },
        { text: 'Jenkins', weight: 4, color: '#6C757D' },
        { text: 'Azure', weight: 5, color: '#6C757D' },
        { text: 'SonarQube', weight: 4, color: '#ADB5BD' },
        { text: 'Mongo', weight: 5, color: '#ADB5BD' },
        { text: 'Postgres', weight: 5, color: '#ADB5BD' },
        { text: 'SaaS', weight: 7, color: '#ADB5BD' },
        { text: 'Figma', weight: 5, color: '#6C757D' },
        { text: 'SQL', weight: 7, color: '#ADB5BD' },
      ];
    }
    else if (screenWidth < 1300 && screenWidth > 600)
      this.tagCloudoptions.width = 0.9
    else
      this.tagCloudoptions.width = 0.4
  }

  public initChart(chart: any): void {
    this.radarChart = chart;
  }

  tagCloudoptions: CloudOptions = {
    width: 0.4,
    height: 1,
    overflow: false,
    realignOnResize: false
  };

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3,
    transitionTime: 0.45,
  };

  data: CloudData[] = [
    { text: 'Angular', weight: 10, color: '#14FF00' },
    { text: 'Python', weight: 7, color: '#CED4DA' },
    { text: 'Java', weight: 9, color: '#E9ECEF' },
    { text: 'Spring Boot', weight: 8, color: '#CED4DA' },
    { text: 'Redux', weight: 8, color: '#CED4DA' },
    { text: 'TypeScript', weight: 8, color: '#ADB5BD' },
    { text: 'JavaScript', weight: 7, color: '#ADB5BD' },
    { text: 'CSS', weight: 4, color: '#6C757D' },
    { text: 'HTML', weight: 4, color: '#6C757D' },
    { text: 'Datadog', weight: 4, color: '#6C757D' },
    { text: 'Bitbucket', weight: 3, color: '#6C757D' },
    { text: 'Github', weight: 3, color: '#6C757D' },
    { text: 'Jenkins', weight: 4, color: '#6C757D' },
    { text: 'Azure', weight: 5, color: '#6C757D' },
    { text: 'SonarQube', weight: 4, color: '#ADB5BD' },
    { text: 'Mongo', weight: 5, color: '#ADB5BD' },
    { text: 'Postgres', weight: 5, color: '#ADB5BD' },
    { text: 'SaaS', weight: 7, color: '#ADB5BD' },
    { text: 'Figma', weight: 5, color: '#6C757D' },
    { text: 'SQL', weight: 7, color: '#ADB5BD' },
    { text: '', weight: 1 },
    { text: '', weight: 1 },
    { text: '', weight: 0 },

  ];
}
