'use client'

import { useStore, useAtomValue } from "jotai";
import { pageActiveAtom, navActiveAtom, headerHeightAtom, modalVisibleAtom } from "@/store/atoms";
import { useEffect, useState } from "react";

const Page = (props: { children: React.ReactNode, padding:boolean }) => {
  const store = useStore();
  const pageState = useAtomValue(pageActiveAtom, { store });
  const navState = useAtomValue(navActiveAtom, { store });
  const headerHeight = useAtomValue(headerHeightAtom, { store });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(!pageState) {
      store.set(pageActiveAtom, true);
    }

    const timeout = setTimeout(() => {
      setIsActive(true);
    }, 10);

    return () => {
      clearTimeout(timeout);
      setIsActive(false);
    };
  }, [store, pageState])

  const pageStyles = {
    top: headerHeight !== null ? `${headerHeight}px` : undefined,
    maxHeight: headerHeight !== null ? `calc(100vh - ${headerHeight}px)` : undefined
  };

  return (
    <div 
      style={pageStyles}
      className={`contain-r-2 fixed z-overlay bottom-0 right-0 w-[60vw] h-full transition duration-300 transform ${!isActive || navState ? 'opacity-0 pointer-events-none -translate-x-2' : 'opacit-100 translate-x-0'}`}>
      <div className={`${props.padding ? 'contain-2' : ''} bg-primary h-full`}>
        {props.children}
      </div>
    </div>
  );
}

export default Page;