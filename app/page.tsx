"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🎨 Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #ff6b6b, #6b6bff, #ffb86b, #6bffb8)",
          backgroundSize: "400% 400%",
          filter: "blur(100px)",
        }}
        animate={{
          backgroundPosition: [
            "0% 50%", "100% 50%", "50% 100%", "0% 50%"
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />

      {/* 🌟 Floating Parallax Elements with 3D Effect */}
      <motion.div
        className="absolute inset-0"
        style={{ pointerEvents: "none", perspective: 1000 }} // Adds 3D depth
        animate={{
          x: mouse.x * 50,
          y: mouse.y * 50,
          rotateX: mouse.y * 15, // Rotates vertically
          rotateY: mouse.x * 15, // Rotates horizontally
        }}
        transition={{ type: "spring", stiffness: 40, damping: 10 }}
      >
        <div className="absolute top-[10%] left-[20%] w-40 h-40 bg-white bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[25%] w-52 h-52 bg-yellow-500 bg-opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-[50%] left-[50%] w-32 h-32 bg-pink-500 bg-opacity-30 rounded-full blur-3xl"></div>
      </motion.div>

      {/* 🎭 Foreground Parallax (Text Moves Opposite) */}
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

        {/* 🎮 Interactive Button with Dynamic Gradient */}
        <motion.a
          href="/game"
          className="font-chewy text-black px-6 py-3 text-white rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="text-black absolute inset-0"
            style={{
              background: "linear-gradient(45deg, #ff6b6b, #6b6bff, #ffb86b, #6bffb8)",
              backgroundSize: "400% 400%",
              borderRadius: "8px",
              zIndex: -1,
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


        <motion.section
        id="about"
        className="font-chewy mt-10 text-center max-w-2xl mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="text-lg text-black font-size-5">
          I'm a full-stack developer passionate about BlockChain, AI, and 3D Web Experiences.
          I love building cool stuff and learning new technologies. 
          I'm currently working on a few projects and learning new things every day.  
          Feel free to reach out to me if you have any questions or just want to chat!
        </p>
        </motion.section>

      </motion.div>
    </motion.div>
  );
}
