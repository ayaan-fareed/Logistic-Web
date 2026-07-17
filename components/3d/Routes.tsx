'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { latLonToVector3 } from './globeMath';

function Route({ from, to }: { from: [number, number]; to: [number, number] }) {
  const marker = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    const start = latLonToVector3(...from, 1.73);
    const end = latLonToVector3(...to, 1.73);
    const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.45);
    return new THREE.CubicBezierCurve3(start, middle, middle, end);
  }, [from, to]);
  const points = useMemo(() => curve.getPoints(70), [curve]);

  useFrame((state) => {
    if (marker.current) marker.current.position.copy(curve.getPoint((state.clock.elapsedTime * 0.14) % 1));
  });

  return <group><Line points={points} color="#f26b38" lineWidth={1.1} dashed dashSize={0.08} gapSize={0.13} transparent opacity={0.86} /><mesh ref={marker}><sphereGeometry args={[0.032, 12, 12]} /><meshBasicMaterial color="#f26b38" /></mesh></group>;
}

export default function Routes() {
  return <group><Route from={[35.68, 139.65]} to={[51.51, -0.13]} /><Route from={[35.68, 139.65]} to={[40.42, -3.7]} /><Route from={[39, 35]} to={[51.17, 10.45]} /><Route from={[56, -106]} to={[51.51, -0.13]} /></group>;
}
