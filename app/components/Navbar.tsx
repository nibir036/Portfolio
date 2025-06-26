"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Twitter, Facebook } from "lucide-react"; // Icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bouncing letter animation
  const bounceVariant = {
    initial: { y: 0 },
    hover: { y: -5, transition: { yoyo: Infinity, duration: 0.3 } },
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full text-white py-4 px-6 flex justify-between items-center shadow-lg z-50 transition-all duration-300 ${
        scrolling ? "bg-black/50 backdrop-blur-md shadow-md" : "bg-black/50"
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Logo */}
      <Link href="/" className="font-pacifico text-2xl font-bold tracking-widest flex space-x-1 overflow-hidden">
        {"Nibir's Portfolio".split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={bounceVariant}
            initial="initial"
            whileHover="hover"
          >
            {char === " " ? "\u00A0" : char} {/* Handle space correctly */}
          </motion.span>
        ))}
      </Link>

      {/* Desktop Menu */}
      <div className="font-pacifico hidden md:flex space-x-6 text-lg">
        {["Home", "About", "Contact"].map((item, index) => (
          <Link
            key={index}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className={`relative group overflow-hidden ${pathname === "/" && item === "Home" ? "text-green-400" : ""}`}
          >
            {item}
            <motion.span
              className="absolute left-0 bottom-[2px] h-[2px] bg-white w-0 group-hover:w-full block origin-left transition-all duration-300"
            />
          </Link>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="hidden md:flex space-x-4">
        <a href="https://github.com/nibir036" target="_blank" rel="noopener noreferrer">
          <Github className="hover:text-gray-300 transition duration-200" />
        </a>
        <a href="https://www.linkedin.com/in/nibir036/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="hover:text-gray-300 transition duration-200" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <Twitter className="hover:text-gray-300 transition duration-200" />
        </a>
        <a href="https://facebook.com/hellboy722" target="_blank" rel="noopener noreferrer">
          <Facebook className="hover:text-gray-300 transition duration-200" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          className="font-pacifico absolute top-16 left-0 w-full bg-black bg-opacity-90 flex flex-col items-center space-y-4 py-6 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {["Home", "About", "Projects", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`hover:text-green-400 transition ${pathname === "/" && item === "Home" ? "text-green-400" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
