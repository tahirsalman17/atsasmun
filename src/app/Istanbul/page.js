"use client";
import React, { useContext } from "react";
import Dubaih from "@/app/(component)/dubai-header/Dubaih";
import istanbul from "@/app/public/img/turkey.jpeg";
import AboutDubai from "@/app/(component)/about-dubai/AboutDubai";
import Map from "@/app/(component)/dubai-map/Map";
import Desert from "@/app/(component)/dubai-desert/Desert";
import Event from "@/app/(component)/dubai-event/Event";
import Shedule from "@/app/(component)/dubai-shedule/Shedule";
import Footer from "@/app/(component)/footer/Footer";
import ScrollToTop from "@/app/(component)/Scrolltotop/ScrollToTop";
import Whatsapp from "@/app/(component)/whatsapp/Whatsapp";
import hotelx1 from "@/app/public/img/hotelistanbulx5.jpg";
import hotelx2 from "@/app/public/img/hotelistanbulx2.jpg";
import hotelx3 from "@/app/public/img/hotelistanbulx3.jpg";
import hotelx4 from "@/app/public/img/hotelistanbulx4.jpg";
import hotelx5 from "@/app/public/img/hotelistanbulx1.jpg";
import event1 from "@/app/public/img/istanbul-event-1.jpg";
import event2 from "@/app/public/img/istanbul-event-2.jpg";
import event3 from "@/app/public/img/istanbul-event-3.jpg";
import event4 from "@/app/public/img/istanbul-event-4.jpg";
import event5 from "@/app/public/img/istanbul-event-5.jpg";
import event6 from "@/app/public/img/istanbul-event-dinner.jpg";
import img12 from "@/app/public/img/turkeytour_hagiasofia.jpg";
import img13 from "@/app/public/img/turkeytour_grandbazaar.jpg";
import img14 from "@/app/public/img/turkeytour_hagia_sofia_new.jpg";
import ContextPage from "../Context/ContextPage";
import { Plus_Jakarta_Sans } from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function Page() {
  // ✅ Get data from Context instead of local state
  // noman/////////
  const { istanbuldates, setIstanbuldates } = useContext(ContextPage);
  return (
    <>
      <Dubaih
        bgImage={istanbul}
        tital="Istanbul, Turkey"
        Pricelink="/Istanbulfee"
        StartDays={istanbuldates.startdate}
        EndDays={istanbuldates.enddate}
        monthsDetils={`${istanbuldates.month} ${istanbuldates.year} Euro Park Otel`}
        style="text-blue-400"
        stlyle2="hover:text-blue-400"
      />
      <AboutDubai
        font={plusJakartaSans.className}
        aboutTitle="Istanbul"
        about="Atsas International Model United Nations (Atsas MUN), the most prominent venue in Istanbul for the development of leadership skills, global discourse, and young diplomacy. Passionate students from all over the world come together for Atsas MUN to participate in thought-provoking discussions, work together to find answers to global problems, and hone their public speaking, negotiation, and critical thinking abilities."
      />
      <Desert
        heading="Istanbul City Tour"
        Desert={img12}
        Desert2={img13}
        Desert3={img14}
      />
      <Map
        bgimg5={hotelx1}
        img1={hotelx4}
        img2={hotelx3}
        img3={hotelx2}
        img4={hotelx5}
        map="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3010.45966980608!2d28.6428701!3d41.0151983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f0944472211%3A0x5df99e24d97fb85e!2sEuro%20Park%20Otel!5e0!3m2!1sen!2s!4v1777698969084!5m2!1sen!2s"
        hname="Euro Park Otel"
        disc="Euro Park Otel is a great option for your stay, whether you're visiting for a conference, as an international delegate, or simply enjoying Istanbul’s beauty. The hotel offers quality service and a comfortable environment for all guests."
      />
      <Event
        img1={event1}
        img2={event2}
        img3={event3}
        img4={event4}
        img5={event6}
        img6={event5}
        font={plusJakartaSans.className}
      />
      <Shedule timeing="Istanbul, Turkey" />
      <ScrollToTop />
      <Whatsapp />
      <Footer />
    </>
  );
}
