'use client';

import * as THREE from 'three';

const atmosphereVertex = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const atmosphereFragment = `
varying vec3 vNormal;
void main() {
  float fresnel = pow(1.0 - abs(vNormal.z), 3.0);
  vec3 color = mix(vec3(0.0, 0.08, 0.5), vec3(0.08, 0.42, 1.0), fresnel);
  gl_FragColor = vec4(color, fresnel * 0.88);
}`;

export default function Atmosphere() {
  return (
    <group>
      <mesh scale={1.035} renderOrder={1}>
        <sphereGeometry args={[1.7, 96, 96]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh scale={1.12} renderOrder={0}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshBasicMaterial color="#064cff" transparent opacity={0.055} side={THREE.BackSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
