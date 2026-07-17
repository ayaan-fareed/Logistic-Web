'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { latLonToVector3 } from './globeMath';

const locations: Array<{ name: string; lat: number; lon: number }> = [
  { name: 'Canada', lat: 56, lon: -106 },
  { name: 'UK', lat: 54, lon: -2 },
  { name: 'Germany', lat: 51, lon: 10 },
  { name: 'Turkey', lat: 39, lon: 35 },
  { name: 'Spain', lat: 40, lon: -4 },
  { name: 'Japan', lat: 36, lon: 138 },
];

function Marker({ name, lat, lon }: { name: string; lat: number; lon: number }) {
  const pulse = useRef<THREE.Mesh>(null);
  const position = latLonToVector3(lat, lon, 1.735);

  useFrame((state) => {
    if (!pulse.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2.8 + lat) * 0.32;
    pulse.current.scale.setScalar(scale);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = 0.45 - (scale - 1) * 0.4;
  });

  return (
    <group position={position}>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#ff6a22" transparent />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color="#fff2dc" />
      </mesh>
      <Html transform distanceFactor={7} position={[0.06, 0.05, 0]} style={{ pointerEvents: 'none' }}>
        <div className="globe-location-label"><i />{name}</div>
      </Html>
    </group>
  );
}

export default function GlobeMarkers() {
  return <group>{locations.map((location) => <Marker key={location.name} {...location} />)}</group>;
}
