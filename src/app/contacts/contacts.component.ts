import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent{

  constructor(private renderer: Renderer2, public el: ElementRef, private fb: FormBuilder) { }

  formData = { name: '', email: '', message: '' };
  contactsForm: FormGroup= this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });;

  submitted = false;

  submitFeedback(): void {
    if (this.contactsForm.valid) {
      this.submitted = true;
      this.addFirebaseentry();
    }
  }

  async addFirebaseentry() {
    try {
      const docRef = await addDoc(collection(db, "userMessages"), {
        name: this.formData.name,
        userEmail: this.formData.email,
        message: this.formData.message
      });
      console.log("Message Saved successfully!", docRef.id);
      const toastMsg = this.el.nativeElement.querySelector('.toast-msg');
      setTimeout(() => {
        this.renderer.setStyle(toastMsg, 'display', 'flex');
        setTimeout(() => {
          this.renderer.setStyle(toastMsg, 'display', 'none');
        }, 5000)
      }, 200)
    } catch (e) {
      console.error("Error saving message: ", e);
    }
  }
}