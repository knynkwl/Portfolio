import React from 'react';

interface VideoProps {
  key: string;
  classes: string;
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  children: React.ReactNode;
  loading?: 'eager' | 'lazy' | 'auto';
}

declare module 'react' {
  interface VideoHTMLAttributes<T> extends DOMAttributes<T> {
    loading?: 'eager' | 'lazy' | 'auto';
  }
}

const Video: React.FC<VideoProps> = ({
  key,
  classes,
  autoplay,
  muted,
  loop,
  loading,
  children
}: VideoProps) => {
  return (
    <video
      key={key}
      className={classes}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      loading={loading}
    >
      {children}
    </video>
  );
};

export default Video;
