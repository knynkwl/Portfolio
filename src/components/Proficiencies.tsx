"use client"

import { useEffect, useState } from 'react';
import styles from './Proficiencies.module.css'
import shuffle from '@/utils/shuffle';

interface ProficienciesProps {
  showContent: boolean;
}

const skills = [
  'typescript',
  'react',
  'nextjs',
  'nodejs',
  'es6+',
  'css3',
  'html5',
  'web components',
  'graphql',
  'sql',
  'a11y',
  'tailwind css',
  'leadership',
  'figma',
  'restapi',
  'devops',
  'aws',
  'devops',
  'e2e',
  'unit testing',
  'ci/cd',
  'agile',
  'docker',
  'headless',
  'guitar|personal',
  'jazz|personal',
  'gardening|personal',
  'dyslexic|personal',
  'father|personal',
  'wood working|personal'
];

const Proficiencies: React.FC<ProficienciesProps> = ({showContent}) => {
  const [shuffledSkills, setShuffledSkills] = useState<string[]>([]);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    const shuffled = shuffle([...skills]);
    setShuffledSkills(shuffled);

    if (showContent) {
      const timer = setTimeout(() => {
        setActiveIndexes(Array.from({ length: shuffled.length }, (_, index) => index));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [showContent]);

  const handleHover = () => {
    setIsHovered(true);
    setHasHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="">
      {shuffledSkills.length > 0 && (
        <ul 
          className="inline-flex flex-wrap gap-2 md:gap-3 max-w-[680px]"
          onMouseOver={handleHover}
          onMouseLeave={handleMouseLeave}>
          {shuffledSkills.map((item, index) => (
            <li 
              className={`rounded-full pt-[5px] pb-[7px] px-[14px] md:px-[19px] text-xs md:text-sm mix-blend-exclusion bg-[#001a646e] text-[#4877FF] pointer-events-none ${styles.fadeInUpItem} ${activeIndexes.includes(index) ? styles.active  : ''}`} 
              style={{ transitionDelay: `${hasHovered ? 0.01 : index * 0.05}s`, opacity: `${hasHovered && (isHovered && item.includes('|personal') ? '0.3' : '1')}` }}
              key={index}>
              {item.replace("|personal", "")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}   

export default Proficiencies;