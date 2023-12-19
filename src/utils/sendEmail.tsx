// utils/sendEmail.ts

import { ServerClient } from 'postmark';

const postmark = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || '');

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async ({ name, email, message }: EmailParams): Promise<void> => {
  const body = {
    Name: name,
    From: email,
    TextBody: message,
    To: 'hello@kenyonkowal.com',
    Subject: 'Contact Form - kenyonkowal.com',
  };

  try {
    const response = await postmark.sendEmail(body);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
