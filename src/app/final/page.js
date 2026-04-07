"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  BadgeCheck,
  MessageCircle,
  Users,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import Navbar from "../(component)/navbar/Navbar";
import Footer from "../(component)/footer/Footer";
import Whatsapp from "../(component)/whatsapp/Whatsapp";

export default function FinalPage() {
  const router = useRouter();

  /* 🎉 CONFETTI ON PAGE LOAD */
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#facc15", "#22c55e", "#3b82f6"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#facc15", "#22c55e", "#3b82f6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <>
    <div className="min-h-screen  bg-[#0b0c17] text-white flex items-center justify-center px-4 overflow-hidden">
   
   <Navbar/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mt-36 w-full text-center"
      >
        {/* Trophy */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simulation <span className="text-blue-500">Complete!</span>
        </h1>

        <p className="text-gray-400 mb-10">
          You successfully represented{" "}
          <span className="text-white font-semibold">China</span> in the{" "}
          <span className="text-white font-semibold">UNSC</span>.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#121425] border border-gray-800 rounded-xl p-6">
            <BadgeCheck className="text-emerald-400 mb-3" />
            <h3 className="font-semibold">Beginner Friendly</h3>
            <p className="text-sm text-gray-400">Completed intro simulation</p>
          </div>

          <div className="bg-[#121425] border border-gray-800 rounded-xl p-6">
            <MessageCircle className="text-blue-400 mb-3" />
            <h3 className="font-semibold">Speaking Confidence +1</h3>
            <p className="text-sm text-gray-400">Raised motions successfully</p>
          </div>

          <div className="bg-[#121425] border border-gray-800 rounded-xl p-6">
            <Users className="text-blue-500 mb-3" />
            <h3 className="font-semibold">Diplomacy Skill +1</h3>
            <p className="text-sm text-gray-400">Represented your nation</p>
          </div>
        </div>

        {/* Ready */}
        <div className="bg-[#121425] border border-gray-800 rounded-2xl p-8 mb-10">
          <h3 className="text-xl font-semibold mb-3">
            You{"'"}re Ready for{" "}
            <span className="text-blue-500">ATSAS MUN</span>
          </h3>
          <p className="text-gray-400 text-sm">
            You now understand the basics of Model United Nations. The real
            conference experience is even more thrilling.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/RegisterNow">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition">
              Register for ATSAS MUN <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          <button
            onClick={() => router.push("/Live-MUN")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-500 transition"
          >
            <RotateCcw className="w-5 h-5" /> Try Again
          </button>
        </div>

        <p className="text-xs mb-5 text-gray-500 mt-10">
          Powered by ATSAS Model United Nations
        </p>
      </motion.div>
    </div>

    <Footer />
          <Whatsapp/>
    
    </>

  );
}
