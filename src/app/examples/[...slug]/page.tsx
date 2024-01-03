'use client';

import React, { useEffect, useRef, useState } from 'react';
import fetchData from '@/app/utils/fetchData';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/prism/night-owl';
import Background from '@/components/Background';
import Image from 'next/image';
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

  return (
    <article className="w-full p-8">
      <div className={`relative bg-blue-2 border border-[#091949] overflow-y-scroll md:overflow-hidden w-full max-w-5xl p-6 mx-auto duration-500 transition-all transform ${data.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        <div className="examples relative z-10 flex flex-col gap-8">
          {data && data.map((item: any, index: number) => (
            <React.Fragment key={index}>
              {item.sectionType === 'title' && (
                <h1 key={`title-${index}`} className="text-4xl">{item.text}</h1>
              )}

              {item.sectionType === 'heading' && (
                <h2 key={`heading-${index}`} className="text-3xl">{item.text}</h2>
              )}

              {item.sectionType === 'text' && (
                <p key={`text-${index}`} className="text-xl leading-8 underline-links">
                  {parse(item.text)}
                </p>
              )}

              {item.sectionType === 'image' && (
                <Image
                  src={`/${file_path}${item.file}`}
                  alt={item.alt}
                  key={`image-${index}`}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-[300px] h-auto"/>
              )}

              {item.sectionType === 'video' && (
                <video 
                  key={`video-${index}`}
                  autoPlay
                  muted
                  loop>
                  <source src={`/${file_path}${item.file}`} type="video/webm" />
                </video>
              )}

              {item.fileContent && (
                <SyntaxHighlighter key={`highlight-${index}`} className="opacity-80" language={item.fileType} style={nightOwl}>
                  {item.fileContent}
                </SyntaxHighlighter>
              )}
            </React.Fragment>
          ))}
        </div>

        <Background />
      </div>
    </article>
  );
};
