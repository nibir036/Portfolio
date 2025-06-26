"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: "/nibir-photo.jpg", alt: "Nibir Normal" },
  { src: "/nibir-cartoon.png", alt: "Nibir Cartoon" },
];

const orbitIcons = [
  {
    href: "https://linkedin.com/in/your-link",
    icon: "/icons/linkedin.svg",
    alt: "LinkedIn",
    size: 36,
  },
  {
    href: "https://github.com/your-github",
    icon: "/icons/github.svg",
    alt: "GitHub",
    size: 36,
  },
  {
    href: "https://wa.me/your-number",
    icon: "/icons/whatsapp.svg",
    alt: "WhatsApp",
    size: 36,
  },
  {
    href: "https://x.com/your-twitter",
    icon: "/icons/x.svg",
    alt: "x",
    size: 36,
  },
  {
    href: "#",
    icon: "/icons/message.svg",
    alt: "Message",
    size: 36,
    isModal: true,
  },
];

export default function ContactPage() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-screen w-screen bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center overflow-hidden relative">
      {/* Glittering stars background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
        {/* Extra blinking stars (individual dots with animation) */}
        <div className="absolute inset-0 z-0 pointer-events-none starfield">
        {Array.from({ length: 60 }).map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = Math.random() * 1.5 + 0.5; // Between 0.5 and 2px
            return (
            <div
                key={i}
                className="star"
                style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                }}
            />
            );
        })}
        </div>

      {/* Central Star with Sliding Photo */}
      <div
        className="relative z-10 cursor-pointer w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-pulse ring-4 ring-blue-500/30"
        onClick={() => setShowModal(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[index].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Orbiting Icons on Separate Paths */}
        {orbitIcons.map((icon, i) => {
        const baseRadius = 150;
        const spacing = 50;
        const radius = baseRadius + i * spacing;
        const duration = 28 + i * 6;
        const animationName = `spin-slow-${i}`;

        return (
            <div key={i} className="absolute w-full h-full flex items-center justify-center pointer-events-none">
            {/* Orbit ring (behind) */}
            <div
                className="absolute border border-white/20 rounded-full pointer-events-none"
                style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                }}
            />

            {/* Orbiting icon (in front) */}
            <div
                className="relative"
                style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                animation: `${animationName} ${duration}s linear infinite`,
                }}
            >
                <a
                    href={icon.isModal ? "#" : icon.href}
                    target={icon.isModal ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        if (icon.isModal) {
                        e.preventDefault();
                        setShowModal(true);
                        }
                    }}
                    className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(255,255,255,0.6)] rounded-full"
                    >
                    <Image
                        src={icon.icon}
                        alt={icon.alt}
                        width={icon.size}
                        height={icon.size}
                    />
                </a>
            </div>
            </div>
        );
        })}


      {/* Fullscreen Modal */}
      {/* Contact Modal */}
        {showModal && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setShowModal(false)}
        >
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on form click
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-2xl w-[90vw] max-w-md text-white"
            >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold font-chewy">Send a Message</h2>
                <button
                onClick={() => setShowModal(false)}
                className="text-white hover:text-red-400 transition"
                >
                ✖
                </button>
            </div>
            <form
                action="mailto:nibir036@gmail.com" // Replace with your email or hook to an endpoint
                method="POST"
                encType="text/plain"
                className="flex flex-col gap-4"
            >
                <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="bg-white/10 px-4 py-2 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="bg-white/10 px-4 py-2 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                required
                className="bg-white/10 px-4 py-2 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded font-semibold"
                >
                Send
                </button>
            </form>
            </motion.div>
        </motion.div>
        )}
    </main>
  );
}
