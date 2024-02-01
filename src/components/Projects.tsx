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

const lerp = (start: number, end: number, factor: number) => {
  return start * (1 - factor) + end * factor;
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
      const containerWidth: number = containerRef.current.offsetWidth;

      const containerHalfed = containerWidth / 2;
      const newMaxX = (containerHalfed - (windowCenter - 40));
      const newMinX = -containerHalfed;
      
      const mouseNewX = mouseX - window.innerWidth / 2;
      let mappedValue = ((mouseNewX / (window.innerWidth / 2)) * newMaxX);
      mappedValue = Math.min(Math.max(mappedValue, newMinX), newMaxX);

      const clampedTransformX = -Math.max(mappedValue, newMinX);

      setTargetTransformX(clampedTransformX);

    }
  };

  const handleMouseEnter = () => {
    setLerpFactor(0.04)
  }
  
  useEffect(() => {
    const shuffled = shuffle([...project_images]);
    setShuffledSkills(shuffled);

    if (showContent) {
      const timer = setTimeout(() => {
        setActiveIndexes(Array.from({ length: shuffled.length }, (_, index) => index));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showContent]);

  useEffect(() => {
    if(mobile) {
      setTransformX(0);
      return;
    }

    const updateTransform = () => {
      const lerpedTransformX = lerp(transformX, targetTransformX, lerpFactor);
      setTransformX(lerpedTransformX);
    };

    const animationFrameId = requestAnimationFrame(updateTransform);

    return () => cancelAnimationFrame(animationFrameId);
  }, [transformX, targetTransformX, lerpFactor, mobile]);
  

  return (
    <div
      className="flex justify-center items-center gap-10 w-full md:fixed bottom-0 left-0 transform"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
    >
      <div ref={containerRef} className="md:flex grid w-full md:w-auto grid-cols-2 gap-3 md:gap-10 px-6 md:px-10 will-change-transform" style={{ transform: `translateX(${transformX}px)` }}>
        {shuffledSkills.map((image, index) => (
          <a
            key={index}
            href={`${image.split('|')[1]}`}
            target='_blank'
            className={`group relative w-full md:w-[400px] pb-[53%] md:pb-[7%] flex-shrink-0 transition-transform duration-500 inline-block ${styles.fadeInUpItem} ${activeIndexes.includes(index) ? styles.active  : ''}`} 
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <Image 
              src={image.split('|')[0]} 
              alt="Project" 
              fill={true} 
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`relative z-20 flex-shrink-0 md:translate-y-4 group-hover:-translate-y-0 transition-transform duration-500 object-contain md:object-top md:object-cover will-change-transform`} />
            <div className="absolute bottom-[100%] left-0 w-full p-2 bg-white hidden md:inline-block md:translate-y-40 group-hover:-translate-y-0 transition-transform duration-500 z-10 text-blue-1 text-sm text-center will-change-transform">{image.split('|')[1].replace('https://', '')}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
