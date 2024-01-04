import { useEffect, useRef, KeyboardEvent } from 'react';

interface UseFocusTrapOptions {
  trapActive: boolean;
}

const useFocusTrap = ({ trapActive }: UseFocusTrapOptions) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  console.log('useFocusTrap');

  useEffect(() => {
    const handleFocusTrap = (e: KeyboardEvent) => {
      console.log(e);
      
      if (e.key === 'Tab' && trapActive) {
        e.preventDefault();

        const focusableElements = containerRef.current?.querySelectorAll(
          'a[href], button, input, select, textarea'
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        if (e.shiftKey) {
          // If shift key is pressed, move focus to the previous element
          if (document.activeElement === firstElement) {
            lastElement?.focus();
          } else {
            const currentTabIndex = Array.from(focusableElements ?? []).indexOf(
              document.activeElement as Element
            );
            const previousElement = focusableElements?.[currentTabIndex - 1] as HTMLElement;
            previousElement && previousElement.focus();
          }
        } else {
          // Otherwise, move focus to the next element
          if (document.activeElement === lastElement) {
            firstElement?.focus();
          } else {
            const currentTabIndex = Array.from(focusableElements ?? []).indexOf(
              document.activeElement as Element
            );
            const nextElement = focusableElements?.[currentTabIndex + 1] as HTMLElement;
            nextElement && nextElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);

    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [trapActive]);

  return containerRef;
};

export default useFocusTrap;
