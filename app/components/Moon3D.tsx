"use client";

import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

useGLTF.preload("/models/moon.glb");

function MoonModel() {
  const moonRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/moon.glb");

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={moonRef} object={scene} scale={0.5} />;
}

export default function Moon3D() {
  return (
    <div className="absolute top-4 left-4 w-[500px] h-[500px] z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <MoonModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
