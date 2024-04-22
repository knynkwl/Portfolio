'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Proficiencies from '@/components/Proficiencies';
import Background from '@/components/Background';
import ActionLinks from '@/components/ActionLinks';
import works from '@/utils/works';

export default function Page() {
  return (
    <div className={`font-display relative bg-blue-2 border border-[#091949] md:overflow-hidden transition-all duration-1000 w-[calc(100vw-40px)] mt-6 overflow-scroll`}>
      <div className={`py-[24px] px-6 md:px-10 relative z-10 flex items-start justify-center flex-col`}>
        <div className={`text-[30px] md:text-[42px] font-extralight transition-all duration-1000 opacity-100 transform translate-x-0 translate-y-0`}>Hey, I&#39;m Kenyon</div>
        <p className={`text-lg max-w-[700px] font-light transition-all duration-1000 text-blue-3 opacity-100 transform translate-x-0`}>Curious Coder - Creative Thinker</p>

        {/* <Proficiencies showContent={true} /> */}
        <ActionLinks showContent={true} />
      </div>

      <div className="grid grid-cols-3 gap-6 py-[24px] px-6 md:px-10 relative z-10">
        {works.map((work, index) => (
          <div key={index} className="aspect-video bg-blue-2 bg-opacity-0 relative group hover:bg-blue-3 transition-colors duration-500">
            <a
              key={index}
              href={`${work.split('|')[1]}`}
              target='_blank'
            >
              <Image 
                src={work.split('|')[0]} 
                alt="Project" 
                fill={true} 
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`p-2 object-contain object-top border overflow-hidden`} />

              <p className="absolute bottom-0 left-0 p-4 bg-blue-2 group-hover:bg-blue-3 w-full text-xs text-center transition-colors duration-500">{work.split('|')[1].replace('https://', '')}</p>
            </a>
          </div>
        ))}
      </div>
    
      <Background />
    </div>
  );
}