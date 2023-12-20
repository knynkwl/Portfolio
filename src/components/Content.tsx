"use client"

import { useEffect, useState } from 'react';

import Proficiencies from '@/components/Proficiencies';
import Background from '@/components/Background';
import Projects from './Projects';
import ContactForm from '@/components/ContactForm';

const Content = () => {
  const [active, setActive] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(true);
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const handleContactButtonClick = () => {
    setShowContactForm(!showContactForm);
  };

  useEffect(() => {
    setActive(true)

    const handleResize = () => {
      // Disable animation on window resize
      setAnimate(false);
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (active) {
      const timeoutId = setTimeout(() => {
        setShowContent(true);
      }, 500);
  
      // Cleanup function to clear the timeout in case the component unmounts before the timeout is reached
      return () => clearTimeout(timeoutId);
    }
  }, [active]);

  return (
    <>
      <div className={`fixed top-0 left-0 m-[20px] bg-blue-2 border border-[#091949] overflow-y-scroll md:overflow-hidden ${animate ? 'transition-all duration-1000' : ''} ${active ? 'w-[calc(100vw-40px)] h-[calc(100vh-40px)]' : 'w-[calc(100vw)] h-[calc(100vh)]'}`}>
        <div className={`py-[24px] px-[30px] relative z-10 flex items-start flex-col gap-5`}>
          <div className={`text-[30px] md:text-[42px] font-extralight transition-all duration-1000 ${showContent ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'}`}>Hey, I&#39;m Kenyon</div>
          <p className={`text-[18px] md:text-[24px] mb-2 max-w-[700px] font-light transition-all duration-1000 ${showContent ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 -translate-x-3 -translate-y-3'}`}>Technology Director at <a href="https://papertiger.com" className="underline" target="_blank">Paper Tiger</a> <br />We build cool shit</p>
          <Proficiencies showContent={showContent} />
        </div>

        <div className="absolute z-30 right-0 top-0 m-8">
          <button 
            onClick={handleContactButtonClick}
            className={`relative z-10 text-12 rounded-full text-sm font-thin inline-flex items-center justify-center transition-all duration-1000 transform tracking-wide ${showContactForm ? 'text-blue-3' : 'text-white'} ${showContent ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 -translate-y-4'}`}>
              {showContactForm ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
                </svg>
              ) : (
                'hello@kenyonkowal.com'
              )}
          </button>
        </div>

        {showContactForm && <ContactForm />}


        <Background />
      </div>
      <Projects showContent={showContent}/>
    </>
  )
}

export default Content;