"use client"

import { useEffect, useState } from 'react';

import Proficiencies from '@/components/Proficiencies';
import Background from '@/components/Background';
import Projects from './Projects';

const Content = () => {
  const [active, setActive] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(true);

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
    <div className={`font-display relative bg-blue-2 border border-[#091949] overflow-y-scroll md:overflow-hidden ${animate ? 'transition-all duration-1000' : ''} ${active ? 'w-[calc(100vw-40px)] h-[calc(100vh-40px)]' : 'w-[calc(100vw)] h-[calc(100vh)]'}`}>
      <div className={`py-[24px] px-[30px] relative z-10 flex items-start flex-col gap-6`}>
        <div className={`text-[30px] md:text-[42px] font-extralight transition-all duration-1000 ${showContent ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'}`}>Hey, I&#39;m Kenyon</div>
        <p className={`text-[18px] md:text-[24px] mb-2 max-w-[700px] font-light transition-all duration-1000 ${showContent ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 -translate-x-3 -translate-y-3'}`}>Technology Director at <a href="https://papertiger.com" className="underline" target="_blank">Paper Tiger</a> <br />We build cool shit</p>
        <Proficiencies showContent={showContent} />
      </div>

      <a href={`mailto:hello@kenyonkowal.com`} className={`absolute z-10 right-0 top-0 text-12 p-3 m-8 font-bold rounded-full bg-blue-3 w-10 h-10 inline-flex items-center justify-center transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 -translate-y-4'}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="-mb-1 -ml-1"><g fill="currentColor"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178l1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494l-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363L1.591 6.602z"></path><path d="M16 12.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"></path></g></svg></a>

      <Background />
      <Projects showContent={showContent}/>
    </div>
  )
}

export default Content;