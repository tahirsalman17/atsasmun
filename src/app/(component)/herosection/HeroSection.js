'use client';
import Image from 'next/image';
// import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background 
// import bg from '@/app/public/img/HPbg2.png'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
// import videoFile from "@/app/public/videos/header.mp4"; // Replace with your video path
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
import ParticleCanvas from '../ParticleCanvas';
import Navbar from '../navbar/Navbar';
import { IoPlayOutline } from 'react-icons/io5';



// getDestination name typing animation////////////////////////////
const cities = [
    'Istanbul, Turkey',
    'London, UK',
    'Riyadh, Saudi Arabia',
    // 'Baku, Azerbaijan',
    // 'Dubai, UAE',
    // 'New York, USA',
];
const HeroSection = () => {

    // auto text ////////////////////////////////////
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    const [currentText, setCurrentText] = useState('');
    useEffect(() => {
        const currentCity = cities[currentCityIndex];
        let timer;

        if (!isDeleting && charIndex < currentCity.length) {
            // Typing effect
            timer = setTimeout(() => {
                setCurrentText((prev) => prev + currentCity[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 70);
        } else if (isDeleting && charIndex > 0) {
            // Deleting effect
            timer = setTimeout(() => {
                setCurrentText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            }, 50);
        } else if (!isDeleting && charIndex === currentCity.length) {
            // Pause before deleting
            timer = setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && charIndex === 0) {
            // Switch to the next city
            setIsDeleting(false);
            setCurrentCityIndex((prev) => (prev + 1) % cities.length); // Move to the next city
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, currentCityIndex]);


    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: 'ease-in-out', // Easing for the animation
            once: true, // Whether animation should happen only once
        });
    }, []);


    return (
        <div>
            {/* navbar//////////////////////////////// */}

            <Navbar />

            {/* Hero Section */}

            <header
                className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundAttachment: "fixed",
                }}
            >

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#060713] bg-opacity-80"></div>

                {/* Hero Content */}
                <div className="relative z-10  mt-[120px] text-center px-6 sm:px-8">
                    <h1
                        data-aos="fade-right"
                        className="text-3xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-100"
                    >
                        THE WORLD OF DIPLOMACY WITH
                    </h1>
                    <h1
                        data-aos="fade-right"
                        className="text-3xl sm:text-4xl lg:text-6xl mt-2 font-bold leading-tight"
                    >
                        <span className="bg-gradient-to-r from-[#C38E87] to-[#465D88] bg-clip-text text-transparent ">
                            Atsas Model United Nations
                        </span>
                    </h1>

                    <h1
                        data-aos="fade-right"
                        className="text-2xl sm:text-2xl lg:text-3xl mt-2 font-bold leading-tight text-gray-100"
                    >
                        By Atsas International Network
                    </h1>

                    {/* Typing Effect */}
                    <div className="text-center py-6">
                        <h1 data-aos="fade-down" className="text-3xl lg:text-4xl font-bold bg-gradient-to-r  from-[#ca8980] to-[#315fb6] bg-clip-text text-transparent">
                            <span>{currentText}</span>
                            <span className="animate-blink">|</span>
                        </h1>
                    </div>

                    {/* Play Button */}


                    {/* Pricing Button */}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6">
                        <Link href="/Live-MUN">
                            <button className="rounded-[50px] bg-transparent hover:bg-gradient-to-r  from-[#315fb6] to-[#ca8980]  transition-all duration-300 border-[#ffffffce]  border-[1px]">

                                {/* Top Content */}
                                <div className="flex py-1 px-4 sm:px-6 justify-center items-center">
                                    <p className="font-bold text-sm sm:text-[16px] lg:text-xl text-[#ffffff]">
                                        Start Live MUN Experience
                                    </p>
                                    <MdOutlineArrowRightAlt className="text-lg sm:text-[30px] lg:text-[40px] mt-1 sm:mt-2 text-[#ffffff]" />
                                </div>

                                {/* Divider Line */}
                                <hr className="w-[70%] sm:w-[80%] mx-auto border-t border-gray-100" />

                                {/* Bottom Text */}
                                <p className="py-2 px-6 sm:px-9 text-[11px] sm:text-[13px] lg:text-base text-gray-200">
                                    Experience a Live MUN Before You Register    </p>

                            </button>
                        </Link>
                        <Link href="/payment">
                            <button className="rounded-[50px] bg-transparent hover:bg-gradient-to-r  from-[#ca8980] to-[#315fb6] transition-all duration-300 border-[#ffffffce]  border-[1px]">
                                <div className="flex py-1 px-4 sm:px-6 justify-center items-center">
                                    <p className="font-bold text-sm sm:text-[16px] lg:text-xl text-[#ffffff]">
                                        Pricing
                                    </p>
                                    <MdOutlineArrowRightAlt className="text-lg sm:text-[30px] lg:text-[40px] mt-1 sm:mt-2 text-[#ffffff]" />
                                </div>
                                <hr className="w-[70%] sm:w-[80%] mx-auto border-t border-gray-100" />
                                <p className="py-2 px-6 sm:px-9 text-[11px] sm:text-[13px] lg:text-base text-gray-200">
                                    Early Applicant Discounts (Limited Slots Left)
                                </p>
                            </button>
                        </Link>

                    </div>
                </div>
            </header>


            {/* <div className="hidden sm:block"> */}
            <ParticleCanvas />
            {/* </div> */}

        </div>
    )
}

export default HeroSection
