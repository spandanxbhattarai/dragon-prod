"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, BookOpen, Star } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  students: number;
  lessons: number;
  hours: number;
  instructor: string;
  category: string;
  image: string;
}

export const PopularCourses: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleCourses, setVisibleCourses] = useState<number>(3); // Default value
  const [totalSlides, setTotalSlides] = useState<number>(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: "WordPress for Beginners – Master WordPress",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "PHP",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 2,
      title: "Financial Security Thinking and Principles Theory",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "WordPress",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 3,
      title: "Professional Ceramic Moulding for Beginners",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "JavaScript",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 4,
      title: "Advanced Web Development with React",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "React",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 5,
      title: "UI/UX Design Principles and Practices",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "Design",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 6,
      title: "WordPress for Beginners – Master WordPress",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "PHP",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 7,
      title: "Financial Security Thinking and Principles Theory",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "WordPress",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 8,
      title: "Professional Ceramic Moulding for Beginners",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "JavaScript",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    },
    {
      id: 9,
      title: "Advanced Web Development with React",
      price: "$50.00",
      rating: 5,
      reviews: 21,
      students: 25,
      lessons: 15,
      hours: 1.5,
      instructor: "Masum Billah",
      category: "React",
      image: "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg"
    }
  ];

  // Determine visible courses based on screen size
  const getVisibleCourses = (): number => {
    if (typeof window === 'undefined') return 3; // Default for server-side rendering
    if (window.innerWidth < 640) return 1; // sm
    if (window.innerWidth < 1024) return 2; // md/lg
    return 3; // xl and above
  };

  // Handle window resize and check for device size
  useEffect(() => {
    // This will only run on the client side
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setVisibleCourses(getVisibleCourses());
    };

    // Check on initial load
    checkDeviceSize();

    // Update total slides calculation whenever visible courses changes
    setTotalSlides(Math.ceil(courses.length / getVisibleCourses()));

    // Add event listener for resize
    window.addEventListener('resize', checkDeviceSize);

    // Clean up
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, [courses.length]);

  // Auto scroll functionality
  useEffect(() => {
    if (totalSlides === 0) return; // Guard against initial render with 0 slides

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!isHovering) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }
      }, 5000); // Change slide every 5 seconds
    };

    startAutoScroll();

    // Clean up on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovering, totalSlides]);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  // Get display courses with proper offset
  const displayCourses = (): Course[] => {
    const startIndex = currentIndex * visibleCourses;
    const endIndex = Math.min(startIndex + visibleCourses, courses.length);
    return courses.slice(startIndex, endIndex);
  };

  const renderStars = (rating: number): React.ReactNode => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  // For mobile swipe functionality
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent): void => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - go to next slide
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right - go to previous slide
      prevSlide();
    }
  };

  return (
    // Aligned with previous components' container structure
    <div className="relative w-full  px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-6 sm:py-8 lg:py-20 overflow-hidden bg-[#fbfdff]">
      {/* Inner container with matching max-width constraints */}
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto relative z-10">
        {/* Section Header - Aligned with previous components */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h3 className="text-blue-600 font-medium text-base sm:text-lg font-Urbanist mb-2">
            Our Courses List
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mt-2 font-CanelaDeck leading-tight">
            Most Popular Courses
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-4 sm:px-8 md:px-10 lg:px-12"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons - Styled consistently with other components */}
          <div className="hidden md:block absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Previous courses"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Courses Grid/Slider */}
          <div className="overflow-hidden">
            <div
              className="transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(0%)`
              }}
            >
              {/* Updated grid with consistent gap patterns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {displayCourses().map((course) => (
                  <div
                    key={course.id}
                    className="overflow-hidden transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-lg shadow-sm"
                  >
                    {/* Course Image */}
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 sm:h-48 md:h-56 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 sm:px-4 md:px-6 py-1 rounded-tr-3xl rounded-bl-3xl rounded-tl-sm rounded-br-sm font-medium shadow-md text-xs sm:text-sm">
                        {course.price}
                      </div>
                    </div>

                    {/* Course Content - Consistent padding patterns */}
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Rating */}
                      <div className="flex items-center mb-2 sm:mb-3">
                        <div className="flex">
                          {renderStars(course.rating)}
                        </div>
                        <span className="text-gray-700 ml-2 text-xs sm:text-sm font-medium">({course.reviews})</span>
                      </div>

                      {/* Title - Consistent typography */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 h-12 md:h-14 line-clamp-2 text-gray-800 hover:text-blue-600 transition-colors font-CanelaDeck">
                        {course.title}
                      </h3>

                      {/* Meta Information - Consistent spacing and responsive scaling */}
                      <div className="flex flex-wrap items-center text-gray-700 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm font-GTAmerican">
                        <div className="flex items-center mr-3 sm:mr-4 mb-2">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-600" />
                          <span className="font-medium">{course.students} Students</span>
                        </div>
                        <div className="flex items-center mr-3 sm:mr-4 mb-2">
                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-600" />
                          <span className="font-medium">{course.lessons} Lessons</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-600" />
                          <span className="font-medium">{course.hours} Hours</span>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center justify-between border-t pt-3 sm:pt-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden mr-2 bg-gray-200 flex items-center justify-center">
                            <img
                              src="https://cdn.pixabay.com/photo/2016/11/29/12/52/face-1869641_1280.jpg"
                              alt={course.instructor}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium text-gray-800 text-sm sm:text-base font-Urbanist">
                            {course.instructor}
                          </span>
                        </div>
                        <span className="text-blue-600 font-medium px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-GTAmerican">
                          {course.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Navigation Button - Styled consistently */}
          <div className="hidden md:block absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              aria-label="Next courses"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dots Navigation - Consistent spacing */}
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-blue-600 w-6 sm:w-8" : "bg-gray-300"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCourses;