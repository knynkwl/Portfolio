// 'use client';

// import React, { useEffect, useState } from 'react';
// import fetchData from '@/utils/fetchData';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import nightOwl from 'react-syntax-highlighter/dist/esm/styles/prism/night-owl';
// import Image from 'next/image';
// import Video from '@/components/Video';
// // import Background from '@/components/Background';
// import parse from 'html-react-parser';
// import probe from 'probe-image-size';

// interface DataItem {
//   sectionType: string;
//   heading?: string;
//   text?: string;
//   code?: string;
//   file?: string;
//   fileType?: string;
//   fileContent?: string;
//   width?: string;
//   height?: string;
// }

// export default function PageModal({
//   params: { slug: slug },
// }: {
//   params: { slug: string[] };
// }) {  
//   const [data, setData] = useState<DataItem[]>([]);

//   const file_path = `examples/${slug[0]}/`

//   useEffect(() => {
//     const fetchDataAndSetState = async () => {
//       try {
//         const res = await fetchData(`${file_path}content.json`);

//         const newData: DataItem[] = [];

//         for (const item of (res.data || []) as DataItem[]) {
//           if (item.sectionType === 'code' && item.file) {
//             try {
//               const res = await fetchData(`${file_path}${item.file}`, 'text');
  
//               item.fileContent = res;
//             } catch (error) {
//               console.error(`Error fetching data at ${item.file}:`, error);
//             }
//           }

//           if(item.sectionType === 'image' && item.file) {
//             const dimensions = await probe(`${window.location.origin}/${file_path}${item.file}`);
//             item.width = dimensions.width;
//             item.height = dimensions.height;
//           }
  
//           newData.push(item);
//         }

//         setData(newData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (!data.length) {
//       fetchDataAndSetState();
//     }
//   }, [data, slug, file_path]);

//   const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
//     const target = e.target as HTMLElement;
//     const parent = target.parentElement as HTMLElement;

//     parent.classList.toggle('expanded');
//   }

//   return (
//     <article className="w-full p-8">
//       <div className={`relative bg-blue-2 border border-[#091949] overflow-y-scroll md:overflow-hidden w-full max-w-5xl p-6 mx-auto duration-500 transition-all transform ${data.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
//         <div className="examples relative z-10 flex items-start flex-col gap-8">
//           {data && data.map((item: any, index: number) => (
//             <React.Fragment key={index}>
//               {item.sectionType === 'title' && (
//                 <h1 key={`title-${index}`} className="text-4xl font-display">{item.text}</h1>
//               )}

//               {item.sectionType === 'heading' && (
//                 <h2 key={`heading-${index}`} className="text-3xl font-display">{item.text}</h2>
//               )}

//               {item.sectionType === 'text' && (
//                 <p key={`text-${index}`} className="text-xl leading-9 opacity-70 underline-links font-body">
//                   {parse(item.text)}
//                 </p>
//               )}

//               {item.sectionType === 'button' && (
//                 <a key={`text-${index}`} href={item.url} target="_blank" className="bg-blue-3 text-white px-4 py-2 rounded-md inline-block">
//                   {item.text}
//                 </a>
//               )}

//               {item.sectionType === 'image' && (
//                 <Image
//                   src={`/${file_path}${item.file}`}
//                   alt={`Example Image - /${file_path}${item.file}`}
//                   key={`image-${index}`}
//                   width={item.width ? item.width : 0}
//                   height={item.height ? item.height : 0}
//                   sizes="100vw"
//                   className={`h-auto w-full`}
//                   style={item.maxWidth ? { maxWidth: item.maxWidth } : {}}/>
//               )}

//               {item.sectionType === 'video' && (
//                 <Video
//                   key={`video-${index}`}
//                   loading="lazy"
//                   autoplay
//                   muted
//                   loop
//                   style={item.maxWidth ? { maxWidth: item.maxWidth } : {}}>
//                   <source src={`/${file_path}${item.file}`} type="video/webm" />
//                 </Video>
//               )}

//               {item.fileContent && (
//                 <div className="w-full">
//                   <SyntaxHighlighter 
//                     key={`highlight-${index}`} 
//                     className="opacity-80 [&>*]:!font-body max-w-full" 
//                     language={item.fileType} 
//                     style={nightOwl}
//                     onClick={handleOnClick}>
//                     {item.fileContent}
//                   </SyntaxHighlighter>
//                   <a href={`/${file_path}${item.file}`} target="_blank" download className="inline-flex items-center gap-2 mt-4 bg-[#091949] py-3 px-4 rounded-md text-sm">Download File <svg className="opacity-50" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 6.25a.75.75 0 0 1 .75.75v5.19l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7a.75.75 0 0 1 .75-.75M7.25 17a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75"></path><path fill="currentColor" fillRule="evenodd" d="M11.943 1.25c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19zM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62" clipRule="evenodd"></path></svg></a>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* <Background /> */}
//       </div>
//     </article>
//   );
// };
