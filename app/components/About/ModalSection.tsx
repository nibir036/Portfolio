// app/components/About/ModalSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ModalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleOpen = (e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  return (
    <>
      {/* Card Preview */}
      <motion.div
        className="bg-black/30 border border-white/10 rounded-xl p-6 mx-4 my-4 text-white font-chewy cursor-pointer hover:bg-white/10 transition"
        whileHover={{ scale: 1.02 }}
        onClick={handleOpen}
      >
        <h2 className="text-2xl font-bold text-center">{title}</h2>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal Box with fixed size near cursor */}
            <motion.div
              className="fixed z-50 bg-[#0f3460] text-white rounded-xl p-6 shadow-2xl font-chewy w-[90vw] max-w-md"
              style={{ top: pos.y, left: pos.x, transform: "translate(-50%, -10%)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <button onClick={() => setOpen(false)}>
                  <X size={24} className="hover:text-red-400 transition" />
                </button>
              </div>
              <div className="text-white text-lg leading-relaxed">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
