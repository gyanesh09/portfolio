import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  formData = { name: '', email: '', message:'' };
  submitted = false;

  submitForm(form: any): void {
    if (form.valid) {
      this.submitted = true;
    }
  }

}
