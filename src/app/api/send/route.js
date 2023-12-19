// import ContactForm from '@/components/ContactForm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Name <example@email.com>',
      to: ['hello@kenyonkowal.com'],
      subject: 'Hello world',
      text: 'Hello world'
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
