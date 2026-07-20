'use client';

import { OrbitControls, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import DotGlobe from './DotGlobe';
import GlobeMarkers from './GlobeMarkers';
import Routes from './Routes';

export default function GlobeScene() {
  const controls = useRef<OrbitControlsImpl>(null);
  const resumeRotationAt = useRef(0);

  useFrame(() => {
    if (!controls.current) return;
    controls.current.autoRotate = performance.now() >= resumeRotationAt.current;
    controls.current.update();
  });

  return (
    <>
      <group>
        <DotGlobe />
        <Routes />
        <GlobeMarkers />
      </group>
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.075}
        rotateSpeed={0.56}
        autoRotate
        autoRotateSpeed={0.42}
        onStart={() => { resumeRotationAt.current = Number.POSITIVE_INFINITY; }}
        onEnd={() => { resumeRotationAt.current = performance.now() + 2400; }}
      />
      <Stars radius={28} depth={18} count={500} factor={1.4} saturation={0} fade speed={0.25} />
    </>
  );
}
