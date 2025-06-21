"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";


type Shape = {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
  rotation: number;
  type: "circle" | "triangle" | "square";
};

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [hoveringButton, setHoveringButton] = useState(false);

  const shapeTypes: Shape["type"][] = ["circle", "triangle", "square"];
  const colors = ["#6b6bff", "#ff6b6b", "#6bffb8", "#ffb86b", "#ffffff"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });

      const newShape: Shape = {
        id: idCounter,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      };

      setShapes((prev) => [...prev, newShape]);
      setIdCounter((prev) => prev + 1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [idCounter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((shapes) =>
        shapes
          .map((s) => ({ ...s, opacity: s.opacity - 0.05 }))
          .filter((s) => s.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ cursor: "none" }}
    >
      <CustomCursor />
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(45deg, #ff6b6b, #6b6bff, #ffb86b, #6bffb8)",
          backgroundSize: "400% 400%",
          filter: "blur(100px)",
          zIndex: 0,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "50% 100%", "0% 50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />

      {/* Parallax Blobs */}
      <motion.div
        className="absolute inset-0"
        style={{ pointerEvents: "none", perspective: 1000, zIndex: 1 }}
        animate={{
          x: mouse.x * 50,
          y: mouse.y * 50,
          rotateX: mouse.y * 15,
          rotateY: mouse.x * 15,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 10 }}
      >
        <div className="absolute top-[10%] left-[20%] w-40 h-40 bg-white bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[25%] w-52 h-52 bg-yellow-500 bg-opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-[50%] left-[50%] w-32 h-32 bg-pink-500 bg-opacity-30 rounded-full blur-3xl"></div>
      </motion.div>

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
            backgroundColor: s.type === "triangle" ? "transparent" : s.color,
            opacity: s.opacity,
            pointerEvents: "none",
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            borderRadius: s.type === "circle" ? "9999px" : "4px",
            zIndex: 2,
            clipPath:
              s.type === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : "none",
            border: s.type === "triangle" ? `solid ${s.color} 1px` : "none",
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
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <motion.h1
          className="font-chewy text-black text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hey! I'm Nibir
        </motion.h1>

        <motion.p
          className="font-chewy text-black text-lg mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Wanna play a short game?
          Click the button below!
        </motion.p>

        {/* Interactive Button */}
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
                "linear-gradient(45deg, #ff6b6b, #6b6bff, #ffb86b, #6bffb8)",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "50% 100%", "0% 50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          />
          Play 🎮
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
