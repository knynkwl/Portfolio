import React, { useState, MouseEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css'
import shuffle from '@/utils/shuffle';

const project_images: string[] = [
  '/project-mush.webp|https://eatmush.com',
  '/project-britax.webp|https://us.britax.com',
  '/project-documented.webp|https://documented.net',
  '/project-sizzer.webp|https://sizzer.nl',
  '/project-ivy.webp|https://www.ivyconnection.com',
  '/project-mcbride.webp|https://mcbridedesign.com',
  '/project-f-suite.webp|https://www.fsuite.co',
];


const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (start: number, end: number, factor: number) => {
  const easedFactor = cubicEaseOut(factor);
  return start * (1 - easedFactor) + end * easedFactor;
};

interface ProjectsProps {
  showContent: boolean;
}

const Projects: React.FC<ProjectsProps> = ({showContent}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformX, setTransformX] = useState<number>(0);
  const [targetTransformX, setTargetTransformX] = useState<number>(0);
  const [shuffledSkills, setShuffledSkills] = useState<string[]>([]);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [lerpFactor, setLerpFactor] = useState<number>(0.04);
  const [mobile, setMobile] = useState<boolean>(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      if(window.innerWidth <= 800) {
        setMobile(true)
        return;
      }

      const mouseX: number = event.clientX;
      const windowCenter: number = window.innerWidth / 2;
      const containerWidth = containerRef.current.offsetWidth;
      const visibleAreaWidth = windowCenter * 2;
      
      // Calculate the minimum and maximum x-axis values
      const minX = -containerWidth + visibleAreaWidth;
      const maxX = containerWidth - visibleAreaWidth;
      
      const newTransformX: number = (windowCenter - (mouseX)) / windowCenter * containerWidth;

      // Clamp newTransformX to be between minX and maxX
      const clampedTransformX = Math.max(((minX/2) - 40), Math.min(((maxX/2) + 40), (newTransformX / 3)));

      setTargetTransformX(clampedTransformX);
    }
  };

  const handleMouseEnter = () => {
    setLerpFactor(0.01)
  }
  
  const handleMouseLeave = () => {
    // setTargetTransformX(0);
    // setLerpFactor(0.1)
  }
  
  useEffect(() => {
    // Shuffle the skills array
    const shuffled = shuffle([...project_images]);
    setShuffledSkills(shuffled.concat(shuffled.slice(0, 3)));

    if (showContent) {
      // Set up a timer to add 'active' class with a delay for each item
      const timer = setTimeout(() => {
        setActiveIndexes(Array.from({ length: shuffledSkills.length }, (_, index) => index));
      }, 1000);

      // Clear the timer when the component is unmounted or when the skills change
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  useEffect(() => {
    if(mobile) {
      setTransformX(0);
      return;
    }

    const updateTransform = () => {
      // Adjust the lerp factor for smoother transitions (you can experiment with different values)
      const lerpedTransformX = lerp(transformX, targetTransformX, lerpFactor);
      setTransformX(lerpedTransformX);
    };

    const animationFrameId = requestAnimationFrame(updateTransform);

    return () => cancelAnimationFrame(animationFrameId);
  }, [transformX, targetTransformX, lerpFactor, mobile]);
  

  return (
    <div
      className="flex justify-end w-full gap-10 h-full transform md:p-0 p-[30px]"
      // onMouseMove={handleMouseMove}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <div ref={containerRef} className="md:flex flex-col grid h-full md:w-auto grid-cols-2 will-change-transform" style={{ transform: `translateX(${transformX}px)` }}>
        {shuffledSkills.map((image, index) => (
          <a
            key={index}
            href={`${image.split('|')[1]}`}
            target='_blank'
            className={`group relative w-full md:w-[33vw] h-[33.33vh] flex-shrink-0 transition-transform duration-500 inline-block ${styles.fadeInUpItem} ${activeIndexes.includes(index) ? styles.active  : ''}`} 
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <Image 
              src={image.split('|')[0]} 
              alt="Project" 
              fill={true} 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`relative z-20 flex-shrink-0 scale-95 transition-transform duration-500 object-cover object-top will-change-transform`} />
            {/* <div className="absolute bottom-[100%] left-0 w-full p-2 bg-[#001a646e] hidden md:inline-block md:translate-y-40 group-hover:-translate-y-0 transition-transform duration-500 z-10 text-blue-3 text-sm text-center will-change-transform">{image.split('|')[1].replace('https://', '')}</div> */}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
