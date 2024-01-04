// components/SanityImage.tsx
import React from 'react';
import Image from 'next/image';
import { urlForImage } from '@/utils/sanity';

interface SanityImageProps {
  imageSource: string; // Assuming the image source is a Sanity image asset URL
  altText: string;
  width?: number;
  height?: number;
}

const SanityImage: React.FC<SanityImageProps> = ({ imageSource, altText, width, height }) => {
  const imageUrlBuilder = urlForImage(imageSource)

  if (width) {
    imageUrlBuilder.width(width);
  }

  if (height) {
    imageUrlBuilder.height(height);
  }
  
  const imageUrl = imageUrlBuilder.url() || '';

  return <Image 
    src={imageUrl} 
    alt={altText} 
    {...(width && { width: width.toString() })} 
    {...(height && { height: height.toString() })}
    {...(!width && !height && { fill: 'cover' })} />;
};

export default SanityImage;
