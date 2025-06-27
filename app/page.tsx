'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';

import dynamic from 'next/dynamic';
const Moon3D = dynamic(() => import('@/components/Moon3D'), { ssr: false });

type Shape = {
  id: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
  rotation: number;
  type: 'circle' | 'triangle' | 'square';
};

type Meteor = {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
  rotation: number;
};

type Puff = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number; // controls fading
};

function MeteorShower() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [puffs, setPuffs] = useState<Puff[]>([]);

  // Spawn meteors at random positions on top every 100ms
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const id = Date.now() + Math.random();
      const size = Math.random() * 6 + 4;
      const startX = Math.random() * window.innerWidth;
      const startY = -20; // start above the top viewport

      setMeteors((prev) => [
        ...prev,
        {
          id,
          x: startX,
          y: startY,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: Math.random() * 3 + 3,
          size,
          opacity: 1,
          rotation: Math.random() * 360,
        },
      ]);
    }, 100);

    return () => clearInterval(spawnInterval);
  }, []);

  // Move meteors and handle bottom hit + puffs
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setMeteors((prev) => {
        let newPuffs: Puff[] = [];

        const updatedMeteors = prev
        .map((m) => {
          const newY = m.y + m.speedY;
          if (newY + m.size >= window.innerHeight) {
            // Create puff at ground level
            newPuffs.push({
              id: Date.now() + Math.random(),
              x: m.x,
              y: window.innerHeight,
              size: m.size * 2 + Math.random() * 10,
              opacity: 1,
              life: 20,
            });
            return null; // remove meteor
          }
          return {
            ...m,
            y: newY,
            x: m.x + m.speedX,
            opacity: m.opacity - 0.006,
            rotation: m.rotation + 4,
          };
        })
        .filter(Boolean) as Meteor[];


        if (newPuffs.length > 0) {
          setPuffs((oldPuffs) => [...oldPuffs, ...newPuffs]);
        }

        return updatedMeteors;
      });

      // Update puffs: fade and shrink them
      setPuffs((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.05,
            life: p.life - 1,
            size: p.size * 0.95,
          }))
          .filter((p) => p.opacity > 0 && p.life > 0)
      );
    }, 30);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <>
      {/* Meteors */}
      {meteors.map((m) => (
        <div
          key={m.id}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            left: m.x,
            top: m.y,
            width: m.size,
            height: m.size,
            background:
              'radial-gradient(circle at 30% 30%, #a0c4ff, transparent 70%)',
            borderRadius: '50%',
            opacity: m.opacity,
            transform: `rotate(${m.rotation}deg)`,
            boxShadow: '0 0 8px 2px rgba(160, 196, 255, 0.8)',
            zIndex: 9999,
            filter: 'drop-shadow(0 5px 5px rgba(0, 0, 50, 0.3))', // subtle shadow on "ground"
          }}
        />
      ))}

      {/* Smoke puffs on ground */}
      {puffs.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size / 2,
            background:
              'radial-gradient(ellipse at center, rgba(200, 200, 200, 0.5), transparent 70%)',
            borderRadius: '50%',
            opacity: p.opacity,
            filter: 'blur(2px)',
            transform: `translate(-50%, 0)`,
            zIndex: 9998,
          }}
        />
      ))}
    </>
  );
}

export default function HomeContent() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [hoveringButton, setHoveringButton] = useState(false);
  const shapeId = useRef(0); // avoids hydration mismatch from random state
  const shapeTypes: Shape['type'][] = ['circle', 'triangle', 'square'];
  const colors = ['#003366', '#004080', '#0059b3', '#0073e6', '#3399ff']; // dark blue shades
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });

      const newShape: Shape = {
        id: `${shapeId.current++}_${Date.now()}`, // unique id
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      };

      setShapes((prev) => [...prev, newShape]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;

    const interval = setInterval(() => {
      setShapes((prev) =>
        prev
          .map((s) => ({ ...s, opacity: s.opacity - 0.05 }))
          .filter((s) => s.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [hasMounted]);

  if (typeof window === 'undefined' || !hasMounted) return null;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ cursor: 'default' }} // hide default cursor
    >
      {/* <CustomCursor /> */}

      {/* 3D Moon */}
      <Moon3D />

      {/* Meteor Shower */}
      <MeteorShower />

      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] bg-[length:200%_200%] z-0"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'easeInOut',
        }}
      />

      {/* Cursor Trail */}
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.type === 'triangle' ? 'transparent' : s.color,
            opacity: s.opacity,
            pointerEvents: 'none',
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            borderRadius: s.type === 'circle' ? '9999px' : '4px',
            zIndex: 2,
            clipPath:
              s.type === 'triangle'
                ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
                : 'none',
            border: s.type === 'triangle' ? `solid ${s.color} 1px` : 'none',
          }}
        />
      ))}

      {/* Main Text */}
      <motion.div
        className="relative z-10 text-center"
        animate={{
          x: mouse.x * -15,
          y: mouse.y * -15,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <motion.h1
          className="font-chewy text-white text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hey! I'm Nibir
        </motion.h1>

        <motion.p
          className="font-chewy text-white text-lg mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Wanna play a short game?
          <br />
          Click the button below!
        </motion.p>

        <motion.a
          href="/game"
          onMouseEnter={() => setHoveringButton(true)}
          onMouseLeave={() => setHoveringButton(false)}
          className="font-chewy text-black px-6 py-3 text-white rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 z-[-1] rounded-lg"
            style={{
              background:
                'linear-gradient(45deg,rgb(0, 51, 102), rgb(0, 64, 128), rgb(0, 89, 179), rgb(0, 115, 230))',
              backgroundSize: '400% 400%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '50% 100%', '0% 50%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
          />
          Play 🎮
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
