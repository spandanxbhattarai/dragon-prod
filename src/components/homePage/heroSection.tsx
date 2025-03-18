
import React, { useEffect, useState } from "react";
import { GraduationCap, BookOpen, Star, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import AdvertisementDialog from "./advertisement";

const HeroSection: React.FC = () => {
  const [isAdDialogOpen, setIsAdDialogOpen] = useState(false);

  // Sample advertisement data
  const advertisements = [
    {
      id: 1,
      title: "Spring Sale - 50% Off",
      description: "Limited time offer on our premium collection",
      imageUrl:
        "https://i.pinimg.com/736x/22/11/47/221147ea2778af9c1e6c82761e47d01c.jpg",
      linkUrl: "/promotions/spring-sale",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest products just for you",
      imageUrl:
        "https://i.pinimg.com/736x/e6/2b/1c/e62b1cafe89631019f57951346f9a9a8.jpg",
      linkUrl: "/new-arrivals",
    },
    {
      id: 3,
      title: "Exclusive Members Offer",
      description: "Special discounts for our loyal customers",
      imageUrl:
        "https://i.pinimg.com/736x/fa/8e/18/fa8e1854f8e5ece4594e1587b7a3d48e.jpg",
      linkUrl: "/members/offers",
    },
  ];

  useEffect(() => {
    setIsAdDialogOpen(true);
  }, []);

  return (
    <>
      <div className="relative min-h-screen w-full bg-[#002935] ">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated stars and icons */}
          <div className="absolute top-27 right-12 animate-pulse">
            <Star className="w-8 h-8 text-blue-400" />
          </div>

          {/* Custom SVG background for desktop view only - positioned at the bottom */}
          <div className="hidden lg:block absolute bottom-0 right-0 w-full h-auto opacity-60 z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 300"
              className="w-3xl h-auto"
            >
              {/* Dark blue/teal background - removed to make it transparent */}
              {/* <rect width="800" height="300" fill="#0a2733"/> */}

              {/* Left side curved lines with progressive sizing (small, medium, large) */}
              <path
                d="M 0 110 C 40 150, 45 170, 0 210"
                stroke="#4a6d78"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 80 C 70 170, 75 190, 0 260"
                stroke="#4a6d78"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 0 50 C 100 190, 110 210, 0 320"
                stroke="#4a6d78"
                strokeWidth="2"
                fill="none"
              />

              {/* Right side snake-like pattern with upward flow */}
              <path
                d="M 550 150 C 580 120, 600 180, 630 110 C 660 80, 680 140, 710 70 C 740 40, 760 100, 790 50"
                stroke="#4a6d78"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* Mobile-specific circle decoration in the right area */}
          <div className="block sm:hidden absolute top-20 right-4 opacity-20">
            <div className="w-24 h-24 border border-blue-400/60 rounded-full"></div>
            <div className="w-32 h-32 border border-blue-400/60 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-40 h-40 border border-blue-400/50 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Larger screen decorative elements - hidden on mobile */}
          <div className="hidden sm:block absolute top-1/2 left-1/4 md:left-1/3 opacity-30">
            <div className="relative">
              <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
              <Pencil className="w-6 h-6 md:w-8 md:h-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="hidden sm:block absolute top-1/6 left-20 w-16 h-16 border border-blue-400/10 rounded-full">
            <Pencil className="w-8 h-8 text-blue-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Main content */}
        <div className="container relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 py-26 flex justify-between">
          {/* Mobile layout (stacked) */}
          <div className="flex flex-col justify-between w-full sm:hidden">
            {/* Header - updated with font-Urbanist */}
            <div className="mb-5">
              <span className="text-white text-xl font-bold tracking-wider font-Urbanist">
                Online E-Learning Courses
              </span>
            </div>

            {/* Main heading - using font-CanelaDeck */}
            <div className="font-CanelaDeck  leading-normal mb-4">
              <div className=" tracking-wider leading-14 font-medium ">
                <span className="text-blue-500 text-6xl">Creating</span>
                <span className="text-white ml-2 text-6xl">a</span>
                <br />
                <span className="text-white text-6xl">Better </span>
                <br />
                <span className="text-white text-6xl"> Future</span>
                <br />
                <span className="text-white text-6xl">through</span>
                <br />
                <span className="text-white text-6xl">Education</span>
              </div>
            </div>
            {/* Description - using font-GTAmerican */}
            <p className="text-white font-GTAmerican text-lg opacity-90 mb-8">
              It is long established fact that reader distracted by the readable
              content.
            </p>
            <div className=" absolute top-1/3 left-60 w-16 h-16 border border-blue-400/10 rounded-full">
              <Pencil className="w-8 h-8 text-blue-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-row items-center gap-4 mb-8 font-Urbanist">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-medium">
                All Courses
              </Button>
              <Button
                variant="outline"
                className="border-white font-Urbanist border bg-transparent text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium"
              >
                Contact Us
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              <div className="flex">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
                  style={{ marginRight: "-0.75rem", zIndex: 3 }}
                >
                  <img
                    src="https://i.pinimg.com/474x/b2/db/0b/b2db0be191eaf907636fa3a784ca6c89.jpg"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
                  style={{ marginRight: "-0.75rem", zIndex: 2 }}
                >
                  <img
                    src="https://i.pinimg.com/474x/b2/db/0b/b2db0be191eaf907636fa3a784ca6c89.jpg"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
                  style={{ zIndex: 1 }}
                >
                  <img
                    src="https://i.pinimg.com/474x/b2/db/0b/b2db0be191eaf907636fa3a784ca6c89.jpg"
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-white text-lg font-Urbanist">
                24k + Happy Students
              </span>
            </div>
          </div>

          {/* Desktop/Tablet layout (side by side) - hidden on mobile */}
          <div className="hidden lg:px-10   xl:px-10 2xl:pl-0  sm:flex flex-col lg:flex-row items-center justify-between w-full gap-6 md:gap-8 lg:gap-12 xl:gap-16">
            {/* Left content */}
            <div className="w-full lg:w-1/2 md:px-0 mb-8 lg:mb-0">
              {/* Header - using font-Urbanist */}
              <div className="flex items-center mb-2">
                <span className="text-white text-lg md:text-2xl font-medium mr-2 font-Urbanist">
                  Online E-Learning Courses
                </span>
              </div>

              {/* Main heading - using font-CanelaDeck */}
              <h1 className="text-4xl md:text-5xl xl:text-[3.3rem] font-bold leading-normal mb-4 font-CanelaDeck tracking-normal">
                <span className="text-[#1A73E8]">Creating</span>{" "}
                <span className="text-white">a Better Future</span>
                <br />
                <span className="text-white">through Education</span>
              </h1>

              {/* Description - using font-GTAmerican */}
              <p className="text-white text-sm md:text-base mb-6 font-GTAmerican">
                It is long established fact that reader distracted
                <br className="hidden md:block" />
                by the readable content.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row items-center gap-5 mb-6">
                <Button className="bg-[#1A73E8] hover:bg-[#1A73E8]/90 text-white rounded-full px-8 lg:px-12 py-6 md:py-5 text-sm md:text-base font-medium">
                  All Courses
                </Button>
                <Button
                  variant="outline"
                  className="border-white bg-[#002935] text-white hover:bg-[#1A73E8] hover:border-[#1A73E8] rounded-full px-8 lg:px-12 py-6 md:py-5 text-sm md:text-base font-medium"
                >
                  Contact Us
                </Button>
              </div>

              {/* Social proof - using font-Urbanist for text */}
              <div className="flex items-center gap-4">
                <div className="flex mr-4">
                  <div
                    className="w-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
                    style={{ marginRight: "-0.5rem", zIndex: 3 }}
                  >
                    <img
                      src="https://i.pinimg.com/474x/0b/6c/b1/0b6cb1a71ca09f9eeff65bac7f4dda16.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="w-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
                    style={{ marginRight: "-0.5rem", zIndex: 2 }}
                  >
                    <img
                      src="https://i.pinimg.com/736x/cf/13/17/cf1317a828577134642e892695f77821.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="w-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      src="https://i.pinimg.com/474x/b2/db/0b/b2db0be191eaf907636fa3a784ca6c89.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-gray-300 text-sm md:text-base font-Urbanist">
                  24k + Happy Students
                </span>
              </div>
            </div>

            {/* Right content */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end -mb-[6.5rem] pb-0 mt-4 lg:pt-10">
              {/* Main image */}
              <div className="rounded-tr-[8rem]  md:rounded-tr-[10rem] overflow-hidden relative">
                <img
                  src="https://edumon-nextjs.vercel.app/assets/img/banner.png"
                  className="rounded-tr-[8rem] md:rounded-tr-[10rem] h-[22rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem] w-[18rem] md:w-[22rem] lg:w-[24rem] xl:w-[27rem] object-cover"
                  alt="Teacher with students"
                />
              </div>

              {/* Stats cards - using font-Urbanist for labels */}
              <div className="absolute bottom-40 left-10 lg:bottom-50 lg:left-15 bg-white rounded-md p-4 md:p-6 shadow-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-[#1A73E8] p-2 h-10 w-10 md:h-12 md:w-12 flex justify-center items-center rounded-full">
                    <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-black font-CanelaDeck">
                      28k
                    </h3>
                    <p className="text-sm text-black font-Urbanist">
                      Total Students
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 md:-bottom-15 -right-12 2xl:-right-25 bg-white rounded-md p-2 md:p-4 md:py-6 shadow-lg">
                <div className="flex items-center gap-5">
                  <div className="bg-[#1A73E8] p-2 h-10 w-10 md:h-12 md:w-12 flex justify-center items-center rounded-full">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-2xl font-bold text-gray-900 font-CanelaDeck">
                      529+
                    </h3>
                    <p className="text-sm text-gray-700 font-Urbanist">
                      Total Courses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvertisementDialog
        advertisements={advertisements}
        autoScrollInterval={5000}
        isOpen={isAdDialogOpen}
        setIsOpen={setIsAdDialogOpen}
      />
    </>
  );
};

export default HeroSection;

