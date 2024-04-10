"use client"

import { useEffect, useState } from 'react';

import Proficiencies from '@/components/Proficiencies';
import Background from '@/components/Background';
import ActionLinks from '@/components/ActionLinks'
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
  
      return () => clearTimeout(timeoutId);
    }
  }, [active]);

  return (
    <div className={`font-display relative bg-blue-2 border border-[#091949] md:overflow-hidden ${animate ? 'transition-all duration-1000' : ''} ${active ? 'w-[calc(100vw-40px)] md:h-[calc(100vh-40px)]' : 'w-[calc(100vw)] md:h-[calc(100vh)]'}`}>
      <div className={`py-[24px] px-6 md:px-10 relative z-10 flex items-start flex-col`}>
        <div className={`text-[30px] md:text-[42px] font-extralight transition-all duration-1000 ${showContent ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 -translate-x-2 -translate-y-2'}`}>Hey, I&#39;m Kenyon</div>
        <p className={`text-lg md:mb-12 mb-2 max-w-[700px] font-light transition-all duration-1000 text-blue-3 ${showContent ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 -translate-x-3 -translate-y-3'}`}>Curious Coder - Creative Thinker</p>

        <Proficiencies showContent={showContent} />
        <ActionLinks showContent={showContent} />
      </div>


      <Background />
      <Projects showContent={showContent}/>
    </div>
  )
}

export default Content;