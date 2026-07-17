'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import GlobeScene from './GlobeScene';

export default function GlobeCanvas() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 42, position: [0, 0, 5.3] }} gl={{ alpha: true, antialias: true }}>
      <color attach="background" args={['#020307']} />
      <Suspense fallback={null}>
        <GlobeScene />
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.65} luminanceThreshold={0.2} luminanceSmoothing={0.5} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
