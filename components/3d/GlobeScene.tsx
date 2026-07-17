'use client';

import { PresentationControls, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import Atmosphere from './Atmosphere';
import DotGlobe from './DotGlobe';
import GlobeMarkers from './GlobeMarkers';
import Routes from './Routes';

export default function GlobeScene() {
  const scene = useRef<THREE.Group>(null);

  // The scene drifts continuously; PresentationControls adds damped mouse/touch drag without enabling zoom.
  useFrame((_, delta) => {
    if (scene.current) scene.current.rotation.y += delta * 0.045;
  });

  return (
    <PresentationControls global={false} rotation={[0.08, -0.88, -0.08]} polar={[-0.35, 0.35]} azimuth={[-1.3, 0.5]} snap>
      <group ref={scene}>
        <DotGlobe />
        <Atmosphere />
        <Routes />
        <GlobeMarkers />
      </group>
      <Stars radius={28} depth={18} count={500} factor={1.4} saturation={0} fade speed={0.25} />
    </PresentationControls>
  );
}
