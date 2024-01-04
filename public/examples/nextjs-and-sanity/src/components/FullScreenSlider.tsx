'use client'

import React, { useState, useEffect, useMemo } from 'react';

import styles from './FullScreenSlider.module.css';
import SanityImage from '@/components/SanityImage';

import fetchData from '@/utils/fetchData';
import { borderBox, borderBoxSm, blurred } from '@/utils/tw-classes';

import { useStore, useAtomValue } from "jotai";
import { navActiveAtom, homeSliderAtom, pageActiveAtom } from "@/store/atoms";
import Link from 'next/link';

const FullScreenSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const store = useStore();
  const navState = useAtomValue(navActiveAtom, { store });
  const sliderData = useAtomValue(homeSliderAtom, { store });
  const pageActive = useAtomValue(pageActiveAtom, { store });

  // const { useHomeSliderAtom, useNavActiveAtom } = useAtoms();
  // const [sliderData, setSliderData] = useHomeSliderAtom()
  // const [navActive,] = useNavActiveAtom()

  const query = useMemo(() => {
    return `documentType=settings&fields="imageUrls":slider[].asset`;
  }, []);

  useEffect(() => {
    fetchData(query, (data: any) => {
      if (data.data[0]?.imageUrls) {
        store.set(homeSliderAtom, data.data[0].imageUrls)
      }
    });
  });

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.fullScreenSlider}>
      <div className={`${styles.slidesContainer} ${(navState || pageActive) ? 'opacity-50 grayscale duration-500' : (sliderData.length ? 'opacity-100 scale-100 duration-1000' : 'opacity-0 scale-105 duration-500')}`}>
        {sliderData.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ''
            }`}
          >
            <SanityImage 
              imageSource={image} 
              altText={`Slide ${index + 1}`} />
            
            <div className={`absolute right-0 bottom-0 contain-2 flex gap-4`}>
              <div className={`transition-opacity duration-500 ${borderBox} ${blurred.primary} ${(navState || pageActive) ? 'opacity-0' : 'opacity-100'}`}>Artwork by Leon Keer in 2019</div>
              
              <Link 
                href={'/pages/about'}
                scroll={false}>
                <div className={`flex items-center justify-center transition-opacity duration-500 ${borderBoxSm} ${blurred.primary} ${(navState || pageActive) ? 'opacity-0' : 'opacity-100'}`}><svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.235 11.323a.735.735 0 1 1-1.47 0 .735.735 0 0 1 1.47 0ZM7.5 3.53c-1.544 0-2.794 1.122-2.794 2.5v.295a.441.441 0 0 0 .882 0v-.295c0-.891.858-1.617 1.912-1.617 1.054 0 1.912.726 1.912 1.617 0 .892-.858 1.618-1.912 1.618a.441.441 0 0 0-.441.441v.588a.441.441 0 0 0 .882 0V8.5c1.332-.19 2.353-1.225 2.353-2.47 0-1.378-1.25-2.5-2.794-2.5ZM15 7.5A7.5 7.5 0 1 1 7.5 0 7.509 7.509 0 0 1 15 7.5Zm-.882 0A6.618 6.618 0 1 0 7.5 14.118 6.624 6.624 0 0 0 14.118 7.5Z" fill="currentColor"/></svg></div>
              </Link>

            </div>
          </div>
        ))}
      </div>
      {/* <button className={styles.prevButton} onClick={handlePrevSlide}>
        Prev
      </button>
      <button className={styles.nextButton} onClick={handleNextSlide}>
        Next
      </button> */}
    </div>
  );
};

export default FullScreenSlider;
