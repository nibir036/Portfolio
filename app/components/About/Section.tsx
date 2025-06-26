"use client";

import { motion } from "framer-motion";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white font-chewy">
        {title}
      </h2>
      <div className="text-lg text-white font-light leading-relaxed font-chewy">
        {children}
      </div>
    </motion.section>
  );
}
