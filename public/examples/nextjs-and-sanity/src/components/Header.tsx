"use client"
import { useEffect, useRef } from 'react';

import AnnouncementSlider from '@/components/AnnouncementSlider'
import {Navigation} from '@/components/Navigation';

import { borderBox, blurred } from '@/utils/tw-classes'
import { useStore, useAtomValue } from "jotai";
import { navActiveAtom, pageActiveAtom, headerHeightAtom } from "@/store/atoms";

const Header = () => {
  const store = useStore();
  const headerRef = useRef<HTMLElement>(null);
  const pageState = useAtomValue(pageActiveAtom, { store });
  const navState = useAtomValue(navActiveAtom, { store });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const newHeight = entries[0].contentRect.height;
      store.set(headerHeightAtom, newHeight);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [headerRef.current, store]);

  return (
    <header ref={headerRef} className='absolute z-top left-0 top-0 w-full'>
      <div className="contain-2 flex justify-between gap-[calc(var(--contain)*2)]">
        <div className="flex gap-[calc(var(--contain)*2)]">
          <button className={`font-body font-bold relative z-overlay transition-all duration-500 ${navState || pageState ? `${blurred.yellow} text-primary` : `${blurred.purple} text-white`} ${borderBox}`}>Donate Today!</button>
          <AnnouncementSlider />
        </div>

        <Navigation />
      </div>
    </header>
  )
}

export default Header;