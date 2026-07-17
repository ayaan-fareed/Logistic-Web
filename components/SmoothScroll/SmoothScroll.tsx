'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    const onScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', onScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return null;
}
