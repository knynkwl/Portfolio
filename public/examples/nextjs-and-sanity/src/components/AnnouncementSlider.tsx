'use client'

import React, { useState, useEffect, useMemo } from "react";

import { useStore, useAtomValue } from "jotai";
import { announcementAtom } from "@/store/atoms";

import { borderBox, blurred } from "@/utils/tw-classes";
import fetchData from "@/utils/fetchData";

import Icon from "@/components/Icon";

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
        <button onClick={handlePrevSlide} type="button">
          <Icon icon="arrow-left" />
        </button>
        <button onClick={handleNextSlide} type="button">
          <Icon icon="arrow-right" />
        </button>
      </div>

      <p className="flex gap-4 text-base tracking-wider font-light">
        {currentSlide?.announcementText} {(currentSlide?.enableLink ) && (<SlideLink currentSlide={currentSlide} /> )}
      </p>
    </div>
  );
}

export default AnnouncementSlider;