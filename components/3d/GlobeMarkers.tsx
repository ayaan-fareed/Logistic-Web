'use client';

import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { latLonToVector3 } from './globeMath';

type Location = { name: string; lat: number; lon: number; label?: boolean };

const locations: Location[] = [
  { name: 'USA', lat: 38.9072, lon: -77.0369, label: true },
  { name: 'Canada', lat: 45.4215, lon: -75.6972, label: true },
  { name: 'Mexico', lat: 19.4326, lon: -99.1332, label: true },
  { name: 'Brazil', lat: -15.7939, lon: -47.8828, label: true },
  { name: 'UK', lat: 51.5072, lon: -0.1276, label: true },
  { name: 'Germany', lat: 52.52, lon: 13.405, label: true },
  { name: 'France', lat: 48.8566, lon: 2.3522 },
  { name: 'Spain', lat: 40.4168, lon: -3.7038, label: true },
  { name: 'Italy', lat: 41.9028, lon: 12.4964 },
  { name: 'Turkey', lat: 39.9334, lon: 32.8597, label: true },
  { name: 'UAE', lat: 25.2048, lon: 55.2708, label: true },
  { name: 'Saudi Arabia', lat: 24.7136, lon: 46.6753 },
  { name: 'India', lat: 28.6139, lon: 77.209, label: true },
  { name: 'China', lat: 39.9042, lon: 116.4074 },
  { name: 'Japan', lat: 35.6762, lon: 139.6503, label: true },
  { name: 'South Korea', lat: 37.5665, lon: 126.978 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, label: true },
  { name: 'Australia', lat: -35.2809, lon: 149.13, label: true },
  { name: 'South Africa', lat: -25.7479, lon: 28.2293, label: true },
];

function Marker({ name, lat, lon, label, labelVisible, onMarkerReady }: Location & { labelVisible: boolean; onMarkerReady: (marker: THREE.Group | null) => void }) {
  const marker = useRef<THREE.Group>(null);
  const pulse = useRef<THREE.Mesh>(null);
  const position = useMemo(() => latLonToVector3(lat, lon, 1.742), [lat, lon]);

  useFrame((state) => {
    if (!marker.current || !pulse.current) return;
    const distance = marker.current.getWorldPosition(new THREE.Vector3()).distanceTo(state.camera.position);
    const depth = THREE.MathUtils.clamp(1.2 - (distance - 3.55) * 0.22, 0.68, 1.12);
    const scale = depth * (1 + Math.sin(state.clock.elapsedTime * 2.1 + lat) * 0.18);
    pulse.current.scale.setScalar(scale);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = 0.18 + depth * 0.22;
  });

  return (
    <group ref={(node) => { marker.current = node; onMarkerReady(node); }} position={position}>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ff6a00" transparent depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color="#fff4e8" />
      </mesh>
      {label && (
        <Html transform occlude distanceFactor={8.5} position={[0.075, 0.06, 0]} style={{ opacity: labelVisible ? 1 : 0, pointerEvents: 'none', transition: 'opacity 220ms ease' }}>
          <div className="globe-location-label" aria-hidden={!labelVisible}>{name}</div>
        </Html>
      )}
    </group>
  );
}

export default function GlobeMarkers() {
  const markerRefs = useRef(new Map<string, THREE.Group>());
  const [visibleNames, setVisibleNames] = useState<Set<string>>(() => new Set());

  useFrame((state) => {
    const occupied: Array<{ x: number; y: number }> = [];
    const nextVisible = new Set<string>();
    const candidates = locations
      .filter((location) => location.label)
      .map((location) => {
        const marker = markerRefs.current.get(location.name);
        const position = marker?.getWorldPosition(new THREE.Vector3());
        return { location, position, distance: position?.distanceTo(state.camera.position) ?? Number.POSITIVE_INFINITY };
      })
      .filter((candidate): candidate is { location: Location; position: THREE.Vector3; distance: number } => Boolean(candidate.position))
      .filter(({ position }) => position.normalize().dot(state.camera.position.clone().normalize()) > 0.12)
      .sort((a, b) => a.distance - b.distance);

    candidates.forEach(({ location, position }) => {
      const projected = position.project(state.camera);
      const collision = occupied.some(({ x, y }) => Math.abs(x - projected.x) < 0.16 && Math.abs(y - projected.y) < 0.075);
      if (!collision) {
        occupied.push({ x: projected.x, y: projected.y });
        nextVisible.add(location.name);
      }
    });

    setVisibleNames((current) => {
      if (current.size === nextVisible.size && [...current].every((name) => nextVisible.has(name))) return current;
      return nextVisible;
    });
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.7, 48, 32]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
      {locations.map((location) => <Marker key={location.name} {...location} labelVisible={visibleNames.has(location.name)} onMarkerReady={(marker) => { if (marker) markerRefs.current.set(location.name, marker); else markerRefs.current.delete(location.name); }} />)}
    </group>
  );
}
