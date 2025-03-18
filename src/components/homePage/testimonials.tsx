"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Developer",
    content:
      "The courses here have transformed my career. The instructors are knowledgeable and supportive, and the content is top-notch.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content:
      "I've taken multiple courses on this platform, and each one has exceeded my expectations. The practical approach to learning is invaluable.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    content:
      "The UI/UX design course helped me land my dream job. The curriculum is well-structured and the mentorship is exceptional.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
  {
    name: "David Wilson",
    role: "Full Stack Developer",
    content:
      "The hands-on projects and code reviews have been instrumental in building my confidence as a developer. Highly recommended!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
  {
    name: "Jessica Martinez",
    role: "Product Manager",
    content:
      "The product management certification gave me all the tools I needed to transition into a leadership role. Worth every penny.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
  {
    name: "Robert Taylor",
    role: "AI Engineer",
    content:
      "The machine learning curriculum is comprehensive and up-to-date. I appreciate how the instructors explain complex concepts in accessible ways.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
];

const extendedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

const TestimonialCarousel = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    beforeChange: (_: any, next: React.SetStateAction<number>) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    // Aligned container structure with previous components
    <section className="relative w-full  px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-6 sm:py-8 lg:py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Inner container with matching max-width constraints */}
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto relative z-10">
        {/* Section Header - Aligned with previous components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          {/* Add a subheading consistent with other sections */}
          <h3 className="text-blue-600 font-medium text-base sm:text-lg font-Urbanist mb-2">
            Student Testimonials
          </h3>

          {/* Main heading with consistent typography */}
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-5 font-CanelaDeck leading-tight">
            What Our Students Say
          </h2>

          {/* Subtext with consistent styling */}
          <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl text-gray-600 max-w-2xl mx-auto font-GTAmerican">
            Join thousands of successful students who have transformed their
            careers through our platform
          </p>
        </motion.div>

        {/* Carousel container with consistent padding */}
        <div
          className="relative px-4 sm:px-6 md:px-8 lg:px-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={handlePrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          <Slider ref={sliderRef} {...settings}>
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index} className="px-2 sm:px-3 py-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  {/* Card with consistent styling */}
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 transition-all duration-500 hover:-translate-y-2">
                    {/* CardContent with consistent padding */}
                    <CardContent className="p-4 sm:p-5 md:p-6 lg:p-7 relative">
                      <Quote className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 text-blue-200 opacity-50" />

                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-4 ring-blue-100"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg sm:text-xl font-semibold font-Urbanist text-gray-900">
                            {testimonial.name}
                          </h3>
                          <p className="text-blue-600 text-sm sm:text-base font-Urbanist font-medium">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 font-GTAmerican">
                        "{testimonial.content}"
                      </p>

                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        .slick-track {
          display: flex !important;
          align-items: stretch;
          gap: 0.5rem;
          margin-left: -0.5rem;
          padding: 1rem 0;
        }
        .slick-slide {
          height: inherit;
          > div {
            height: 100%;
          }
        }
        @media (min-width: 640px) {
          .slick-track {
            gap: 1rem;
            margin-left: -0.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;