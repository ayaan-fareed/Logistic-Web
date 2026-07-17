'use client';

import { useEffect, useState } from 'react';

export type GlobePoint = { x: number; y: number; z: number; phase: number };

const toUv = (x: number, y: number, z: number) => ({
  u: 0.5 + Math.atan2(z, x) / (Math.PI * 2),
  v: 0.5 - Math.asin(y) / Math.PI,
});

function fibonacciPoints(count: number, radius: number, sample: (u: number, v: number) => boolean) {
  const points: GlobePoint[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const radial = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radial;
    const z = Math.sin(theta) * radial;
    const uv = toUv(x, y, z);

    if (sample(uv.u, uv.v)) points.push({ x: x * radius, y: y * radius, z: z * radius, phase: (i % 97) / 97 });
  }

  return points;
}

export function useGlobePoints(count: number, radius: number) {
  const [points, setPoints] = useState<GlobePoint[]>([]);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = '/textures/earth-landmask.svg';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const isLand = (u: number, v: number) => {
        const x = Math.min(canvas.width - 1, Math.max(0, Math.floor(u * canvas.width)));
        const y = Math.min(canvas.height - 1, Math.max(0, Math.floor(v * canvas.height)));
        return pixels[(y * canvas.width + x) * 4] > 90;
      };

      const nextPoints = fibonacciPoints(count, radius, isLand);
      if (!cancelled) setPoints(nextPoints);
    };

    return () => {
      cancelled = true;
    };
  }, [count, radius]);

  return points;
}
