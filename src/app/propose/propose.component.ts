import { Component } from '@angular/core';

@Component({
  selector: 'app-propose',
  templateUrl: './propose.component.html',
  styleUrl: './propose.component.scss'
})
export class ProposeComponent {
  showMessage = false;

  secretCode = '';
  unlocked = false;
  
  checkCode(){
  
    if(this.secretCode.toLowerCase() === 'anshu'){
      this.unlocked = true;
    }else{
      alert("Hmm… that's not the right word ❤️");
    }
  }
  

  revealLove(){
    this.showMessage = true;
  }
}
