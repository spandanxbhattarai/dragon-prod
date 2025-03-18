"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import AnnouncementContent from "./AnnouncementContent";

// Define the Announcement type
export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  imageUrl: string;
  priority: "high" | "medium" | "low";
  content?: string;
  tags?: string[];
  readTime?: number;
}

const AnnouncementDetail: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [relatedAnnouncements, setRelatedAnnouncements] = useState<Announcement[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [animateContent, setAnimateContent] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState("");
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  // Estimate reading time
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  // Extract headings from content for table of contents
  const extractHeadings = (content: string) => {
    const headingRegex = /<h2>(.*?)<\/h2>/g;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        title: match[1],
        id: match[1].toLowerCase().replace(/\s+/g, "-"),
      });
    }

    return headings;
  };

  // Simulated data fetch
  useEffect(() => {
    // In a real app, fetch from your API based on the id prop
    const mockAnnouncement: Announcement = {
      id: "1",
      title: "New Academic Year Registration Open",
      description:
        "Registration for the 2025-26 academic year is now open. Early bird discounts available for the first 100 students. Join our prestigious institution and embark on a journey of excellence in education.",
      date: "March 15, 2025",
      category: "Admissions",
      author: "Academic Office",
      authorRole: "Student Affairs",
      authorAvatar: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
      imageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop",
      priority: "high",
      tags: [
        "Registration",
        "Academic Year",
        "Admissions",
        "Early Bird",
        "Discount",
      ],
      content: `
        <p class="font-GTAmerican">We are excited to announce that registration for the 2025-26 academic year is now officially open! This marks the beginning of another promising year of academic excellence and growth at our institution.</p>
        
        <h2 class="font-Urbanist">Early Bird Benefits</h2>
        <ul class="font-GTAmerican">
          <li>20% discount on tuition fees for the first 100 registrations</li>
          <li>Priority choice in elective subjects</li>
          <li>Exclusive access to orientation programs</li>
          <li>Special mentorship opportunities</li>
        </ul>

        <h2 class="font-Urbanist">Important Dates</h2>
        <ul class="font-GTAmerican">
          <li>Early Bird Registration: March 15 - April 15, 2025</li>
          <li>Regular Registration: April 16 - May 30, 2025</li>
          <li>Orientation Week: August 25 - 31, 2025</li>
          <li>Classes Begin: September 1, 2025</li>
        </ul>

        <h2 class="font-Urbanist">New Programs</h2>
        <p class="font-GTAmerican">We're also introducing several new programs this academic year:</p>
        <ul class="font-GTAmerican">
          <li>Artificial Intelligence and Machine Learning</li>
          <li>Sustainable Development Studies</li>
          <li>Digital Marketing and Analytics</li>
          <li>Global Business Leadership</li>
        </ul>

        <p class="font-GTAmerican">Don't miss this opportunity to be part of our growing academic community. Register now to secure your spot and take advantage of our early bird offers!</p>
      `,
    };

    // Process content to add IDs to headings for table of contents
    if (mockAnnouncement.content) {
      mockAnnouncement.content = mockAnnouncement.content.replace(
        /<h2 class="font-Urbanist">(.*?)<\/h2>/g,
        (match, heading) => {
          const id = heading.toLowerCase().replace(/\s+/g, "-");
          return `<h2 id="${id}" class="font-Urbanist">${heading}</h2>`;
        }
      );
    }

    setAnnouncement(mockAnnouncement);

    // Trigger content animation after a short delay
    setTimeout(() => {
      setAnimateContent(true);
    }, 400);

    // Mock related announcements
    setRelatedAnnouncements([
      {
        id: "2",
        title: "Campus Tour Dates Announced",
        description:
          "Join us for a guided tour of our campus facilities and experience our vibrant academic environment firsthand.",
        date: "March 20, 2025",
        category: "Events",
        author: "Admissions Office",
        imageUrl:
          "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop",
        priority: "medium",
        tags: ["Campus Tour", "Facilities", "Events"],
      },
      {
        id: "3",
        title: "Scholarship Applications Open",
        description:
          "Apply now for merit-based scholarships for the upcoming academic year. Limited spots available.",
        date: "March 25, 2025",
        category: "Admissions",
        author: "Financial Aid Office",
        imageUrl:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop",
        priority: "high",
        tags: ["Scholarship", "Financial Aid", "Merit"],
      },
      {
        id: "4",
        title: "International Students Welcome Week",
        description:
          "Special orientation program for international students joining our campus this fall semester.",
        date: "April 5, 2025",
        category: "Campus Life",
        author: "International Office",
        imageUrl:
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2000&auto=format&fit=crop",
        priority: "medium",
        tags: ["International", "Orientation", "Welcome"],
      },
    ]);
  }, [id]);

  // Track reading progress and scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      if (contentRef.current) {
        const element = contentRef.current;
        const totalHeight = element.scrollHeight - element.clientHeight;
        const windowScrollTop =
          window.scrollY - element.offsetTop + window.innerHeight / 2;

        if (windowScrollTop >= 0) {
          const scrolled = Math.min(
            100,
            Math.max(0, (windowScrollTop / totalHeight) * 100)
          );
          setReadingProgress(scrolled);
        }
      }

      // Show/hide back to top button
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Determine current section for Table of Contents
      if (announcement?.content) {
        const headings = extractHeadings(announcement.content);

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = document.getElementById(headings[i].id);
          if (heading && heading.getBoundingClientRect().top <= 150) {
            setCurrentSection(headings[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [announcement]);

  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500 font-GTAmerican">Loading announcement...</p>
        </div>
      </div>
    );
  }

  // Get reading time for the announcement
  const readingTime =
    announcement.readTime ||
    getReadingTime(
      announcement.content ? announcement.content.replace(/<[^>]*>/g, " ") : ""
    );

  // Extract headings for table of contents
  const tableOfContents = announcement.content
    ? extractHeadings(announcement.content)
    : [];

  // Get category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Admissions":
        return "blue";
      case "Events":
        return "purple";
      case "Infrastructure":
        return "green";
      case "Career":
        return "amber";
      case "Academic":
        return "indigo";
      case "Campus Life":
        return "teal";
      default:
        return "gray";
    }
  };

  const categoryColor = getCategoryColor(announcement.category);

  return (
    <div className="relative w-full bg-white px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 overflow-hidden">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Navigation Float */}
      <div className="fixed top-8 left-8 z-30 lg:top-12 lg:left-12">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center bg-white/95 backdrop-blur-sm w-12 h-12 rounded-full shadow-lg hover:bg-white transition-all group"
          aria-label="Go back"
        >
          <ArrowLeft
            size={22}
            className="text-gray-700 group-hover:text-blue-600 transition-colors"
          />
        </button>
      </div>

      {/* Table of Contents Toggle (Mobile) */}
      <div className="fixed top-8 right-8 z-30 lg:hidden">
        <button
          onClick={() => setShowTableOfContents(!showTableOfContents)}
          className="flex items-center justify-center bg-white/95 backdrop-blur-sm w-12 h-12 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Toggle table of contents"
        >
          {showTableOfContents ? (
            <ChevronUp size={22} className="text-blue-600" />
          ) : (
            <ChevronDown size={22} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Table of Contents */}
      {showTableOfContents && tableOfContents.length > 0 && (
        <div className="fixed top-24 right-8 z-30 bg-white rounded-xl shadow-xl p-4 max-w-xs w-full lg:hidden">
          <h3 className="font-medium text-gray-900 mb-3 font-Urbanist">In this article</h3>
          <ul className="space-y-2 font-GTAmerican">
            {tableOfContents.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => {
                    const element = document.getElementById(heading.id);
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop - 100,
                        behavior: "smooth",
                      });
                    }
                    setShowTableOfContents(false);
                  }}
                  className={`text-left w-full px-3 py-2 rounded-lg text-sm ${
                    currentSection === heading.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {heading.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto">
        {/* Hero Section with Parallax Effect */}
        <div className="relative h-[70vh] lg:h-[75vh] overflow-hidden mt-6 sm:mt-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white z-20"></div>

            {/* Using regular img tag for background image with parallax effect */}
            <img
              src={announcement.imageUrl}
              alt={announcement.title}
              className="w-full h-full object-cover animate-slow-zoom"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 transform translate-y-20 lg:translate-y-28 z-30">
            <div className="relative px-4 sm:px-6 md:px-8 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Category Badge with Pulse Effect */}
                <div
                  className={`py-2 px-4 text-sm font-medium rounded-full inline-flex items-center 
                    bg-white/95 backdrop-blur-sm shadow-lg text-${categoryColor}-600 transform transition-transform 
                    hover:scale-105 animate-float font-GTAmerican`}
                >
                  <span
                    className={`w-2 h-2 rounded-full bg-${categoryColor}-500 mr-2 animate-pulse-blue`}
                  ></span>
                  {announcement.category}
                </div>

                {/* Title with Animation - Using CanelaDeck font for main heading */}
                <h1
                  className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mt-6 mb-8 font-CanelaDeck leading-tight 
                  transition-all duration-700 transform"
                >
                  {announcement.title}
                </h1>

                {/* Description using GTAmerican font */}
                <p className="text-lg sm:text-xl text-gray-800 mb-6 font-GTAmerican">
                  {announcement.description}
                </p>

                {/* Meta Info Badges */}
                <div className="flex flex-wrap items-center text-gray-600 gap-4 sm:gap-5 mt-4 font-GTAmerican">
                  <div className="flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <span>{announcement.date}</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pass all necessary props to the AnnouncementContent component */}
        <div ref={contentRef}>
          <AnnouncementContent 
            announcement={announcement}
            relatedAnnouncements={relatedAnnouncements}
            animateContent={animateContent}
            currentSection={currentSection}
            tableOfContents={tableOfContents}
            showBackToTop={showBackToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;