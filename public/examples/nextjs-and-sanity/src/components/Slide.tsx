import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface SlideProps {
  children: ReactNode;
  index: number;
  current: number;
}

const Slide: React.FC<SlideProps> = ({ children, index, current }) => {
  const isCurrent = current === index;

  return (
    <div className={`slide ${isCurrent ? 'slide--current' : ''}`}>
      {children}
    </div>
  );
};

export default Slide;
