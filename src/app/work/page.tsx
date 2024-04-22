'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Proficiencies from '@/components/Proficiencies';
import Background from '@/components/Background';
import ActionLinks from '@/components/ActionLinks';
import works from '@/utils/works';
import Link from 'next/link';

const example_links = [
  {
    headline: 'NextJS & Headless CMS (Sanity.io)',
    description: 'Sneak peek at a full-stack web application using NextJS and Sanity.io.',
    href: '/examples/nextjs-and-sanity'
  },
  {
    headline: 'JavaScript / ES6+',
    description: 'A collection of JavaScript examples.',
    href: '/examples/javascript'
  },
  {
    headline: 'Design & QA',
    description: 'Some examples of my design and QA work.',
    href: '/examples/design-and-qa'
  },
  {
    headline: 'Accessibility',
    description: 'A collection of accessibility examples.',
    href: '/examples/accessibility'
  }
]

const Headline = ({
  headline
}: {
  headline: string
}) => {
  return (
    <h2 className='text-[28px] md:text-[36px] font-extralight transition-all duration-1000 opacity-100 transform translate-x-0 translate-y-0 mt-6 mb-4'>{headline}</h2>
  )
}

const gridClasses = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'

export default function Page() {
  return (
    <div className={`font-display relative bg-blue-2 border border-[#091949] md:overflow-hidden transition-all duration-1000 w-[calc(100vw-40px)] my-6 overflow-scroll`}>
      <div className={`py-[24px] px-6 md:px-10 relative z-10 flex items-start justify-center flex-col`}>
        <div className={`text-[30px] md:text-[42px] font-extralight transition-all duration-1000 opacity-100 transform translate-x-0 translate-y-0`}>Hey, I&#39;m Kenyon</div>
        <p className={`text-lg max-w-[700px] font-light transition-all duration-1000 text-blue-3 opacity-100 transform translate-x-0`}>Curious Coder - Creative Thinker</p>

        {/* <Proficiencies showContent={true} /> */}
        <ActionLinks showContent={true} />
      </div>

      <div className="py-[24px] px-6 md:px-10 relative z-10">
        <Headline headline="Work" />
        <section className={gridClasses}>

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
        </section>

        <section className="">
          <Headline headline="Examples" />

          <div className={gridClasses}>

            {example_links.map((link, i) => (
              <article key={i} className='border border-blue-3 border-opacity-40 p-6 rounded-md'>
                <h1 className="text-[20px]">{link.headline}</h1>
                <p className="text-[16px] my-2 opacity-80">{link.description}</p>
                <Link href={link.href} key={i} className="underline">
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Background />
    </div>
  );
}