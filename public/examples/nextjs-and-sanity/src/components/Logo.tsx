"use client"

import React, { useState, useEffect } from 'react';
import { useStore, useAtomValue } from "jotai";
import { navActiveAtom } from "@/store/atoms";

const Logo = () => {
  const store = useStore();

  const navActive = useAtomValue(navActiveAtom, {
    store,
  });

  const [dimmed, setDim] = useState(false)
  const words = ['The', 'Chalk', 'Festival'];

  useEffect(() => {
    setDim(navActive)
  })

  const renderSpan = (text: string, index: number) => {
    return (
      <span
        key={index}
        className={`transition-all duration-500 text-display ${dimmed ? 'opacity-20 font-light' : 'text-white font-bold'}`}
      >
        {text}
      </span>
    );
  };

  return (
    <div className={`flex flex-col font-display uppercase absolute bottom-0 left-0 z-middle text-white text-[54px] text-display contain-2 cursor-default selection:bg-transparent ${navActive}`}>
      {words.map((text, index) => renderSpan(text, index))}
    </div>
  );
};

export default Logo;

