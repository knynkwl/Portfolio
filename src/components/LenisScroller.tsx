"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
// import { usePathname, useSearchParams } from "next/navigation";

interface LenisOptions {
  wrapper: HTMLDivElement;
  smooth?: boolean;
  infinite?: boolean;
}

export const LenisScroller = (containerRef) => {
  const lenis = useRef<Lenis | null>(null);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  useEffect(() => {
    if (lenis.current) lenis.current!.scrollTo(0, { immediate: true });
  }, [lenis]);

  useEffect(() => {

    const lenisOptions: LenisOptions = {
      wrapper: containerRef.current,
      smooth: true,
      infinite: true
    };

    lenis.current = new Lenis(lenisOptions);


    lenis.current.on("scroll", (e: any) => {
      console.log(e);
    });

    function raf(time: number) {
      lenis.current!.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.current!.destroy();
      lenis.current = null;
    };
  }, []);
  return <></>;
};
