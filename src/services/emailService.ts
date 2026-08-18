/**
 * Service to send automated commercial quotation email notifications to Aldar Media executive email (algarousha@hotmail.com)
 */

export interface EmailNotificationPayload {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  service_type: string;
  message: string;
}

export const emailService = {
  /**
   * Sends an automated quotation email notification to algarousha@hotmail.com via FormSubmit API
   */
  async sendQuotationEmailNotification(payload: EmailNotificationPayload): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch('https://formsubmit.co/ajax/algarousha@hotmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Commercial Media Quotation: ${payload.name} - ${payload.service_type}`,
          _template: 'table',
          _replyto: payload.email,
          _captcha: 'false',
          'Client Name': payload.name,
          'Work Email': payload.email,
          'Phone Number': payload.phone,
          'Company Name': payload.company || 'Not Specified',
          'Requested Service': payload.service_type,
          'Campaign Details & Region': payload.message,
          'Submission Timestamp': new Date().toLocaleString(),
        }),
      });

      if (response.ok) {
        return { success: true, message: 'Email notification sent successfully to algarousha@hotmail.com' };
      } else {
        console.warn('FormSubmit email trigger warning:', await response.text());
        return { success: false, message: 'FormSubmit trigger warning' };
      }
    } catch (err: any) {
      console.warn('Automated email dispatch error:', err);
      // Non-blocking fallback
      return { success: false, message: err.message };
    }
  },

  /**
   * Generates a pre-formatted mailto URI for instant client manual send if needed
   */
  generateMailtoLink(payload: EmailNotificationPayload): string {
    const subject = encodeURIComponent(`Quotation Request: ${payload.service_type} - ${payload.name}`);
    const body = encodeURIComponent(
      `Dear Aldar Media Team,\n\nI have submitted a quotation request with the following details:\n\n` +
      `Name: ${payload.name}\n` +
      `Email: ${payload.email}\n` +
      `Phone: ${payload.phone}\n` +
      `Company: ${payload.company || 'N/A'}\n` +
      `Service: ${payload.service_type}\n\n` +
      `Details:\n${payload.message}\n\n` +
      `Best regards,\n${payload.name}`
    );
    return `mailto:algarousha@hotmail.com?subject=${subject}&body=${body}`;
  }
};
