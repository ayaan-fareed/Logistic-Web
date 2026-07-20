'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GlobeScene from './GlobeScene';

export default function GlobeCanvas() {
  return (
    <div style={{ height: '100%', position: 'relative', width: '100%' }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 42, position: [0, 0, 5.3] }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ cursor: 'grab', height: '100%', touchAction: 'none', width: '100%' }}
        onPointerDown={(event) => { event.currentTarget.style.cursor = 'grabbing'; }}
        onPointerUp={(event) => { event.currentTarget.style.cursor = 'grab'; }}
        onPointerLeave={(event) => { event.currentTarget.style.cursor = 'grab'; }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={null}>
          <GlobeScene />
        </Suspense>
      </Canvas>
      <div className="globe-drag-hint" style={{ alignItems: 'center', background: 'rgba(2, 5, 10, 0.72)', border: '1px solid rgba(172, 194, 235, 0.34)', borderRadius: 999, bottom: 48, color: '#9eb1d8', display: 'flex', fontSize: 11, fontWeight: 500, gap: 9, left: '50%', letterSpacing: '0.05em', padding: '10px 20px', pointerEvents: 'none', position: 'absolute', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
        <span style={{ color: '#d5e1fc', fontSize: 16, lineHeight: 0 }}>☝</span>
        Drag to rotate the globe
      </div>
    </div>
  );
}
