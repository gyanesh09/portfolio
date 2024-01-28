import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExpPageComponent } from './exp-page/exp-page.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TagCloudComponent } from 'angular-tag-cloud-module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpPageComponent,
    SkillsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    TagCloudComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
