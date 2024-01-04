'use client'

import React, { useState, useEffect, useMemo } from "react";

import { useStore, useAtomValue } from "jotai";
import { announcementAtom } from "@/store/atoms";

import { borderBox, blurred } from "@/utils/tw-classes";
import fetchData from "@/utils/fetchData";

type Link = {
  url?: string;
  externalUrl?: string;
  isExternalLink?: boolean;
  text?: string;
};

const SlideLink: React.FC<{ currentSlide?: { link?: Link; }; }> = ({ currentSlide }) => {
  const link = currentSlide?.link;
  const url = link?.url || link?.externalUrl;
  const isExternal = link?.isExternalLink;
  const text = link?.text || link?.text;

  if (link && text) {
    return (
      <a className="underline" href={url} target={isExternal ? '_blank' : '_self'} rel="noopener noreferrer">
        {text}
      </a>
    );
  }

  return null;
};

const AnnouncementSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const store = useStore();
  const announcements = useAtomValue(announcementAtom, { store });

  const query = useMemo(() => {
    return `documentType=settings&fields=announcementSlider`;
  }, []);

  useEffect(() => {
    fetchData(query, (data: any) => {
      if (data.data[0]?.announcementSlider) {
        store.set(announcementAtom, data.data[0].announcementSlider.filter((slide: any) => slide.enabled))
      }
    });
  }, [ query, store ]);
  
  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
  };
  
  const currentSlide = announcements[slideIndex];

  return (
    <div className={`relative z-overlay flex announcement-slider transition-all duration-500 transform ${announcements.length ? `translate-x-0` : 'opacity-0 translate-x-2'} ${blurred.primary} ${borderBox} gap-6 text-white font-body`}>
      <div className="flex gap-4">
        <button onClick={handlePrevSlide}>
          <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.07118 5.33048C3.57427 5.71226 1.41894 7.11813 2.03668 7.60995C2.56468 8.02991 3.20826 8.32334 3.72794 8.75078C5.26465 10.0148 6.87315 11.2275 8.30172 12.5835C8.77894 13.0364 9.91855 13.937 9.39011 14.6286C8.56441 15.7096 7.56751 14.132 7.09293 13.6753C5.66742 12.3039 4.04228 11.0882 2.49813 9.81636C1.81296 9.25193 0.926834 8.91657 0.348927 8.2391C-0.712759 6.99421 0.896192 5.85862 1.87426 5.03743C3.48189 3.6881 5.25764 2.45258 6.98961 1.22191C7.57452 0.806445 8.22992 0.190721 8.97244 0.000206108C10.25 -0.0215028 10.3826 1.67892 9.1086 1.68379C7.37969 2.83548 5.70246 4.07773 4.07118 5.33048Z" fill="white" fillOpacity="0.38"/>
          </svg>
        </button>
        <button onClick={handleNextSlide}>
          <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.92882 9.66952C6.42573 9.28774 8.58106 7.88187 7.96332 7.39005C7.43532 6.97009 6.79174 6.67666 6.27206 6.24922C4.73535 4.98523 3.12685 3.77253 1.69828 2.41648C1.22106 1.96358 0.0814532 1.06304 0.609888 0.371351C1.4356 -0.709603 2.43249 0.868034 2.90707 1.32467C4.33258 2.69607 5.95772 3.9118 7.50187 5.18364C8.18704 5.74807 9.07317 6.08343 9.65107 6.7609C10.7128 8.00579 9.10381 9.14138 8.12574 9.96257C6.51811 11.3119 4.74236 12.5474 3.01039 13.7781C2.42548 14.1936 1.77008 14.8093 1.02756 14.9998C-0.249966 15.0215 -0.382623 13.3211 0.8914 13.3162C2.62031 12.1645 4.29754 10.9223 5.92882 9.66952Z" fill="white" fillOpacity="0.38"/>
          </svg>
        </button>
      </div>

      <p className="flex gap-4 text-base tracking-wider font-light">
        {currentSlide?.announcementText} {(currentSlide?.enableLink ) && (<SlideLink currentSlide={currentSlide} /> )}
      </p>
    </div>
  );
}

export default AnnouncementSlider;