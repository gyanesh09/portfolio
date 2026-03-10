import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProposeComponent } from './propose/propose.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';

const routes: Routes = [
  {path:'', component:HomeWrapperComponent},
  {path:'for-rutu', component:ProposeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
