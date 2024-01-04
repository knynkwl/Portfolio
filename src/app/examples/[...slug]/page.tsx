'use client';

import React, { useEffect, useRef, useState } from 'react';
import fetchData from '@/app/utils/fetchData';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/prism/night-owl';
import Image from 'next/image';
import Video from '@/components/Video';
// import Background from '@/components/Background';
import parse from 'html-react-parser';

interface DataItem {
  sectionType: string;
  heading?: string;
  text?: string;
  code?: string;
  file?: string;
  fileType?: string;
  fileContent?: string;
}

export default function PageModal({
  params: { slug: slug },
}: {
  params: { slug: string[] };
}) {  
  const [data, setData] = useState<DataItem[]>([]);

  const file_path = `examples/${slug[0]}/`

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const res = await fetchData(`${file_path}content.json`);

        const newData: DataItem[] = [];
        for (const item of (res.data || []) as DataItem[]) {
          if (item.sectionType === 'code' && item.file) {
            try {
              const res = await fetchData(`${file_path}${item.file}`, 'text');
  
              item.fileContent = res;
            } catch (error) {
              console.error(`Error fetching data at ${item.file}:`, error);
            }
          }
  
          newData.push(item);
        }

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!data.length) {
      fetchDataAndSetState();
    }
  }, [data, slug, file_path]);

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const parent = target.parentElement as HTMLElement;

    if (parent.classList.contains('expanded')) {
      parent.classList.remove('expanded');
    } else {
      parent.classList.add('expanded');
    }
  }

  return (
    <article className="w-full p-8">
      <div className={`relative bg-blue-2 border border-[#091949] overflow-y-scroll md:overflow-hidden w-full max-w-5xl p-6 mx-auto duration-500 transition-all transform ${data.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        <div className="examples relative z-10 flex items-start flex-col gap-8">
          {data && data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              {item.sectionType === 'title' && (
                <h1 key={`title-${index}`} className="text-4xl font-display">{item.text}</h1>
              )}

              {item.sectionType === 'heading' && (
                <h2 key={`heading-${index}`} className="text-3xl font-display">{item.text}</h2>
              )}

              {item.sectionType === 'text' && (
                <p key={`text-${index}`} className="text-xl leading-9 opacity-70 underline-links font-body">
                  {parse(item.text)}
                </p>
              )}

              {item.sectionType === 'button' && (
                <a key={`text-${index}`} href={item.url} target="_blank" className="bg-blue-3 text-white px-4 py-2 rounded-md inline-block">
                  {item.text}
                </a>
              )}

              {item.sectionType === 'image' && (
                <Image
                  src={`/${file_path}${item.file}`}
                  alt={item.alt}
                  key={`image-${index}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className={`h-auto w-full`}
                  style={item.maxWidth ? { maxWidth: item.maxWidth } : {}}/>
              )}

              {item.sectionType === 'video' && (
                <Video
                  key={`video-${index}`}
                  loading="lazy"
                  autoplay
                  muted
                  loop
                  style={item.maxWidth ? { maxWidth: item.maxWidth } : {}}>
                  <source src={`/${file_path}${item.file}`} type="video/webm" />
                </Video>
              )}

              {item.fileContent && (
                <SyntaxHighlighter 
                  key={`highlight-${index}`} 
                  className="opacity-80 [&>*]:!font-body max-w-full" 
                  language={item.fileType} 
                  style={nightOwl}
                  onClick={handleOnClick}>
                  {item.fileContent}
                </SyntaxHighlighter>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* <Background /> */}
      </div>
    </article>
  );
};
