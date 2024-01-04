"use client"

import React, { useEffect, useState, useRef, use } from 'react';
import { borderBox } from '@/utils/tw-classes';
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';

import { useStore, useAtomValue } from "jotai";
import { navActiveAtom, pageActiveAtom } from "@/store/atoms";

export const ExploreButton = () => {
  const store = useStore();
  const navState = useAtomValue(navActiveAtom, { store });
  const pageActive = useAtomValue(pageActiveAtom, { store });

  const handleClick = () =>  {
    store.set(navActiveAtom, !navState);
    store.set(pageActiveAtom, false);
  };

  const buttonLabel = (navState) ? 'Click to close navigation' : 'Click to view navigation';

  return (
    <>
      <button 
        tabIndex="0"
        aria-label={buttonLabel} 
        className={`z-overlay relative font-bold flex items-center gap-4 tracking-wider transition-colors duration-500 hover:bg-opacity-80 backdrop-blur-sm ${borderBox} ${navState ? 'text-white bg-primary-light' : 'text-primary bg-white'}`} 
        onClick={handleClick}>{navState ? (
          <>
            <span>Nevermind</span>
            {/* <svg xmlns="http://www.w3.org/2000/svg"  width="18" viewBox="0 0 256 256"><path fill="currentColor" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"></path></svg> */}
          </>
        ) : (
          <>
            <span>Explore</span>
            {/* <svg className="align-bottom text-blue" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M20 18a1 1 0 0 1 .117 1.993L20 20H10a1 1 0 0 1-.117-1.993L10 18zm0-5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0-5a1 1 0 0 1 .117 1.993L20 10H10a1 1 0 0 1-.117-1.993L10 8zm0-5a1 1 0 0 1 .117 1.993L20 5H4a1 1 0 0 1-.117-1.993L4 3z"></path></g></svg> */}
          </>
        )}</button>
    </>
  )
};

export const Navigation = () => {
  const store = useStore();
  const navState = useAtomValue(navActiveAtom, { store });

  const [count, setCount] = useState(0)
  
  const navRef = useRef(null);
  const pathname = usePathname()

  const largeNavItem = 'text-4xl font-display font-light tracking-wider text-white tracking-[0.1rem]'
  const transitionClasses = 'inline-block transition-all transform'

  const navItemsWithSlugs = [
    { name: 'Photos & Videos', slug: '/pages/photos-and-videos' },
    { name: 'Our Artists', slug: '/pages/artists' },
    { name: 'About', slug: '/pages/about' },
    { name: 'Contact', slug: '/pages/contact' },
    { name: 'News', slug: '/pages/news' },
  ]

  const smallNavItemsWithSlugs = [
    { name: 'Sponsors', slug: '/pages/sponsors' },
    { name: 'FAQs', slug: '/pages/faqs' },
    { name: 'Privacy & Legal', slug: '/pages/privacy-legal' },
  ]

  const itemsCount = navItemsWithSlugs.length + smallNavItemsWithSlugs.length

  useEffect(() => {
    if (navState) {
      const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const focusableElements = navRef.current.querySelectorAll('[tabIndex="0"]');
          const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);

          const nextIndex = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextIndex].focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [navState]);

  useEffect(() => {
    if(!navState) {
      setCount(0)
    } else {
      const interval = setInterval(() => {
        setCount(count + 1)
      }, 20)
  
      if (count === itemsCount) {
        clearInterval(interval)
      }
  
      return () => clearInterval(interval)
    }
  });

  const handleClick = () => {
    store.set(navActiveAtom, false);
  }

  const handleMouseEnter = (e, item) => {
    if(item.slug != pathname) {
      e.target.classList.add('opacity-100')
      e.target.classList.remove('opacity-70')
    }
  }

  const handleMouseLeave = (e, item) => {
    if(item.slug != pathname) {
      e.target.classList.add('opacity-70')
      e.target.classList.remove('opacity-100')
    }
  }

  const activeClasses = (index, item) => {
    return count > index ? `${item.slug == pathname ? 'opacity-100' : 'opacity-70'} translate-x-0 duration-500` : 'opacity-0 translate-x-4 duration-200'
  }

  return (
    <div ref={navRef}>
      <ExploreButton />
      <div 
        aria-hidden={!navState} 
        className={`fixed h-full z-top right-0 top-0 transform transition-all duration-300 contain-2 will-change-transform ${navState ? 'translate-x-0 opacity-100 delay-75' : 'translate-x-4 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col justify-between h-full pt-20">
          <ul className='text-right flex flex-col gap-6'>
            {navItemsWithSlugs.map((item, index) => (
              <li key={index}>
                <Link 
                  tabIndex={navState ? 0 : -1} 
                  className={`${largeNavItem} ${transitionClasses} ${activeClasses(index, item)}`} 
                  onMouseEnter={(e) => handleMouseEnter(e, item)} 
                  onMouseLeave={(e) => handleMouseLeave(e, item)} 
                  onClick={handleClick}
                  href={item.slug}
                  prefetch
                  scroll={false}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <ul className='mt-auto text-right flex flex-col gap-2'>
            {smallNavItemsWithSlugs.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.slug} 
                  tabIndex={navState ? 0 : -1} 
                  className={`${transitionClasses} ${activeClasses(index + navItemsWithSlugs.length, item)} font-light`} 
                  onMouseEnter={(e) => handleMouseEnter(e, item)} 
                  onMouseLeave={(e) => handleMouseLeave(e, item)} >{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`fixed z-middle left-0 top-0 w-full h-full bg-gradient-to-l from-primary transform transition-all duration-500 will-change-transform ${navState ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'}`}></div>
    </div>
  )
};