'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useStore, useAtomValue } from "jotai";
import { pageActiveAtom, navActiveAtom, modalVisibleAtom } from "@/store/atoms";
import { borderBox, blurred } from '@/utils/tw-classes'
import PageTemplate from '@/components/Page';

export function Modal(params: { children: React.ReactNode, slug: string[] }) {
  const router = useRouter();
  const pathname = usePathname()

  const store = useStore();
  const modalVisible = useAtomValue(modalVisibleAtom, { store });
  const pageActive = useAtomValue(pageActiveAtom, { store });
  
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    store.set(pageActiveAtom, true);
    setIsActive(true);
  
    return () => {
      store.set(pageActiveAtom, false);
      setIsActive(false);
    };
  }, [store, pageActiveAtom]);

  const onClick = () => {
    if (pathname.split('/').filter(Boolean).length > 2) {
      console.log('back');
      router.back();
    } else {
      console.log('router.push');
      setIsActive(false)
      router.push('/', { scroll: false });
      store.set(modalVisibleAtom, false);
      // store.set(pageActiveAtom, false);
    }
  
    // Set modalVisibleAtom to false when the modal is closed
  };

  return (isActive)
    ? createPortal(
    <>
      <PageTemplate padding={true}>
        <div className="">
          {params.children}
          <button onClick={onClick}  className="close-button">
            Close
          </button>
        </div>
      </PageTemplate>
    </>,
    document.body!
  ) : null;
}