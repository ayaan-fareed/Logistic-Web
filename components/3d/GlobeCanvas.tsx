'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GlobeScene from './GlobeScene';

export default function GlobeCanvas() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 42, position: [0, 0, 5.3] }} gl={{ alpha: true, antialias: true }}>
      <color attach="background" args={['#000000']} />
      <Suspense fallback={null}>
        <GlobeScene />
      </Suspense>
    </Canvas>
  );
}
