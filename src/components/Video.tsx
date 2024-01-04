import React from 'react';

interface VideoProps {
  key: string;
  classes?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  children: React.ReactNode;
  loading?: 'eager' | 'lazy' | 'auto';
  style?: React.CSSProperties;
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
  style,
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
      style={style}
    >
      {children}
    </video>
  );
};

export default Video;
