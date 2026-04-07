"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Scale,
  Shield,
  Leaf,
  Hand,
  AlertCircle,
  MessageSquare,
  Check,
  Gavel,
  ArrowRight,
} from "lucide-react";
import Navbar from "../(component)/navbar/Navbar";
import Footer from "../(component)/footer/Footer";
import ParticleCanvas from "../(component)/ParticleCanvas";
import Whatsapp from "../(component)/whatsapp/Whatsapp";

/* ---------------- COMMITTEES ---------------- */
const committees = [
  {
    id: "unhrc",
    name: "UNHRC",
    fullName: "United Nations Human Rights Council",
    agenda: "Addressing human rights violations in conflict zones",
    icon: Scale,
  },
  {
    id: "unsc",
    name: "UNSC",
    fullName: "United Nations Security Council",
    agenda: "Maintaining international peace and security",
    icon: Shield,
  },
  {
    id: "unep",
    name: "UNEP",
    fullName: "United Nations Environment Programme",
    agenda: "Climate action and sustainable development",
    icon: Leaf,
  },
];

/* ---------------- COUNTRIES ---------------- */
const countries = [
  
  { code: "TR", name: "Türkiye" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "UK", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "MY", name: "Malaysia" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  
  
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: "AF", name: "Afghanistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "LK", name: "Sri Lanka" },


  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  
  { code: "QA", name: "Qatar" },
  { code: "IR", name: "Iran" },
  { code: "IL", name: "Israel" },

  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "EG", name: "Egypt" },

  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
];


/* ---------------- MOTIONS ---------------- */
const motionItems = [
  {
    id: "open-debate",
    name: "Motion to Open Debate",
    icon: MessageSquare,
    response:
      "Motion passes. The debate is now open. Delegates may begin their statements.",
    description: "Begin formal discussion on the agenda",
  },
  {
    id: "moderated-caucus",
    name: "Motion for Moderated Caucus",
    icon: Hand,
    response:
      "Motion is in order. We will have a 10-minute moderated caucus with 1-minute speaking time per delegate.",
    description: "Request structured speaking time",
  },
  {
    id: "point-of-order",
    name: "Point of Order",
    icon: AlertCircle,
    response:
      "Point of order noted. Please follow parliamentary procedure. The Chair reminds all delegates to maintain decorum.",
    description: "Raise a procedural concern",
  },
];

export default function LiveMUNPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [search, setSearch] = useState("");
  const [showAllCountries, setShowAllCountries] = useState(false);

  const [usedMotions, setUsedMotions] = useState([]);
  const [currentResponse, setCurrentResponse] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const visibleCountries =
    search || showAllCountries ? filteredCountries : filteredCountries.slice(0, 5);

  /* ---------------- MOTION HANDLERS ---------------- */
  const handleMotion = (motionItem) => {
    if (usedMotions.includes(motionItem.id)) return;
    setCurrentResponse({ motion: motionItem, show: true });
    setUsedMotions((prev) => [...prev, motionItem.id]);
    if (usedMotions.length + 1 >= 2) setTimeout(() => setShowCompletion(true), 2500);
  };

  const dismissResponse = () =>
    setCurrentResponse((prev) => (prev ? { ...prev, show: false } : null));

  /* ---------------- COMPLETE SIMULATION ---------------- */
  const onComplete = () => {
    router.push("/final"); // Navigate to final page
  };

  return (
<>

<Navbar/>
<div className="relative min-h-screen bg-[#0b0c17] text-white py-8 px-4 z-10">


      {/* ---------------- PROGRESS ---------------- */}
      <div className="max-w-6xl mt-28 mx-auto mb-10">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span className="text-[#ffff]">
            {step === 1 && "Committee"}
            {step === 2 && "Country"}
            {step === 4 && "Session"}
            {step === 5 && "Debate"}
          </span>
        </div>
        <div className="h-1 bg-gray-700 rounded-full">
          <div
            className="h-1 bg-[#2563EB] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ---------------- STEP 1 : COMMITTEE ---------------- */}
      {step === 1 && (
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold mb-10">
            Select Your <span className="text-[#2563EB]">Committee</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {committees.map((c) => (
              <motion.button
                key={c.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedCommittee(c);
                  setStep(2);
                }}
                className="p-6 bg-[#1b1c2a] border border-gray-700 rounded-xl text-left hover:border-blue-500"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <c.icon className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-xl font-semibold">{c.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{c.fullName}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ---------------- STEP 2 : COUNTRY ---------------- */}
      {step === 2 && (
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-6">
            Choose Your <span className="text-[#2563EB]">Nation</span>
          </h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country..."
            className="w-full mb-6 px-5 py-4 rounded-xl bg-[#1b1c2a] border border-gray-700 focus:border-blue-500 outline-none"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {visibleCountries.map((country) => (
              <motion.button
                key={country.code}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedCountry(country);
                  setStep(4);
                }}
                className="p-6 bg-[#1b1c2a] border border-gray-700 rounded-xl text-left hover:border-blue-500"
              >
                <div className="text-xl font-bold">{country.code}</div>
                <p className="text-gray-300">{country.name}</p>
              </motion.button>
            ))}
          </div>
          {!search && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllCountries(!showAllCountries)}
                className="border border-blue-500 text-[#ffffff] px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white"
              >
                {showAllCountries ? "Show Less" : "See More Countries"}
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* ---------------- STEP 4 : SESSION ---------------- */}
      {step === 4 && selectedCountry && selectedCommittee && (
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-6 text-[#2563EB]">{selectedCommittee.name} Session</div>
          <p className="text-gray-400 mb-10">
            Representing <span className="text-white font-semibold">{selectedCountry.name}</span>
          </p>
          <div className="bg-[#121425] border border-gray-800 rounded-2xl p-8 text-left">
            <h3 className="text-2xl mb-4">
              Honourable delegates, welcome to the <span className="text-[#2563EB]">{selectedCommittee.name}</span>.
            </h3>
            <p className="text-gray-400 mb-4 italic">{selectedCommittee.agenda}</p>
            <p className="text-gray-400">
              I expect all delegates to uphold the highest standards of diplomatic conduct.
            </p>
            <div className="mt-6 text-sm text-gray-500">— The Chair, {selectedCommittee.name}</div>
          </div>
          <button
            onClick={() => setStep(5)}
            className="mt-10 bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400"
          >
            Enter the Session →
          </button>
        </motion.div>
      )}

      {/* ---------------- STEP 5 : DEBATE ---------------- */}
      {step === 5 && selectedCountry && selectedCommittee && (
        <motion.div
          className="max-w-6xl mx-auto py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-500 text-[#ffff] text-sm">Live Session</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Participate in <span className="text-[#2563EB]">Debate</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              As the delegate of <span className="text-white font-semibold">{selectedCountry.name}</span>, raise motions to participate in the <span className="text-white font-semibold">{selectedCommittee.name}</span> proceedings.
            </p>
          </div>

          {/* Session Status */}
          <div className="mb-10 p-5 rounded-xl bg-[#121425] border border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm">Session Active</span>
            </div>
            <span className="text-sm text-gray-400">{usedMotions.length} / 2 motions raised</span>
          </div>

          {/* Motions Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {motionItems.map((motionItem) => {
              const isUsed = usedMotions.includes(motionItem.id);
              const Icon = motionItem.icon;
              return (
                <motion.button
                  key={motionItem.id}
                  whileHover={!isUsed ? { scale: 1.03 } : {}}
                  className={`relative p-6 rounded-xl transition-all duration-300 text-left ${isUsed ? "bg-[#1a1c2b] border border-gray-700 cursor-not-allowed opacity-60" : "bg-[#121425] border border-gray-800 hover:border-blue-500/50 hover:shadow-md"}`}
                  onClick={() => handleMotion(motionItem)}
                  disabled={isUsed}
                >
                  <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${isUsed ? "bg-emerald-500/10" : "bg-white"}`}>
                    {isUsed ? <Check className="text-emerald-400 w-6 h-6" /> : <Icon className="text-[#2563EB] w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{motionItem.name}</h3>
                  <p className="text-gray-400 text-sm">{motionItem.description}</p>
                  {isUsed && <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">Raised</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Chair Response */}
          <AnimatePresence>
            {currentResponse?.show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={dismissResponse}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#121425] rounded-2xl p-8 max-w-lg w-full border border-blue-500 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center"><Gavel className="w-7 h-7 text-[#2563EB]" /></div>
                    <div><p className="text-lg font-bold text-white">{currentResponse.motion.name}</p></div>
                  </div>
                  <p className="text-gray-300 mb-8">{currentResponse.motion.response}</p>
                  <button onClick={dismissResponse} className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition">Continue</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Completion */}
          <AnimatePresence>
            {showCompletion && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <p className="text-gray-400 mb-6">Excellent work! You{"'"}ve participated in the debate successfully.</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={onComplete} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition">
                  Complete Simulation <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
      <Footer/>
      <Whatsapp/>
    </>

  );
}
