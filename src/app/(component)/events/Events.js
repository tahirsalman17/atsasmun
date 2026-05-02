"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import ContextPage from "@/app/Context/ContextPage";
import Link from "next/link";

// Import Images
import bell1 from "@/app/public/img/ax11.jpeg";
import bell2 from "@/app/public/img/az1.jpeg";
import bell3 from "@/app/public/img/ax13.jpeg";
import bell4 from "@/app/public/img/ax18.jpeg";
import bell5 from "@/app/public/img/ax15.jpeg";
import bell6 from "@/app/public/img/az6.jpeg";

import istanbul from '@/app/public/img/turkey.jpeg';
import dubai from "@/app/public/img/skyline.jpeg";
import Azerbaijan from '@/app/public/img/Azerbaijan.jpeg';
import USA from '@/app/public/img/bgUSA.jpg';
import Saudi from '@/app/public/img/riyadhcity.jpg';
import london from '@/app/public/img/london.jpg';
// import ContextPage from "@/app/Context/ContextPage";
// import Link from "next/link";

// Card Data

export default function Card() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { check, setCheck } = useContext(ContextPage);
  const { dubaidates, setDubaidates } = useContext(ContextPage);
  const { istanbuldates, setIstanbuldates } = useContext(ContextPage);
  const { saudidates, setSaudidates } = useContext(ContextPage);
  const { newyorkdates, setNewyorkdates } = useContext(ContextPage);
  const { londondates, setLondondates } = useContext(ContextPage);
  const { bakudates, setBakudates } = useContext(ContextPage);
  const cards = [

    {
      id: 1,
      nowOpen: "Registrations are now open!",
      title: "ATSASMUN Istanbul, Turkey",
      subtitle: "Istanbul, Turkey",
      description: istanbuldates.startdate + " – " + istanbuldates.enddate + " " + istanbuldates.month + " " + istanbuldates.year
      , details:
        "Aspiring diplomatic leaders are invited to attend ATSASMUN in Istanbul, located at the crossroads of civilizations. The city's rich cultural past offers global discourse inspiration unmatched by any other.", image: bell1,
      icon: istanbul,
    },
    {
      id: 5,
      nowOpen: "Registrations opening soon!",
      title: "ATSASMUN London, UK",
      subtitle: "London, UK",
      description:
        londondates.startdate + " – " + londondates.enddate + " " + londondates.month + " " + londondates.year,
      details: "An iconic stage for the leaders of the future is provided by the ATSASMUN in London. This stage is founded in the legacy of global governance and ideas that have the potential to change the world.", image: bell6,
      icon: london,
    },
    {
      id: 3,
      nowOpen: "Registrations opening soon!",
      title: "ATSASMUN Riyadh, Saudi Arabia ",
      subtitle: "Riyadh, Saudi Arabia",
      description:
        saudidates.startdate + " – " + saudidates.enddate + " " + saudidates.month + " " + saudidates.year,
      details:
        "ATSASMUN in Saudi Arabia embraces a culture of honor, respect, and unity. Through the spirit of majlis, it fosters dialogue, mutual understanding, and true diplomacy in a changing world.",
      image: bell5,
      icon: Saudi,

    },

    // {
    //   id: 2,
    //   nowOpen: "Registrations are now open!",
    //   title: "ATSASMUN Dubai, UAE",
    //   subtitle: "Dubai, UAE",
    //   description:
    //     dubaidates.startdate+" – "+dubaidates.enddate+" "+dubaidates.month+" "+dubaidates.year ,
    //   details:
    //     "Young leaders can take advantage of a futuristic platform provided by ATSASMUN in Dubai, which combines the city's cosmopolitan allure and forward-thinking perspective with the spirit of innovation.",
    //   image: bell2,
    //   icon: dubai,
    // },
    // {
    //   id: 4,
    //   nowOpen: "Registrations opening soon!",
    //   title: "ATSASMUN Baku, Azerbaijan ",
    //   subtitle: "Baku, Azerbaijan",
    //   description:
    //     bakudates.startdate+" – "+bakudates.enddate+" "+bakudates.month+" "+bakudates.year ,
    //   details:
    //   "A multicultural hub is present in Baku, Azerbaijan where the participants of the ATSASMUN are immersed. This center embodies the harmony and variety that is important for future diplomacy.",
    //   image: bell3,
    //   icon: Azerbaijan,
    // },
    // {
    //   id: 6,
    //   nowOpen: "Registrations opening soon!",
    //   title: "ATSASMUN New York, USA",
    //   subtitle: "New York, USA",
    //   description:
    //     newyorkdates.startdate+" – "+newyorkdates.enddate+" "+newyorkdates.month+" "+newyorkdates.year ,
    //   details:
    //     "In the City of Light, which is a shining example of culture, art, and revolutionary ideas, the ATSASMUN in New York connects delegates with the spirit of diplomacy.",
    //   image: bell4,
    //   icon: USA,
    // },


  ];


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleCards = showMore ? cards : cards.slice(0, isMobile ? 3 : 4);

  return (
    <section id="events">
      {/* Cards */}
      <div className="flex flex-col items-center py-12 md:py-16"
        style={{ background: "linear-gradient(180deg, #dce6f0 0%, #e8eef4 100%)" }}
      >
        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-10 md:mb-14 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide"
            style={{ color: "#1a3a6b" }}
          >
            Series of Events
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-2">Our key events</p>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #2563eb, #f59e0b)" }}
          />
        </div>

        {/* Event Cards */}
        <div className="flex flex-col gap-8 md:gap-10 w-full max-w-6xl px-4 md:px-6">
          {visibleCards.map((card, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={card.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`
                  relative overflow-hidden rounded-2xl shadow-xl
                  w-full min-h-[420px] md:min-h-[460px] lg:min-h-[480px]
                  flex ${isReversed ? "flex-row-reverse" : "flex-row"}
                  group transition-all duration-500
                `}
                style={{
                  background: "#1e4380",
                }}
              >
                {/* Background Image — positioned on the "image side" */}
                <div className={`
                  absolute inset-0 z-0
                `}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={index === 0}
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 z-[1] transition-opacity duration-500"
                  style={{
                    background: isReversed
                      ? "linear-gradient(to left, rgba(20, 50, 100, 0.95) 0%, rgba(25, 60, 120, 0.88) 35%, rgba(30, 70, 140, 0.6) 60%, transparent 100%)"
                      : "linear-gradient(to right, rgba(20, 50, 100, 0.95) 0%, rgba(25, 60, 120, 0.88) 35%, rgba(30, 70, 140, 0.6) 60%, transparent 100%)",
                  }}
                />

                {/* Mobile gradient — full bottom overlay for readability */}
                <div
                  className="absolute inset-0 z-[1] md:hidden"
                  style={{
                    background: "linear-gradient(to top, rgba(20, 50, 100, 0.95) 0%, rgba(25, 60, 120, 0.8) 50%, rgba(30, 70, 140, 0.5) 80%, transparent 100%)",
                  }}
                />

                {/* Content */}
                <div className={`
                  relative z-10 flex flex-col justify-end md:justify-center
                  w-full md:w-[60%] p-6 md:p-10 lg:p-14
                  ${isReversed ? "md:ml-auto" : ""}
                `}>
                  {/* Event subtitle (e.g. "ATSASMUN Istanbul, Turkey") */}
                  <p className="text-white/80 font-bold text-xs md:text-sm uppercase tracking-widest mb-1 md:mb-2">
                    {card.title}
                  </p>

                  {/* Location — large bold */}
                  <h3 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-tight mb-1">
                    {card.subtitle}
                  </h3>

                  {/* Dates — large bold */}
                  <p className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-tight mb-3 md:mb-4">
                    {card.description}
                  </p>

                  {/* Description */}
                  <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mb-5 md:mb-6">
                    {card.details}
                  </p>

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <Link href="/RegisterNow" onClick={() => setCheck(card.subtitle)}>
                      <span
                        className="
                          inline-block px-8 py-3 rounded-full font-bold text-sm md:text-base uppercase tracking-wider
                          transition-all duration-300 cursor-pointer
                          hover:scale-105 hover:shadow-lg active:scale-95
                        "
                        style={{
                          background: "#f5c518",
                          color: "#1a1a1a",
                        }}
                      >
                        Register Now
                      </span>
                    </Link>

                    {/* Registration status badge */}
                    <span className="text-yellow-300 text-xs md:text-sm font-semibold self-center">
                      {card.nowOpen}
                    </span>
                  </div>
                </div>

                {/* Right-side icon overlay (country flag/icon) */}
                <div className={`
                  hidden md:flex absolute z-10 bottom-6
                  ${isReversed ? "left-8" : "right-8"}
                  items-center gap-3
                `}>
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-white/40 shadow-lg">
                    <Image
                      src={card.icon}
                      alt={card.subtitle}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        {/* <button
          onClick={() => setShowMore(!showMore)}
          className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button> */}
      </div>
    </section>
  );
}
