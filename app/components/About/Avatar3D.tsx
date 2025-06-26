"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";

// 🎮 3D Model with Animation Playback
function Model(props: any) {
  const { scene, animations } = useGLTF("/models/nibir-avatar.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstClipName = animations[0].name;
      actions[firstClipName]?.play();
    }
  }, [actions, animations]);

  // Move the model slightly down on Y-axis to avoid head cut off
  return <primitive object={scene} scale={1.1} position={[0, -0.8, 0]} {...props} />;
}

// 🧑‍🎨 3D Avatar Canvas with Auto-Rotate
export default function Avatar3D() {
  return (
    <div className="w-full h-[700px] md:h-[500px]">
      <Canvas camera={{ position: [0, 1.7, 4], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        <Model />
      </Canvas>
    </div>
  );
}

// ✅ Preload the 3D model to avoid flicker
useGLTF.preload("/models/nibir-avatar.glb");
