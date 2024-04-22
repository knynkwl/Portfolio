import { useState, useEffect, useRef } from 'react'

const items = [
  {
    text: 'Résumé',
    href: '/downloads/Kenyon_Kowal_CV.pdf'
  },
  {
    text: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kenyonkowal'
  },
  {
    text: 'Email',
    href: 'mailto:hello@kenyonkowal.com'
  }
];

const timeout_items: NodeJS.Timeout[] = [];

const ActionLinks = ({showContent}: {showContent: boolean}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const activeIndexesRef = useRef<number[]>(activeIndexes);

  useEffect(() => {
    activeIndexesRef.current = activeIndexes; 
  }, [activeIndexes]);

  useEffect(() => {
    if (showContent) {
      const timeoutId = setTimeout(() => {
        items.forEach((item, index) => {
          timeout_items[index] = setTimeout(() => {
            setActiveIndexes((prev) => [...prev, index]);
          }, (index + 1) * 200);
        });
      }, 2000)

  
      return () => {
        clearTimeout(timeoutId)
        timeout_items.forEach((timeout) => clearTimeout(timeout));
      };
    }
  }, [showContent]);
  
  const classes = 'inline-block rounded-full hover:underline hover:bg-opacity-50 hover:text-white duration-1000 font-body text-xs md:text-sm transition-all ease-out will-change-transform mix-blend-exclusion text-[white]'
  
  return (
    <div className={`md:absolute z-10 right-0 top-0 md:m-8 flex gap-4`}>

      {items.map((link, i) => (
        <a 
          href={link.href}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          className={`${classes} ${activeIndexes.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {link.text}
        </a>
      ))}
    </div>
  )
}

export default ActionLinks;