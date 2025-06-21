"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .cursor-pointer")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-white"
        style={{
          width: 32,
          height: 32,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,0.15)" : "transparent",
          borderColor: isHovering ? "#fff" : "rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001] bg-white rounded-full"
        style={{
          width: 8,
          height: 8,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
