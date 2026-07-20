'use client';

import { Billboard, Html, Line, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGlobePoints } from '@/hooks/useGlobePoints';

const GLOBE_RADIUS = 5;

const locations = [
  { name: 'USA', coordinates: [37.0902, -95.7129] },
  { name: 'CANADA', coordinates: [56.1304, -106.3468] },
  { name: 'BRAZIL', coordinates: [-14.235, -51.9253] },
  { name: 'UK', coordinates: [55.3781, -3.436] },
  { name: 'SPAIN', coordinates: [40.4637, -3.7492] },
  { name: 'GERMANY', coordinates: [51.1657, 10.4515] },
  { name: 'TURKEY', coordinates: [38.9637, 35.2433] },
  { name: 'SOUTH AFRICA', coordinates: [-30.5595, 22.9375] },
  { name: 'INDIA', coordinates: [20.5937, 78.9629] },
  { name: 'JAPAN', coordinates: [36.2048, 138.2529] },
  { name: 'AUSTRALIA', coordinates: [-25.2744, 133.7751] },
] as const;

type LocationName = (typeof locations)[number]['name'];
type Coordinates = readonly [number, number];

const routes: Array<[LocationName, LocationName]> = [
  ['USA', 'UK'],
  ['CANADA', 'GERMANY'],
  ['USA', 'BRAZIL'],
  ['BRAZIL', 'SOUTH AFRICA'],
  ['SPAIN', 'SOUTH AFRICA'],
  ['SOUTH AFRICA', 'INDIA'],
  ['INDIA', 'JAPAN'],
  ['INDIA', 'AUSTRALIA'],
];

const pointVertexShader = `
  varying float vVisibility;
  uniform float uPixelRatio;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec3 surfaceNormal = normalize(worldPosition.xyz);
    vec3 cameraDirection = normalize(cameraPosition - worldPosition.xyz);
    vVisibility = smoothstep(-0.35, 0.25, dot(surfaceNormal, cameraDirection));
    vec4 mvPosition = viewMatrix * worldPosition;
    gl_PointSize = 2.5 * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const pointFragmentShader = `
  varying float vVisibility;

  void main() {
    float edge = 1.0 - smoothstep(0.32, 0.5, distance(gl_PointCoord, vec2(0.5)));
    gl_FragColor = vec4(vec3(0.627, 0.706, 0.941), edge * mix(0.3, 0.92, vVisibility));
  }
`;

function latLonToVector3([latitude, longitude]: Coordinates, radius = GLOBE_RADIUS) {
  const phi = THREE.MathUtils.degToRad(90 - latitude);
  const theta = THREE.MathUtils.degToRad(longitude + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function LandmassPoints() {
  const { gl, viewport } = useThree();
  const points = useGlobePoints(viewport.width < 8 ? 12000 : 26000, GLOBE_RADIUS);
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    points.forEach(({ x, y, z }, index) => positions.set([x, y, z], index * 3));
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, [points]);
  const uniforms = useMemo(() => ({ uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) } }), [gl]);

  useFrame(() => {
    if (material.current) material.current.uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2);
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial ref={material} uniforms={uniforms} vertexShader={pointVertexShader} fragmentShader={pointFragmentShader} transparent depthWrite={false} />
    </points>
  );
}

function LocationMarker({ name, coordinates }: (typeof locations)[number]) {
  const position = useMemo(() => latLonToVector3(coordinates, GLOBE_RADIUS + 0.055), [coordinates]);
  const aura = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!aura.current) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 2.4 + position.y) * 0.13;
    aura.current.scale.setScalar(scale);
  });

  return (
    <group position={position}>
      <Billboard>
        <mesh ref={aura}>
          <circleGeometry args={[0.19, 32]} />
          <meshBasicMaterial color="#FF5500" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.075, 0.11, 32]} />
          <meshBasicMaterial color="#FF5500" transparent opacity={0.48} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.05, 24]} />
          <meshBasicMaterial color="#FF5500" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.018, 16]} />
          <meshBasicMaterial color="#FFFFFF" depthWrite={false} />
        </mesh>
      </Billboard>
      <Html position={[0.13, 0.07, 0]} distanceFactor={10} occlude style={{ pointerEvents: 'none' }}>
        <span className="select-none whitespace-nowrap text-[10px] font-bold tracking-[0.1em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">{name}</span>
      </Html>
    </group>
  );
}

function RouteArc({ from, to }: { from: Coordinates; to: Coordinates }) {
  const points = useMemo(() => {
    const start = latLonToVector3(from, GLOBE_RADIUS + 0.09);
    const end = latLonToVector3(to, GLOBE_RADIUS + 0.09);
    const distance = start.distanceTo(end);
    const midpoint = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS + 0.65 + distance * 0.16);
    return new THREE.QuadraticBezierCurve3(start, midpoint, end).getPoints(72);
  }, [from, to]);

  return <Line points={points} color="#FF5500" lineWidth={0.75} dashed dashSize={0.1} gapSize={0.12} transparent opacity={0.68} depthWrite={false} />;
}

function GlobeContent() {
  const locationsByName = useMemo(() => new Map(locations.map((location) => [location.name, location])), []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 8, 10]} intensity={0.65} color="#A0B4F0" />
      <group rotation={[0, (Math.PI * 2) / 3, 0]}>
        <mesh renderOrder={-1}>
          <sphereGeometry args={[GLOBE_RADIUS, 64, 48]} />
          <meshBasicMaterial colorWrite={false} />
        </mesh>
        <LandmassPoints />
        {routes.map(([from, to]) => <RouteArc key={`${from}-${to}`} from={locationsByName.get(from)!.coordinates} to={locationsByName.get(to)!.coordinates} />)}
        {locations.map((location) => <LocationMarker key={location.name} {...location} />)}
      </group>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={0.4} />
    </>
  );
}

export default function DottedGlobe() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#020204]">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 15] }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ cursor: 'grab', height: '100%', touchAction: 'none', width: '100%' }}
        onPointerDown={(event) => { event.currentTarget.style.cursor = 'grabbing'; }}
        onPointerUp={(event) => { event.currentTarget.style.cursor = 'grab'; }}
        onPointerLeave={(event) => { event.currentTarget.style.cursor = 'grab'; }}
      >
        <color attach="background" args={['#020204']} />
        <Suspense fallback={null}>
          <GlobeContent />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full border border-white/15 bg-slate-950/70 px-5 py-2.5 text-sm text-slate-300 shadow-2xl backdrop-blur-md">
        <svg aria-hidden="true" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a1.5 1.5 0 0 1 3 0v3m0 1V5.5a1.5 1.5 0 0 1 3 0V11m0-3a1.5 1.5 0 0 1 3 0v4m0-2a1.5 1.5 0 0 1 3 0v4.5a5.5 5.5 0 0 1-5.5 5.5h-1A6.5 6.5 0 0 1 5 13.5V11a1.5 1.5 0 0 1 3 0Z" />
        </svg>
        <span>Drag to rotate the globe</span>
      </div>
    </div>
  );
}
