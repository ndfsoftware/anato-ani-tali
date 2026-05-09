import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, output, PLATFORM_ID } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ContactEmailService } from '@app/core/services/contact-email.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private static readonly FULL_NAME_PATTERN = /^\p{L}+(?:[ '\-]\p{L}+)*$/u;
  private static readonly PHONE_PATTERN = /^[0-9()+\-\s]{6,20}$/;
  private static readonly EMAIL_PATTERN =
    /^[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,6}(?:\.[A-Z]{2})?$/i;

  readonly subject = input('Consulta general');
  readonly submitted = output<void>();

  readonly fb = inject(FormBuilder);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly contactEmailService = inject(ContactEmailService);

  isSending = false;
  formSubmitted = false;
  errorMessage = '';
  successMessage = '';

  readonly form = this.fb.nonNullable.group({
    fullName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(ContactForm.FULL_NAME_PATTERN),
      ],
    ],
    email: ['', [Validators.required, Validators.email, ContactForm.emailDomainValidator]],
    phone: ['', [Validators.required, Validators.pattern(ContactForm.PHONE_PATTERN)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  private static emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const value = `${control.value ?? ''}`.trim();

    if (!value) {
      return null;
    }

    return ContactForm.EMAIL_PATTERN.test(value) ? null : { emailDomain: true };
  }

  isInvalid(controlName: 'fullName' | 'email' | 'phone' | 'message'): boolean {
    return this.formSubmitted && this.form.controls[controlName].invalid;
  }

  hasError(controlName: 'fullName' | 'email' | 'phone' | 'message', errorKey: string): boolean {
    return this.formSubmitted && !!this.form.controls[controlName].errors?.[errorKey];
  }

  async onSubmit(): Promise<void> {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const missingConfig = this.contactEmailService.getMissingConfig();
    if (missingConfig.length) {
      this.errorMessage = `Error en el servicio de emails.`;
      return;
    }

    const safeSubject = this.subject().trim() || 'Consulta general';
    const formValue = this.form.getRawValue();
    this.errorMessage = '';
    this.successMessage = '';
    this.isSending = true;

    try {
      await this.contactEmailService.sendContact({
        subject: safeSubject,
        fullName: formValue.fullName,
        email: formValue.email,
        phone: formValue.phone,
        message: formValue.message,
      });

      this.formSubmitted = false;
      this.successMessage = 'Consulta enviada correctamente.';
      this.form.reset({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      this.submitted.emit();
    } catch {
      this.errorMessage = 'No pudimos enviar la consulta. Proba nuevamente en unos minutos.';
    } finally {
      this.isSending = false;
    }
  }
}
