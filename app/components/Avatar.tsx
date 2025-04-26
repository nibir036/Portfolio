"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Avatar() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="relative w-40 h-40 md:w-48 md:h-48"
      animate={{
        x: (mouseX - window.innerWidth / 2) * 0.01,
        y: (mouseY - window.innerHeight / 2) * 0.01,
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Head */}
      <div className="w-full h-full bg-yellow-400 rounded-full flex justify-center items-center border-4 border-black relative">
        {/* Glasses */}
        <div className="absolute top-10 flex space-x-2">
          <div className="w-8 h-5 border-4 border-black bg-transparent rounded-md"></div>
          <div className="w-8 h-5 border-4 border-black bg-transparent rounded-md"></div>
          <div className="w-4 h-1 bg-black"></div>
        </div>

        {/* Eyes (Move slightly based on cursor) */}
        <motion.div
          className="absolute top-12 flex space-x-3"
          animate={{
            x: (mouseX - window.innerWidth / 2) * 0.005,
            y: (mouseY - window.innerHeight / 2) * 0.005,
          }}
        >
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </motion.div>

        {/* Hair */}
        <div className="absolute top-0 left-5 w-8 h-5 bg-black rotate-[-20deg]"></div>
        <div className="absolute top-0 left-12 w-8 h-5 bg-black rotate-[10deg]"></div>
        <div className="absolute top-0 left-20 w-8 h-5 bg-black rotate-[20deg]"></div>

        {/* Shirt */}
        <div className="absolute bottom-[-10px] w-24 h-12 bg-gray-700 rounded-md"></div>
      </div>
    </motion.div>
  );
}
