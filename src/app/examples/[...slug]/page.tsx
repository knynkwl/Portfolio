import 'server-only'

import React from 'react';
import probe from 'probe-image-size';

import fetchData from '@/utils/fetchData';
import Example from '@/components/Example';

interface DataItem {
  sectionType: string;
  heading?: string;
  text?: string;
  code?: string;
  file?: string;
  fileType?: string;
  fileContent?: string;
  width?: string;
  height?: string;
}

export default async function ExamplePage({ params }: { params: { slug: string[] } }) {
  const file_path = `examples/${params.slug[0]}/`

  const fetchAndUpdate = async () => {
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
  
        if(item.sectionType === 'image' && item.file) {
          const dimensions = await probe(`${process.env.TLD}/${file_path}${item.file}`);
          item.width = dimensions.width;
          item.height = dimensions.height;
        }
  
        newData.push(item);
      }
  
      return newData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const data = await fetchAndUpdate();

  // console.log(data);
  
  return <Example data={data} filePath={file_path} />;
}
