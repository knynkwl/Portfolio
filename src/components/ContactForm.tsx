import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

const ContactForm: React.FC<Readonly<FormData>> = ({ email, name }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [formVisible, setFormVisible] = useState<boolean>(true);
  const [animate, setAnimate] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (formVisible) {
      setTimeout(() => {
        setAnimate(true);
      }, 100);
    }
  });

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    // Set the height of the textarea to fit its content
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (formData.honeypot) {
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response, JSON.stringify(formData));

      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Reset form after successful submission
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setFormVisible(false);
        setMessage('Form submitted successfully!');
      } else {
        setMessage('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error submitting form. Please try again.');
    }
  };

  const inputClasses = 'w-full py-2 bg-transparent bg-[transparent] border-b-[1px] border-[#091949] focus:outline-none  focus:border-white text-white placeholder:text-blue-3 text-sm';

  return (
    <div className={`absolute z-20 right-0 top-0 m-5 w-[350px] pt-2 pb-4 px-6 bg-blue-1 bg-opacity-20 border border-[#091949] shadow-xl shadow-blue-2 backdrop-blur-md transition-all duration-500 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {formVisible && (
        <form className=" flex flex-col items-end gap-4" onSubmit={handleSubmit}>
          <label>
            <span className="sr-only">Caught ya!</span>
            <input
              type="text"
              name="honeypot"
              className="sr-only"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </label>
          <label className="w-full">
            <span className="sr-only">Name:</span>
            <input 
              className={`w-full ${inputClasses}`} 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder='Name' 
              required />
          </label>
          <label className="w-full">
            <span className="sr-only">Email:</span>
            <input 
              className={`w-full ${inputClasses}`} 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder='Email' 
              required />
          </label>
          <label className="w-full">
            <span className="sr-only">Message:</span>
            <textarea 
              className={`w-full align-bottom resize-none ${inputClasses}`} 
              name="message" 
              rows={1}
              value={formData.message} 
              onChange={handleTextareaChange} 
              placeholder='Message' 
              required></textarea>
          </label>
          <button type="submit" className="text-sm tracking-wider w-auto -mr-2 text-blue-3 px-2 py-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12h2.5M20 12l-6-6m6 6l-6 6m6-6H9.5"></path></svg>
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ContactForm;
