'use client';
import { createPortal } from 'react-dom';
import PageTemplate from '@/components/PageTemplate';

export function Modal(params: { children: React.ReactNode, slug: string[] }) {

  return createPortal(
    <>
      <PageTemplate padding={true}>
        <div className="">
          {params.children}
          <button className="close-button">
            Close
          </button>
        </div>
      </PageTemplate>
    </>,
    document.body!
  );
}