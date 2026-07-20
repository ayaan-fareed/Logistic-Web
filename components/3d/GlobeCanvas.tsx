'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GlobeScene from './GlobeScene';

export default function GlobeCanvas() {
  return (
    <div style={{ height: '100%', position: 'relative', width: '100%' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 42, position: [0, 0, 5.3] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ cursor: 'grab', height: '100%', touchAction: 'none', width: '100%' }}
        onPointerDown={(event) => { event.currentTarget.style.cursor = 'grabbing'; }}
        onPointerUp={(event) => { event.currentTarget.style.cursor = 'grab'; }}
        onPointerLeave={(event) => { event.currentTarget.style.cursor = 'grab'; }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
