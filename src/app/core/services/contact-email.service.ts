import { inject, Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { RUNTIME_CONFIG } from '@app/core/config/runtime-config';

export interface ContactEmailPayload {
  subject: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactEmailService {
  private readonly runtimeConfig = inject(RUNTIME_CONFIG);
  private readonly contactEmail = this.runtimeConfig.contactEmail;
  private readonly serviceId = this.runtimeConfig.emailjsServiceId;
  private readonly templateId = this.runtimeConfig.emailjsTemplateId;
  private readonly publicKey = this.runtimeConfig.emailjsPublicKey;

  getMissingConfig(): string[] {
    const missing: string[] = [];

    if (!this.serviceId) missing.push('NG_APP_EMAILJS_SERVICE_ID');
    if (!this.templateId) missing.push('NG_APP_EMAILJS_TEMPLATE_ID');
    if (!this.publicKey) missing.push('NG_APP_EMAILJS_PUBLIC_KEY');

    return missing;
  }

  async sendContact(payload: ContactEmailPayload): Promise<void> {
    await emailjs.send(
      this.serviceId,
      this.templateId,
      {
        to_email: this.contactEmail,
        subject: payload.subject,
        from_name: payload.fullName,
        from_email: payload.email,
        phone: payload.phone,
        message: payload.message,
      },
      {
        publicKey: this.publicKey,
      },
    );
  }
}
