"use client";

import Avatar3D from "@/app/components/About/Avatar3D";
import ArcScroller from "@/app/components/About/ArcScroller";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="h-screen overflow-hidden bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] bg-[length:200%_200%] animate-gradient-x flex flex-col">
      {/* 🧑 Avatar Header */}
      {/* <section className="pt-20 flex flex-col items-center px-4">
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl shadow-xl">
          <Avatar3D />
        </div>
        <h1 className="text-4xl text-white font-bold text-center mt-6 font-chewy">
          Nibir Islam
        </h1>
        <p className="text-center text-white font-light text-lg mt-2 font-chewy">
          Programmer • Blockchain & AI Enthusiast • Creative Explorer
        </p>
      </section> */}

      {/* Main Content: Avatar Left & ArcScroller Right */}
      <section className="flex flex-grow max-w-6xl mx-auto h-full w-full mt-12 px-4 gap-8">
        {/* Left: Smaller Avatar (optional or can be replaced with bio, etc.) */}
        <div className="hidden md:flex flex-col items-center w-half">
          <div className="w-full rounded-2xl shadow-xl overflow-hidden">
            {/* You can reuse Avatar3D here or show a profile pic or short bio */}
            <Avatar3D />
          </div>
          <h1 className="text-4xl text-white font-bold text-center mt-6 font-chewy">
          Muktadirul Islam Nibir
          </h1>
          <p className="text-center text-white font-light text-lg mt-2 font-chewy">
            Full Stack Developer
            <br />
            Creative Explorer
            <br />
            Blockchain & AI Enthusiast
          </p>
          <br />
          <br />
          <Link href="/contact" className="hover:underline hover:text-blue-300 transition cursor-pointer font-chewy">
          Wanna build something together? Reach out anytime.
          </Link>
        </div>

        {/* Right: ArcScroller fills remaining width */}
        <div className="flex-1 min-w-0">
          <ArcScroller />
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="text-center py-8 text-white font-chewy">
        <Link href="/contact" className="hover:underline hover:text-blue-300 transition cursor-pointer">
          Wanna build something together? Reach out anytime. 🚀
        </Link>
      </footer> */}
    </main>
  );
}
