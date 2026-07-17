'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGlobePoints } from '@/hooks/useGlobePoints';

const vertexShader = `
precision highp float;
uniform float uTime;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 center = modelViewMatrix * vec4(instanceMatrix[3].xyz, 1.0);
  float pulse = 1.0 + sin(uTime * 1.5 + instanceMatrix[3].x * 3.0 + instanceMatrix[3].y) * 0.12;
  center.xy += position.xy * pulse;
  gl_Position = projectionMatrix * center;
}`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
void main() {
  float distanceToCenter = distance(vUv, vec2(0.5));
  float edge = smoothstep(0.5, 0.42, distanceToCenter);
  gl_FragColor = vec4(vec3(0.72, 0.8, 1.0), edge * 0.72);
}`;

export default function DotGlobe() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.RawShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const { viewport } = useThree();
  const mobile = viewport.width < 7;
  const points = useGlobePoints(mobile ? 3500 : 14000, 1.62);

  useEffect(() => {
    if (!mesh.current) return;
    const matrix = new THREE.Matrix4();
    points.forEach((point, index) => {
      matrix.makeTranslation(point.x, point.y, point.z);
      mesh.current?.setMatrixAt(index, matrix);
    });
    mesh.current.count = points.length;
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [points]);

  useFrame((state, delta) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (!group.current) return;
    const entrance = Math.min(1, state.clock.elapsedTime / 1.1);
    const eased = 1 - Math.pow(1 - entrance, 4);
    const scale = 0.8 + eased * 0.2;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-delta * 7));
  });

  return (
    <group ref={group} scale={0.8}>
      <instancedMesh ref={mesh} args={[undefined, undefined, points.length]}>
        <circleGeometry args={[0.016, 8]} />
        <rawShaderMaterial ref={material} transparent depthWrite={false} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
      </instancedMesh>
    </group>
  );
}
