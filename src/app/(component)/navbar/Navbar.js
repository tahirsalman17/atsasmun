"use client";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import { useDestination } from "@/app/context/DestinationContext";
import { usePathname } from "next/navigation";
import logo from "@/app/public/img/logo-1.png";

function Navbar() {
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileDropdownOpen2, setMobileDropdownOpen2] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const dropdownTimeout1 = useRef(null);
  const dropdownTimeout2 = useRef(null);
  const prevScrollY = useRef(0);

  // ---------------- Desktop Hover Handlers ----------------
  const handleMouseEnter1 = () => {
    clearTimeout(dropdownTimeout1.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave1 = () => {
    dropdownTimeout1.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnter2 = () => {
    clearTimeout(dropdownTimeout2.current);
    setDropdownOpen2(true);
  };

  const handleMouseLeave2 = () => {
    dropdownTimeout2.current = setTimeout(() => {
      setDropdownOpen2(false);
    }, 400);
  };

  // ---------------- Background on scroll ----------------
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------- FIXED Hide / Show Logic ----------------
  useEffect(() => {
    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // page top → always show
      if (currentScrollY === 0) {
        setShowNav(true);
        prevScrollY.current = 0;
        return;
      }

      // scroll down → hide
      if (currentScrollY > prevScrollY.current) {
        setShowNav(false);
      }
      // scroll up → show
      else {
        setShowNav(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () =>
      window.removeEventListener("scroll", handleScrollDirection);
  }, []);

  // ---------------- Lock body scroll on mobile ----------------
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // ---------------- Active link styles ----------------
  const linkClass = (href) =>
    `relative text-white hover:text-[#60A5FA] transition
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#60A5FA] after:transition-all
     ${
       pathname === href
         ? "text-[#60A5FA] after:w-full"
         : "after:w-0 hover:after:w-full"
     }`;

  const dropdownLinkClass = (href) =>
    `block px-4 py-2 hover:text-[#60A5FA] transition ${
      pathname === href ? "text-[#60A5FA]" : ""
    }`;

  const mobileDropdownLinkClass = (href) =>
    `block py-2 px-4 rounded transition-colors
     ${
       pathname === href
         ? "bg-[#1a2a9c] text-white"
         : "text-gray-200 hover:bg-[#e3f2fd] hover:text-[#0d1b4c]"
     }`;

  const destinations = [
    "/Destinations",
    "/Istanbul-Turkey",
    "/dubai",
    "/Kuala-Lumpur",
    "/London",
    "/Riyadh",
  ];

  const isDestinationActive = destinations.some((d) =>
    pathname?.startsWith(d)
  );




  



  const information = [];
  const isInfoActive = information.some((d) => pathname?.startsWith(d));
  const destination = [];
  const isDestinationPage = destination.some((d) => pathname?.startsWith(d));

  const RegisterNow = ["/RegisterNow"];
  const isRegisterActive = RegisterNow.some((d) => pathname?.startsWith(d));

  const router = useRouter();
  // const { selectDestination, clearDestination } = useDestination();

  const PATH_TO_DEST = {
    "/Istanbul": "Istanbul, Turkey",
    "/dubai": "Dubai, UAE",
    // "/Kuala-Lumpur-": "Kuala Lumpur, Malaysia",
    "/UK": "LoMalaysiandon, UK",
    "/Saudi": "Riyadh, Saudi Arabia",
  };

  // const handleRegisterNow = (e) => {
  //   const dest = PATH_TO_DEST[pathname];
  //   if (dest) {
  //     e.preventDefault && e.preventDefault();
  //     selectDestination(dest, true);
  //     router.push("/Register-Now");
  //     return;
  //   }
  //   clearDestination();
  //   router.push("/Register-Now");
  // };

  const parentClass = (active) =>
    `relative flex items-center space-x-1 cursor-pointer transition
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#60A5FA] after:transition-all
     ${
       active
         ? "text-[#60A5FA] after:w-full"
         : "text-white after:w-0 hover:after:w-full hover:text-[#60A5FA]"
     }`;
  return (
    <nav
    className={`fixed top-0 w-full z-[999] transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#071429f8] text-white shadow-md"
          : "bg-transparent text-white"
      }`}
>
  <div className="container mx-auto flex items-center justify-between px-2 py-4 lg:py-2">
    {/* Logo */}
    <Link href="/">
<Image 
  src={logo} 
  alt="Logo" 
  className="h-16 sm:h-20 md:h-24 w-auto max-w-[150px] object-contain"
/>
    </Link>

    {/* Desktop Links */}
    <div className="hidden lg:flex space-x-8 items-center">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>

      {/* Destinations Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter2}
        onMouseLeave={handleMouseLeave2}
      >
               <button className={parentClass(isDestinationPage)}>

          <span>Destinations</span>
          {dropdownOpen2 ? (
            <AiOutlineUp className="text-sm" />
          ) : (
            <AiOutlineDown className="text-sm" />
          )}
        </button>

        {dropdownOpen2 && (
          <div className="absolute top-full mt-2 w-52 bg-white text-black rounded shadow-lg">
            <Link
              href="/Istanbul"
              className={dropdownLinkClass("/Istanbul")}
            >
              Istanbul, Turkey
            </Link>
            {/* <Link
              href="/dubai"
              className={dropdownLinkClass("/dubai")}
            >
              Dubai, UAE
            </Link> */}
            {/* <Link
              href="/Kuala-Lumpur-Malaysia"
              className={dropdownLinkClass("/Kuala-Lumpur-Malaysia")}
            >
              Kuala Lumpur, Malaysia
            </Link> */}
            <Link href="/UK" className={dropdownLinkClass("/UK")}>
              London, UK
            </Link>
            <Link href="/Saudi" className={dropdownLinkClass("/Saudi")}>
              Riyadh, Saudi Arabia
            </Link>
          </div>
        )}
      </div>
<Link href="/#events" className={linkClass("/events")}> Events  </Link>
<Link href="/#atsasMun" className={linkClass("/events")}> Atsas MUN  </Link>
      
      {/* Information Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter1}
        onMouseLeave={handleMouseLeave1}
      >
        <button className={parentClass(isInfoActive)}>
          <span>Information</span>
          {dropdownOpen ? (
            <AiOutlineUp className="text-sm" />
          ) : (
            <AiOutlineDown className="text-sm" />
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-2 w-44 bg-white text-black rounded shadow-lg">
            <Link
              href="/payment"
              className={dropdownLinkClass("/payment")}
            >
              Pricing
            </Link>

             <Link
              href="/#faq"
              className={dropdownLinkClass("/FAQs")}
            >
              FAQs
            </Link>

            <Link
              href="/Terms&conditions"
              className={dropdownLinkClass("/Terms&conditions")}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/Privac"
              className={dropdownLinkClass("/Privac")}
            >
              Privacy Policy
            </Link>
          </div>
        )}
      </div>

     <Link href="/Blogs/1" className={linkClass("/Blogs/1")}>
        Blog
      </Link>

      <Link href="/#contact" className={linkClass("/contact")}>
        Contact Us
      </Link>
    </div>

    {/* Desktop Register Button */}
    <div className="hidden lg:block">
      <Link href="/RegisterNow">
      <button
        // onClick={handleRegisterNow}
        className={`cursor-pointer font-semibold py-1 px-4 rounded-full border-2 border-blue-600 transition ${
          isRegisterActive
            ? "bg-transparent text-white"
            : "bg-blue-600 text-white hover:bg-transparent hover:text-white"
        }`}
      >
        Register Now
      </button>
      </Link>
    </div>

    {/* Mobile Top Bar */}
    <div className="relative flex items-center justify-between lg:hidden w-full">
      <div className="absolute left-1/3 transform -translate-x-1/3">
      <Link href="/RegisterNow">
        <button
          // onClick={handleRegisterNow}
          className={`font-semibold py-2 px-3 rounded-full border-2 border-blue-600 transition text-[12px] sm:text-sm ${
            isRegisterActive
              ? "bg-transparent text-white"
              : "bg-blue-600 text-white hover:bg-transparent hover:text-white"
          }`}
        >
          Register Now
        </button>
        </Link>
      </div>

      <button
        className="text-white ml-auto"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {!mobileMenuOpen && <AiOutlineMenu className="w-6 h-6" />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
{/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="lg:hidden fixed inset-0 z-50 flex justify-center items-start pt-6 px-4">
  {/* inset-0 = पूरी स्क्रीन, px-4 = साइड्स से margin */}
    <div className="w-full max-w-md bg-[#0c1629] text-white rounded-lg p-6 h-[calc(100vh-2.5rem)] overflow-y-auto shadow-xl">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setMobileMenuOpen(false)}>
          <AiOutlineClose className="w-6 h-6 text-white" />
        </button>
      </div>

      <nav className="space-y-4">
        <Link href="/" className="block py-2 px-4 rounded hover:bg-[#1e2a4d] transition-colors">Home</Link>

        {/* Destinations */}
        <button
          className="flex justify-between w-full items-center py-2 px-4 rounded hover:bg-[#1e2a4d]"
          onClick={() => setMobileDropdownOpen2(!mobileDropdownOpen2)}
        >
          <span>Destinations</span>
          {mobileDropdownOpen2 ? <AiOutlineUp /> : <AiOutlineDown />}
        </button>
        {mobileDropdownOpen2 && (
          <div className="ml-4 space-y-2">
            <Link href="/Istanbul" className={mobileDropdownLinkClass("/Istanbul")}>Istanbul, Turkey</Link>
            {/* <Link href="/dubai" className={mobileDropdownLinkClass("/dubai")}>Dubai, UAE</Link> */}
            {/* <Link href="/Kuala-Lumpur-Malaysia" className={mobileDropdownLinkClass("/Kuala-Lumpur-Malaysia")}>Kuala Lumpur, Malaysia</Link> */}
            <Link href="/UK" className={mobileDropdownLinkClass("/UK")}>London, UK</Link>
            <Link href="/Saudi" className={mobileDropdownLinkClass("/Saudi")}>Riyadh, Saudi Arabia</Link>
          </div>
        )}

        <Link   onClick={() => setMobileMenuOpen(false)}
 href="/#events" className="block py-2 px-4 rounded hover:bg-[#1e2a4d] transition-colors">Events</Link>
        <Link   onClick={() => setMobileMenuOpen(false)}
 href="/#atsasMun" className="block py-2 px-4 rounded hover:bg-[#1e2a4d] transition-colors">Atsas MUN</Link>

        {/* Information */}
        <button
          className="flex justify-between w-full items-center py-2 px-4 rounded hover:bg-[#1e2a4d]"
          onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
        >
          <span>Information</span>
          {mobileDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown />}
        </button>
        {mobileDropdownOpen && (
          <div className="ml-4 space-y-2">
            <Link href="/payment" className={mobileDropdownLinkClass("/payment")}>Pricing</Link>
            <Link   onClick={() => setMobileMenuOpen(false)}
 href="/#faq" className={mobileDropdownLinkClass("/FAQs")}>FAQs</Link>
            <Link href="/Terms&conditions" className={mobileDropdownLinkClass("/Terms&conditions")}>Terms & Conditions</Link>
            <Link href="/Privac" className={mobileDropdownLinkClass("/Privac")}>Privacy Policy</Link>
          </div>
        )}

        <Link href="/Blogs/1" className="block py-2 px-4 rounded hover:bg-[#1e2a4d] transition-colors">Blog</Link>

        <Link   onClick={() => setMobileMenuOpen(false)}
 href="/#contact" className="block py-2 px-4 rounded hover:bg-[#1e2a4d] transition-colors">Contact Us</Link>
      </nav>
    </div>
  </div>
)}

</nav>

  );
}

export default Navbar;
