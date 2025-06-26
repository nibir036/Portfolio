// ArcScroller.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import modalData from "./ModalData";

export default function ArcScroller() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      setScrolling(true);
      clearTimeout(timeout);

      setActiveIndex((prev) => {
        if (e.deltaY > 0) return Math.min(prev + 1, modalData.length - 1);
        else return Math.max(prev - 1, 0);
      });

      timeout = setTimeout(() => setScrolling(false), 300);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <div className="flex h-[80%] w-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
      {/* Arc Sidebar */}
      <div className="relative w-24 flex flex-col items-center justify-center">
        <div className="absolute h-[30%] w-2 rounded-full bg-white/10"></div>
        {modalData.map((modal, i) => (
          <motion.div
            key={i}
            className="relative mb-6 cursor-pointer"
            onClick={() => setActiveIndex(i)}
            animate={{ scale: activeIndex === i ? 1.3 : 1 }}
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-white" : "bg-white/30"
              }`}
            ></div>
            {scrolling && (
              <motion.div
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-sm whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {modal.title}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Active Modal Display */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl w-full bg-black/30 backdrop-blur border border-white/10 text-white p-6 rounded-xl shadow-xl font-chewy"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              {modalData[activeIndex].title}
            </h2>
            <div className="text-lg leading-relaxed">
              {modalData[activeIndex].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
