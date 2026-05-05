'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import istan from '@/app/public/img/istun.jpg';
import istan2 from '@/app/public/img/london.jpg';
import istan4 from '@/app/public/img/riyadhcity.jpg';
import bg from '@/app/public/img/bg.png';
import Footer from '../(component)/footer/Footer';
import ScrollToTop from '../(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import ParticleCanvas from '../(component)/ParticleCanvas';
import ContextPage from '../Context/ContextPage';
import Navbar from '../(component)/navbar/Navbar';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

export default function PaymentPage() {
  const { istanbuldates } = useContext(ContextPage);
  const { saudidates } = useContext(ContextPage);
  const { londondates } = useContext(ContextPage);

  const locations = [
    {
      name: 'Istanbul, Türkiye',
      image: istan,
      date: `${istanbuldates.startdate} – ${istanbuldates.enddate} ${istanbuldates.month} ${istanbuldates.year}`,
      link: '/Istanbulfee',
      tagline: 'Where East Meets West',
    },
    {
      name: 'Riyadh, Saudi Arabia',
      image: istan4,
      date: `${saudidates.startdate} – ${saudidates.enddate} ${saudidates.month} ${saudidates.year}`,
      link: '/Saudifee',
      tagline: 'Vision of the Future',
    },
    {
      name: 'London, UK',
      image: istan2,
      date: `${londondates.startdate} – ${londondates.enddate} ${londondates.month} ${londondates.year}`,
      link: '/UKfee',
      tagline: 'The Heart of Diplomacy',
    },
  ];

  return (
    <>
      <Navbar />

      {/* ─── Hero Section ─── */}
      <header
        className="relative bg-cover bg-center bg-no-repeat min-h-[50vh] md:min-h-[55vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-[#060713] bg-opacity-80" />

        <div className="relative z-10 text-center px-4 pt-28 pb-16 md:pt-32 md:pb-20">
          <p
            className="uppercase tracking-[0.25em] text-sm md:text-base font-semibold mb-4"
            style={{ color: '#f5c518' }}
          >
            Select Your Destination
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
            style={{ color: '#ffffff' }}
          >
            Conference <span style={{ color: '#60A5FA' }}>Pricing</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose your ATSASMUN destination and explore our pricing packages for an unforgettable Model United Nations experience.
          </p>
          <div
            className="w-20 h-1 mx-auto mt-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, #2563eb, #f5c518)' }}
          />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <ParticleCanvas />
        </div>
      </header>

      {/* ─── Destination Cards ─── */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(180deg, #dce6f0 0%, #e8eef4 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Image */}
                <div className="relative w-full h-64 sm:h-72 md:h-64 lg:h-80 overflow-hidden">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
                  />
                  {/* Gradient overlay on image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent 40%, rgba(26, 58, 107, 0.85) 100%)',
                    }}
                  />
                  {/* Location name on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-white font-extrabold text-2xl md:text-2xl lg:text-3xl drop-shadow-lg">
                      {location.name}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base font-medium mt-1">
                      {location.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#f5c518' }}
                    />
                    <p
                      className="text-sm font-bold tracking-wide"
                      style={{ color: '#1a3a6b' }}
                    >
                      {location.date}
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    View detailed pricing packages including accommodation, meals, city tours, and conference materials.
                  </p>

                  {/* CTA Button */}
                  <Link href={location.link} className="block">
                    <button
                      className="w-full py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        color: '#ffffff',
                      }}
                    >
                      View Pricing
                      <MdOutlineArrowRightAlt className="text-xl" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
      <Whatsapp />
    </>
  );
}