'use client';
import { useEffect, useRef } from 'react';
import styles from './DotMap.module.scss';

export default function DotMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    const cols = 60;
    const rows = 30;
    const spacingX = width / cols;
    const spacingY = height / rows;

    const dots: { x: number; y: number; delay: number }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const nx = i / cols;
        const ny = j / rows;
        const landChance =
          Math.sin(nx * 8) * Math.cos(ny * 6) + Math.sin(nx * 3 + ny * 4);
        if (landChance > 0.3) {
          dots.push({
            x: i * spacingX,
            y: j * spacingY,
            delay: Math.random() * 2,
          });
        }
      }
    }

    let start: number | null = null;
    function animate(timestamp: number) {
      if (!ctx) return;
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000;

      ctx.clearRect(0, 0, width, height);
      dots.forEach((dot) => {
        const progress = Math.min(1, Math.max(0, (elapsed - dot.delay) / 1.5));
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 * progress})`;
        ctx.fill();
      });

      if (elapsed < 5) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className={styles.dotMap} />;
}
