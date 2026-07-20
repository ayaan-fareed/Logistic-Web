'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { latLonToVector3 } from './globeMath';

function Route({ from, to }: { from: [number, number]; to: [number, number] }) {
  const marker = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const start = latLonToVector3(...from, 1.735);
    const end = latLonToVector3(...to, 1.735);
    const arcHeight = 2.08 + start.distanceTo(end) * 0.22;
    const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(arcHeight);
    return new THREE.CubicBezierCurve3(start, middle, middle, end);
  }, [from, to]);
  const points = useMemo(() => curve.getPoints(70), [curve]);

  useFrame((state) => {
    if (marker.current) marker.current.position.copy(curve.getPoint((state.clock.elapsedTime * 0.14) % 1));
  });

  return <group><Line points={points} color="#ff6a00" lineWidth={0.75} dashed dashSize={0.06} gapSize={0.16} transparent opacity={0.68} /><mesh ref={marker}><sphereGeometry args={[0.028, 12, 12]} /><meshBasicMaterial color="#ff6a00" transparent opacity={0.9} /></mesh></group>;
}

export default function Routes() {
  return <group><Route from={[38.9072, -77.0369]} to={[51.5072, -0.1276]} /><Route from={[51.5072, -0.1276]} to={[25.2048, 55.2708]} /><Route from={[25.2048, 55.2708]} to={[28.6139, 77.209]} /><Route from={[28.6139, 77.209]} to={[35.6762, 139.6503]} /><Route from={[1.3521, 103.8198]} to={[-35.2809, 149.13]} /><Route from={[-15.7939, -47.8828]} to={[-25.7479, 28.2293]} /></group>;
}
