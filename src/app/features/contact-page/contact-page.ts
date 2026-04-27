import { Component } from '@angular/core';
import { ContactForm } from '@app/shared/ui/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm],
  templateUrl: './contact-page.html',
})
export default class ContactPage {}
