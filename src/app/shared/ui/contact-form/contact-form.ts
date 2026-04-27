import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, output, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactEmailService } from '@app/core/services/contact-email.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private static readonly FULL_NAME_PATTERN = /^[A-Za-zÀ-ÿ]+(?:[ '\-][A-Za-zÀ-ÿ]+)*$/;
  private static readonly PHONE_PATTERN = /^[0-9()+\-\s]{6,20}$/;

  readonly subject = input('Consulta general');
  readonly submitted = output<void>();

  readonly fb = inject(FormBuilder);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly contactEmailService = inject(ContactEmailService);

  isSending = false;
  errorMessage = '';
  successMessage = '';

  readonly form = this.fb.nonNullable.group({
    fullName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.pattern(ContactForm.FULL_NAME_PATTERN)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(ContactForm.PHONE_PATTERN)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isInvalid(controlName: 'fullName' | 'email' | 'phone' | 'message'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.form.touched);
  }

  hasError(controlName: 'fullName' | 'email' | 'phone' | 'message', errorKey: string): boolean {
    const control = this.form.controls[controlName];
    return !!control.errors?.[errorKey] && (control.touched || this.form.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const missingConfig = this.contactEmailService.getMissingConfig();
    if (missingConfig.length) {
      this.errorMessage = `Faltan variables de EmailJS: ${missingConfig.join(', ')}. Reinicia el servidor luego de editar el .env.`;
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

      this.successMessage = 'Consulta enviada correctamente.';
      this.form.reset({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      this.submitted.emit();
    } catch {
      this.errorMessage = 'No pudimos enviar la consulta. Probá nuevamente en unos minutos.';
    } finally {
      this.isSending = false;
    }
  }
}
