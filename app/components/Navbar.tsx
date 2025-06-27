"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Projects", "Services", "Contact"];

  const isActive = (item: string) => {
    if (item === "Home") return pathname === "/";
    return pathname.startsWith(`/${item.toLowerCase()}`);
  };

  const bounceVariant = {
    initial: { y: 0 },
    hover: { y: -5, transition: { yoyo: Infinity, duration: 0.3 } },
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full text-white py-4 px-6 flex justify-between items-center shadow-lg z-50 transition-all duration-300 ${
        scrolling ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-black/30"
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={mounted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 1 }} // drop-down after page load
    >
      {/* Logo with bouncing letters */}
      <Link href="/" className="font-pacifico text-2xl font-bold tracking-widest flex space-x-1 overflow-hidden">
        {"Nibir's Portfolio".split("").map((char, i) => (
          <motion.span key={i} variants={bounceVariant} initial="initial" whileHover="hover">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Link>

      {/* Desktop Nav */}
      <div className="font-pacifico hidden md:flex space-x-6 text-lg">
        {navLinks.map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className={`relative group overflow-hidden ${
              isActive(item) ? "text-blue-400" : ""
            }`}
          >
            {item}
            <motion.span
              className="absolute left-0 bottom-[2px] h-[2px] bg-white w-0 group-hover:w-full block origin-left transition-all duration-300"
            />
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          className="font-pacifico absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center space-y-4 py-6 text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={`hover:text-blue-400 transition ${
                isActive(item) ? "text-blue-400" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
