import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Calendar, User, ArrowRight, Bell, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Define TypeScript interfaces for type safety
interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  imageUrl: string;
  priority: 'high' | 'medium' | 'low';
}

const ResponsiveAnnouncements: React.FC = () => {
  // Sample announcement data structure
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'New Academic Year Registration Open',
      description: 'Registration for the 2025-26 academic year is now open. Early bird discounts available for the first 100 students. Join our prestigious institution and embark on a journey of excellence in education.',
      date: 'March 15, 2025',
      category: 'Admissions',
      author: 'Academic Office',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop',
      priority: 'high'
    },
    {
      id: '2',
      title: 'International Science Fair 2025',
      description: 'Join us for the annual International Science Fair. Showcase your innovations and compete with students from around the globe. Amazing prizes and opportunities await.',
      date: 'March 20, 2025',
      category: 'Events',
      author: 'Science Department',
      imageUrl: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=2000&auto=format&fit=crop',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'New Computer Lab Inauguration',
      description: 'We are excited to announce the opening of our state-of-the-art computer lab equipped with the latest technology and software.',
      date: 'March 25, 2025',
      category: 'Infrastructure',
      author: 'IT Department',
      imageUrl: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=2000&auto=format&fit=crop',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Summer Internship Program',
      description: 'Applications are now open for our summer internship program. Get real-world experience with leading companies.',
      date: 'March 28, 2025',
      category: 'Career',
      author: 'Placement Cell',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Parent-Teacher Meeting',
      description: 'Schedule for the upcoming parent-teacher meeting has been released.',
      date: 'April 1, 2025',
      category: 'Academic',
      author: 'Administration',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop',
      priority: 'medium'
    },
    {
      id: '6',
      title: 'Campus Sustainability Initiative',
      description: 'Join our new campus-wide sustainability program and help make our institution eco-friendly.',
      date: 'April 5, 2025',
      category: 'Campus Life',
      author: 'Sustainability Office',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop',
      priority: 'high'
    },
    {
      id: '7',
      title: 'Digital Learning Resources',
      description: 'Explore our expanded digital learning resources available to all students through our online portal.',
      date: 'April 8, 2025',
      category: 'Academic',
      author: 'Library Services',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop',
      priority: 'high'
    }
  ];

  // State to track primary and secondary announcements
  const [primaryAnnouncement, setPrimaryAnnouncement] = useState<Announcement>(announcements[0]);
  const [secondaryAnnouncement, setSecondaryAnnouncement] = useState<Announcement>(announcements[1]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Required for animation
  useEffect(() => {
    // Add CSS for custom animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .animate-spin-slow {
        animation: spin-slow 4s linear infinite;
      }
      
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .scroll-progress {
        transition: all 0.3s ease;
      }
      
      .hover-scale {
        transition: transform 0.3s ease;
      }
      
      .hover-scale:hover {
        transform: scale(1.02);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Track scroll position to update progress indicator
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle clicking on a list item
  const handleAnnouncementClick = (announcement: Announcement): void => {
    // Don't do anything if the announcement is already featured
    if (
      announcement.id === primaryAnnouncement.id ||
      announcement.id === secondaryAnnouncement.id
    ) {
      return;
    }

    // Move current primary to secondary and set the clicked one as primary
    setSecondaryAnnouncement(primaryAnnouncement);
    setPrimaryAnnouncement(announcement);

    // Scroll to top on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Check if an announcement is already featured
  const isAnnouncementFeatured = (id: string): boolean => {
    return id === primaryAnnouncement.id || id === secondaryAnnouncement.id;
  };

  // Filter out announcements that are already featured
  const sidebarAnnouncements = announcements.filter(
    announcement => !isAnnouncementFeatured(announcement.id)
  );

  // Gets the text color for a category
  const getCategoryTextColor = (category: string): string => {
    switch (category) {
      case 'Admissions': return 'blue-600';
      case 'Events': return 'purple-600';
      case 'Infrastructure': return 'green-600';
      case 'Career': return 'amber-600';
      case 'Academic': return 'indigo-600';
      case 'Campus Life': return 'teal-600';
      default: return 'gray-600';
    }
  };

  // Gets the background color for a category
  const getCategoryBgColor = (category: string): string => {
    switch (category) {
      case 'Admissions': return 'bg-blue-50';
      case 'Events': return 'bg-purple-50';
      case 'Infrastructure': return 'bg-green-50';
      case 'Career': return 'bg-amber-50';
      case 'Academic': return 'bg-indigo-50';
      case 'Campus Life': return 'bg-teal-50';
      default: return 'bg-gray-50';
    }
  };

  // Gets the color for a priority indicator
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative w-full mt-10 bg-white px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-6 sm:py-8 lg:py-12 overflow-hidden">
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center">
            <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
            <p className="text-blue-600 font-medium text-base sm:text-lg font-Urbanist">Latest</p>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 ml-2 font-CanelaDeck">Announcements</h2>
          </div>
          {/* <Link href="/announcements" className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors font-Urbanist text-sm sm:text-base">
            View All
            <ArrowRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link> */}
        </div>

        {/* Mobile View (Less than lg breakpoint) */}
        <div className="lg:hidden space-y-6 sm:space-y-8">
          {/* Primary Featured Announcement */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start">
              <div className="w-full sm:w-[220px] h-[160px] sm:h-[180px] mb-4 sm:mb-0 sm:mr-6 overflow-hidden rounded-lg relative">
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 pb-1 rounded-full">
                  <span className={`text-xs font-medium font-Urbanist text-${getCategoryTextColor(primaryAnnouncement.category)}`}>
                    {primaryAnnouncement.category}
                  </span>
                </div>
                <img
                  src={primaryAnnouncement.imageUrl}
                  alt={primaryAnnouncement.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-xs font-Urbanist text-gray-500">{primaryAnnouncement.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-xs font-Urbanist text-gray-500">{primaryAnnouncement.author}</span>
                  </div>
                  <span className={`inline-block w-2 h-2 font-Urbanist rounded-full ${getPriorityColor(primaryAnnouncement.priority)}`}></span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 leading-tight font-Urbanist">
                  {primaryAnnouncement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed font-GTAmerican">
                  {primaryAnnouncement.description}
                </p>
                <Link href={`/announcement`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm font-Urbanist transition-colors">
                  Read more
                  <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Featured Announcement */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start">
              <div className="w-full sm:w-[220px] h-[160px] sm:h-[180px] mb-4 sm:mb-0 sm:mr-6 overflow-hidden rounded-lg relative">
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 pb-1 rounded-full">
                  <span className={`text-xs font-medium text-${getCategoryTextColor(secondaryAnnouncement.category)}`}>
                    {secondaryAnnouncement.category}
                  </span>
                </div>
                <img
                  src={secondaryAnnouncement.imageUrl}
                  alt={secondaryAnnouncement.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-xs font-Urbanist text-gray-500">{secondaryAnnouncement.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-xs font-Urbanist text-gray-500">{secondaryAnnouncement.author}</span>
                  </div>
                  <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(secondaryAnnouncement.priority)}`}></span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 leading-tight font-Urbanist">
                  {secondaryAnnouncement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed font-GTAmerican">
                  {secondaryAnnouncement.description}
                </p>
                <Link href={`/announcement`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm font-Urbanist transition-colors">
                  Read more
                  <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Secondary Announcements for Mobile */}
          <div className="pt-2 sm:pt-4 border-t border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-700 flex items-center font-Urbanist">
              <Bell className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              More Announcements
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {sidebarAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="block w-full text-left hover:bg-gray-50 rounded-md transition-all duration-300 p-2 sm:p-3 cursor-pointer"
                  onClick={() => handleAnnouncementClick(announcement)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-[80px] sm:w-[100px] h-[60px] sm:h-[70px] overflow-hidden rounded-md mr-3 sm:mr-4 relative">
                      <img
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1 sm:mb-2">
                        <span className={`text-xs font-Urbanist font-medium text-${getCategoryTextColor(announcement.category)}`}>
                          {announcement.category}
                        </span>
                        <span className="mx-1 sm:mx-2 text-gray-400">•</span>
                        <span className="text-xs font-Urbanist text-gray-500">{announcement.date}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 font-Urbanist">
                        {announcement.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View (lg and above breakpoint) */}
        <div className="hidden lg:grid lg:grid-cols-[65%_35%] gap-6 lg:gap-8 xl:gap-8">
          {/* Left Column - Two Featured Announcements */}
          <div className="flex flex-col">
            {/* Primary Featured Announcement */}
            <div className="mb-8">
              <div className="flex items-start">
                <div className="w-[220px] h-[180px] mr-6 overflow-hidden rounded-lg relative">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 pb-1 rounded-full">
                    <span className={`text-xs font-medium font-Urbanist text-${getCategoryTextColor(primaryAnnouncement.category)}`}>
                      {primaryAnnouncement.category}
                    </span>
                  </div>
                  <img
                    src={primaryAnnouncement.imageUrl}
                    alt={primaryAnnouncement.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-Urbanist text-gray-500">{primaryAnnouncement.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{primaryAnnouncement.author}</span>
                    </div>
                    <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(primaryAnnouncement.priority)}`}></span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 leading-tight font-Urbanist">
                    {primaryAnnouncement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed font-GTAmerican">
                    {primaryAnnouncement.description}
                  </p>
                  <Link href={`/announcement`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-Urbanist transition-colors">
                    Read more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="my-6 border-b border-gray-100"></div>
            </div>

            {/* Secondary Featured Announcement */}
            <div className="mb-8">
              <div className="flex items-start">
                <div className="w-[220px] h-[180px] mr-6 overflow-hidden rounded-lg relative">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 pb-1 rounded-full">
                    <span className={`text-xs font-medium text-${getCategoryTextColor(secondaryAnnouncement.category)}`}>
                      {secondaryAnnouncement.category}
                    </span>
                  </div>
                  <img
                    src={secondaryAnnouncement.imageUrl}
                    alt={secondaryAnnouncement.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{secondaryAnnouncement.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{secondaryAnnouncement.author}</span>
                    </div>
                    <span className={`inline-block w-2 h-2 rounded-full ${getPriorityColor(secondaryAnnouncement.priority)}`}></span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 leading-tight font-Urbanist">
                    {secondaryAnnouncement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed font-GTAmerican">
                    {secondaryAnnouncement.description}
                  </p>
                  <Link href={`/announcement`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium font-Urbanist transition-colors">
                    Read more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Scrollable List */}
          <div className="relative">
            {/* Section header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg mr-2">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 font-Urbanist">Latest Updates</h3>
              </div>

              {/* Scroll indicator */}
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-2">Scroll</span>
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-50 rounded-full"></div>
                  <div className="absolute top-1 left-1 right-1 bottom-1 border-2 border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
                  <ChevronDown className="w-3 h-3 text-blue-500 relative" />
                </div>
              </div>
            </div>

            {/* Enhanced scrollable container */}
            <div className="relative">
              {/* Scroll progress indicator */}
              <div className="hidden lg:block absolute right-1 top-4 bottom-4 w-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="bg-blue-400 w-full rounded-full scroll-progress"
                  style={{
                    height: '24px',
                    top: `${Math.min(scrollProgress, 90)}%`,
                    position: 'absolute'
                  }}
                ></div>
              </div>

              {/* Scrollable list */}
              <div
                ref={scrollContainerRef}
                className="overflow-y-auto hide-scrollbar relative pr-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  height: '340px'
                }}
              >
                {/* Announcement items */}
                <div className="space-y-2 pt-2 pb-4">
                  {sidebarAnnouncements.map((announcement) => (
                    <button
                      key={announcement.id}
                      className="block w-full text-left py-3 px-3 rounded-lg hover:bg-blue-50/50 transition-all duration-300 group border-l-2 border-transparent hover:border-blue-400"
                      onClick={() => handleAnnouncementClick(announcement)}
                    >
                      <div className="flex items-start">
                        {/* Image with hover effect */}
                        <div className="flex-shrink-0 w-[80px] h-[60px] overflow-hidden rounded-md mr-4 relative">
                          <img
                            src={announcement.imageUrl}
                            alt={announcement.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />

                          {/* Transparent gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium text-${getCategoryTextColor(announcement.category)}`}>
                              {announcement.category}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center">
                              <Calendar size={10} className="mr-1" />
                              {announcement.date}
                            </span>
                          </div>
                          <h3 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 mt-1 pr-4 line-clamp-2 font-Urbanist">
                            {announcement.title}
                          </h3>

                          {/* Reveal on hover */}
                          <div className="h-0 overflow-hidden transition-all duration-300 group-hover:h-6 mt-0 group-hover:mt-1 opacity-0 group-hover:opacity-100">
                            <span className="text-xs text-blue-600 flex items-center">
                              View details
                              <ArrowRight size={12} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Empty state */}
                  {sidebarAnnouncements.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      <div className="inline-block rounded-full p-3 bg-gray-50 mb-2">
                        <Bell size={24} className="text-gray-400" />
                      </div>
                      <p className="font-GTAmerican">No more announcements to display</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveAnnouncements;