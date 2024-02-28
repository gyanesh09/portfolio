import { Component, ElementRef, Renderer2 } from '@angular/core';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase.config';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  formData = { name: '', email: '', message:'' };

  constructor(private renderer: Renderer2,public el: ElementRef){}

  submitted = false;

  submitFeedback(form: any): void {
    if (form.valid) {
      this.submitted = true;
    }
    this.addFirebaseentry();
  }

  async addFirebaseentry(){
    try {
      const docRef = await addDoc(collection(db, "userMessages"), {
        name: this.formData.name,
        userEmail: this.formData.email,
        message: this.formData.message
      });
      console.log("Message Saved successfully!", docRef.id);
      const toastMsg=this.el.nativeElement.querySelector('.toast-msg');
      setTimeout (()=>{
        this.renderer.setStyle(toastMsg,'display','flex');
        setTimeout(()=>{
          this.renderer.setStyle(toastMsg,'display','none');
        },5000)
      },200)
    } catch (e) { 
      console.error("Error saving message: ", e);
    }
  }
}