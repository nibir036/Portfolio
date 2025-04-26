"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Avatar from "../components/Avatar";

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-black text-white min-h-screen">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-[url('/circuitry.png')] bg-cover bg-center opacity-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.5 }}
        transition={{ duration: 1 }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center py-20 px-6 md:px-20">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
          {/* Profile Image */}
          <Image
            src="/nibir.jpg"
            alt="Nibir"
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-lg"
          />

          {/* Name & Title */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold">Muktadirul Islam Nibir</h1>
            <p className="text-lg text-gray-300">Software Developer & AI Enthusiast</p>
          </div>

          {/* Avatar */}
          <Avatar />
        </div>

        {/* Main Content */}
        <div className="mt-12 max-w-4xl space-y-10">
          {/* Life Story */}
          <motion.section
            className="bg-white text-black p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold">Life Story</h2>
            <p>I've always been passionate about technology, AI, and blockchain. My journey started at Faujdarhat Cadet College, where I excelled academically, and now I'm pursuing a degree in Computer Science at BRAC University...</p>
          </motion.section>

          {/* Skills & Interests */}
          <motion.section
            className="bg-white text-black p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold">Skills & Interests</h2>
            <p>Proficient in full-stack development (MERN), Python, AI, blockchain, and more. Love playing guitar and cooking!</p>
          </motion.section>

          {/* Certifications & Awards */}
          <motion.section
            className="bg-white text-black p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold">Certifications & Awards</h2>
            <p>Duke of Edinburgh's Award (Bronze), 21st Century Employability Skilling Program, etc.</p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
