'use client';
import React from 'react';
import Image from 'next/image';

const levels = [
  {
    age: "11-14 Years Old",
    description: "Specially designed for younger participants with lighter topics and supportive simulations. Requires at least intermediate English to join comfortably.",
    img: "https://modelunitednation.org/images/img-25.jpg",
  },
  {
    age: "15-25 Years Old",
    description: "Ideal for first-timers or those with some MUN experience who want to grow in a dynamic setting. Intermediate English needed to join with ease.",
    img: "https://modelunitednation.org/images/img-23.jpg",
  },
  {
    age: "15-25 Years Old",
    description: "For experienced MUNers ready for deeper discussions, complex topics, and a faster pace. Recommended for those who have joined at least 1 previous MUN conference. Good command of English needed for in-depth debates.",
    img: "https://modelunitednation.org/images/img-24.jpg",
  }
];

export default function LevelsOfParticipation() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="levels-of-participation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 
            className="text-3xl md:text-5xl font-extrabold uppercase tracking-wide mb-4"
            style={{ color: "#1a3a6b" }}
          >
            Levels of Participation
          </h2>
          <div 
            className="w-24 h-1.5 mx-auto rounded-full"
            style={{ background: "linear-gradient(90deg, #2563eb, #f5c518)" }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {levels.map((level, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="relative w-full h-56 sm:h-64 md:h-56 lg:h-64">
                <Image 
                  src={level.img} 
                  alt={level.age}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 
                  className="text-2xl font-bold mb-4 border-b-2 border-yellow-400 inline-block pb-2 max-w-max"
                  style={{ color: "#1a3a6b" }}
                >
                  {level.age}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {level.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
