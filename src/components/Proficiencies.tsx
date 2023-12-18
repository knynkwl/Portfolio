"use client"

import { useEffect, useState } from 'react';
import styles from './Proficiencies.module.css'
import shuffle from '@/utils/shuffle';

interface ProficienciesProps {
  showContent: boolean;
}

const Proficiencies: React.FC<ProficienciesProps> = ({showContent}) => {
  const [skills, setSkills] = useState<string[]>([
    'typescript',
    'react',
    'nextjs',
    'es6',
    'css3',
    'postcss',
    'tailwind css',
    'team management',
    'figma',
    'restapi',
    'devops',
    'aws',
    'digital ocean',
    'craftcms',
    'contentful',
    'webflow',
    'wordpress',
    'shopify plus',
    'guitar|personal',
    'jazz|personal',
    'gardening|personal',
    'dyslexic|personal',
    'father|personal',
    'wood working|personal'
  ]);

  const [shuffledSkills, setShuffledSkills] = useState<string[]>([]);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    // Shuffle the skills array
    const shuffled = shuffle([...skills]);
    setShuffledSkills(shuffled);

    if (showContent) {
      // Set up a timer to add 'active' class with a delay for each item
      const timer = setTimeout(() => {
        setActiveIndexes(Array.from({ length: shuffled.length }, (_, index) => index));
      }, 200);

      // Clear the timer when the component is unmounted or when the skills change
      return () => clearTimeout(timer);
    }
  }, [skills, showContent]); // Run the effect whenever skills change // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

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