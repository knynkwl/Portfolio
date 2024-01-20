import { useState, useEffect, useMemo } from 'react'

const ActionLinks = ({showContent}: {showContent: boolean}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [links, setLinks] = useState<{ text: string; href: string; }[]>([]);

 useEffect(() => {
  setLinks([
    {
      text: 'Résumé',
      href: '/downloads/Kenyon_Kowal_Resume.pdf'
    },
    {
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kenyonkowal'
    },
    {
      text: 'Email',
      href: 'mailto:hello@kenyonkowal.com'
    }
  ])
 }, [setLinks])

  useEffect(() => {
    if (showContent) {
      // Set up a timer to add 'active' class with a delay for each item
      const timer = setTimeout(() => {
        setActiveIndexes(Array.from({ length: links.length }, (_, index) => index));
      }, 1000);

      // Clear the timer when the component is unmounted or when the skills change
      return () => clearTimeout(timer);
    }
  }, [showContent, links]);
  
  const classes = 'rounded-full hover:bg-blue-3 hover:text-white transition-colors duration-300 px-3 py-2 font-body text-sm'
  
  console.log(activeIndexes);
  
  return (
    <div className={`absolute z-10 right-0 top-0 m-8 flex gap-4 transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 translate-x-4 -translate-y-4'}`}>

      {links.map((link, i) => (
        <a 
          href={link.href}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          className={`${classes} ${activeIndexes.includes(i) ? 'bg-white text-blue-3' : 'bg-blue-3 text-white'}`}>
            {link.text}
        </a>
      ))}

      {/* <a href="/downloads/Kenyon_Kowal_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={classes}>
        Résumé
      </a>
      <a href="https://www.linkedin.com/in/kenyonkowal"
        target="_blank"
        rel="noopener noreferrer"
        className={classes}>
        LinkedIn
      </a>
      <a 
        href="mailto:hello@kenyonkowal.com" 
        target="_blank"
        rel="noopener noreferrer"
        className={classes}>Email</a> */}
    </div>
  )
}

export default ActionLinks;