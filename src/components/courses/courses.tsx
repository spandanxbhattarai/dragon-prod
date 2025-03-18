"use client";
import { useState, ReactNode } from "react";
import Image from "next/image";
import {
  Play,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  FileText,
  Users,
  Video,
  Globe,
  Star,
  Laptop,
  Lightbulb,
} from "lucide-react";

type NavItem = "Overview" | "Curriculum" | "Review" | "Instructor";

type CourseFeatureItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

const CourseFeatureItem: React.FC<CourseFeatureItemProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 sm:mb-5">
      <div className="flex items-center">
        <span className="text-blue-600 mr-3">{icon}</span>
        <span className="font-GTAmerican text-sm sm:text-base">{label}</span>
      </div>
      <div className="font-medium font-GTAmerican text-sm sm:text-base">{value}</div>
    </div>
  );
};

// Type definitions for content items
type LessonItem = {
  title: string;
  icon: "Video" | "FileText" | "Lightbulb";
  minutes: number;
};

type ReviewItem = {
  name: string;
  rating: number;
  date: string;
  comment: string;
};

// Icon mapping for TypeScript safety
const iconMap = {
  Video: <Video className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
};

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState<NavItem>("Overview");

  // Course content data
  const beginnerLessons: LessonItem[] = [
    {
      title: "Introduction to Course Material",
      icon: "Video",
      minutes: 10,
    },
    {
      title: "Basic Concepts and Terminology",
      icon: "Video",
      minutes: 15,
    },
    { title: "Foundation Principles", icon: "FileText", minutes: 12 },
    { title: "Preliminary Quiz", icon: "Lightbulb", minutes: 8 },
    { title: "Key Frameworks", icon: "Video", minutes: 20 },
  ];

  const intermediateLessons: LessonItem[] = [
    { title: "Advanced Problem Solving", icon: "Video", minutes: 25 },
    { title: "Critical Analysis Methods", icon: "FileText", minutes: 18 },
    { title: "Practical Applications", icon: "Video", minutes: 22 },
    { title: "Case Study Workshop", icon: "Lightbulb", minutes: 30 },
    { title: "Strategy Development", icon: "Video", minutes: 15 },
  ];

  const advancedLessons: LessonItem[] = [
    { title: "Expert-Level Techniques", icon: "Video", minutes: 35 },
    { title: "Comprehensive Case Analysis", icon: "FileText", minutes: 28 },
    { title: "Professional Standards", icon: "Video", minutes: 20 },
    { title: "Final Assessment Project", icon: "Lightbulb", minutes: 45 },
    { title: "Industry Best Practices", icon: "Video", minutes: 25 },
  ];

  // Reviews data
  const reviews: ReviewItem[] = [
    {
      name: "James Wilson",
      rating: 5,
      date: "February 12, 2025",
      comment:
        "This course provided exactly what I needed to prepare for my exam. The structured approach and practice tests were invaluable.",
    },
    {
      name: "Sophia Garcia",
      rating: 4,
      date: "January 28, 2025",
      comment:
        "Very thorough content with excellent explanations. The instructor clearly knows the subject matter well and presents it effectively.",
    },
    {
      name: "David Thompson",
      rating: 5,
      date: "January 15, 2025",
      comment:
        "I passed my exam with a top score thanks to this comprehensive course. Well worth the investment for anyone serious about success.",
    },
  ];

  // Function to render lesson lists
  const renderLessonList = (lessons: LessonItem[]) => {
    return lessons.map((item, index) => (
      <div
        key={index}
        className={`flex items-center justify-between p-4 sm:p-5 ${index !== 0 ? "border-t border-gray-100" : ""
          }`}
      >
        <div className="flex items-center">
          <div className="text-blue-600 mr-3">{iconMap[item.icon]}</div>
          <span className="font-GTAmerican font-medium text-sm sm:text-base">{item.title}</span>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm mr-4 hover:bg-blue-100 transition-colors font-Urbanist">
            Preview
          </button>
          <span className="font-GTAmerican text-gray-500 w-20 text-right text-sm sm:text-base">
            {item.minutes} Minutes
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="relative w-full mt-10 bg-white px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden">
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto">
        {/* Section Label */}
        <p className="text-blue-600 font-medium text-base sm:text-lg font-Urbanist mb-2">Course Details</p>

        {/* Course Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {/* Video Preview */}
          <div className="flex-1 min-w-[300px] relative rounded-xl overflow-hidden shadow-lg">
            <div className="w-full aspect-video relative">
              <Image
                src="https://i.pinimg.com/736x/b4/5e/2f/b45e2fb4dcf90920d1a527439afa2f96.jpg"
                alt="Course preview"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all duration-300 shadow-md">
                  <Play className="text-blue-600 text-xl ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div className="flex-shrink-0 w-full lg:w-[320px] bg-white p-5 sm:p-6 rounded-xl shadow-lg">
            <h3 className="text-lg sm:text-xl font-Urbanist font-semibold mb-4 sm:mb-5 pb-3 border-b border-gray-100">
              Course Features
            </h3>

            <div className="space-y-2 sm:space-y-3">
              <CourseFeatureItem
                icon={<Clock className="text-lg" />}
                label="Duration"
                value="35 H"
              />
              <CourseFeatureItem
                icon={<FileText className="text-lg" />}
                label="Lessons"
                value="92"
              />
              <CourseFeatureItem
                icon={<Users className="text-lg" />}
                label="Students"
                value="8500+"
              />
              <CourseFeatureItem
                icon={<Video className="text-lg" />}
                label="Videos"
                value="25 H"
              />
              <CourseFeatureItem
                icon={<Laptop className="text-lg" />}
                label="Practice Tests"
                value="18"
              />
              <CourseFeatureItem
                icon={<Globe className="text-lg" />}
                label="Language"
                value="English"
              />
            </div>

            <div className="flex justify-between items-center my-6 font-GTAmerican pt-3 border-t border-gray-100">
              <div className="text-2xl font-bold text-blue-600">
                NRP 3999{" "}
                <span className="text-gray-400 line-through text-base ml-2">
                  NRP 2999
                </span>
              </div>
            </div>

            <button
              className="group relative text-white px-6 sm:px-8 py-3 sm:py-4 bg-[#1A73E8] border-2 border-[#1A73E8] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-[#1A73E8] hover:text-[#1A73E8] w-full"
              onClick={() => console.log("Enrollment clicked")}
            >
              <span className="relative z-20 font-Urbanist text-sm sm:text-base">
                Enroll Now
              </span>
              <div className="absolute inset-0 w-full h-full bg-white -z-10 transform translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
            </button>

            <div className="flex items-center justify-center text-sm text-gray-500 font-GTAmerican mt-6 pt-4 border-t border-gray-100">
              <span className="mr-2">Share on:</span>
              <a
                href="#"
                className="mx-2 hover:text-blue-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="mx-2 hover:text-blue-600 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="mx-2 hover:text-blue-600 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Course Info Main Content */}
        <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl shadow-lg">
          {/* Instructor Info */}
          <div className="flex flex-wrap items-center mb-6 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shadow-md">
              <Image
                src="https://i.pinimg.com/736x/14/b6/70/14b670f183eb1a0ea98d5379f36edd86.jpg"
                alt="Professor Robert Miller"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-Urbanist">
              <div className="font-bold pr-3 border-r border-gray-300">
                Professor Robert Miller
              </div>
              <div className="pr-3 border-r border-gray-300">
                Course Instructor
              </div>
              <div className="pr-3 border-r border-gray-300">
                18 March, 2025
              </div>
              <div className="flex items-center">
                <div className="text-yellow-400 flex">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="ml-1">(8.7k)</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 font-CanelaDeck leading-tight mb-6 sm:mb-8">
            Complete Professional Development Course 2025
          </h1>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-300 mb-6 sm:mb-8">
            {(["Overview", "Curriculum", "Review", "Instructor"] as const).map(
              (tab) => (
                <div
                  key={tab}
                  className={`py-3 px-4 sm:px-5 cursor-pointer font-medium whitespace-nowrap relative font-Urbanist ${activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                  )}
                </div>
              )
            )}
          </div>

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <div className="mt-6 sm:mt-8 text-gray-700 leading-relaxed space-y-4 font-GTAmerican text-sm sm:text-base md:text-base lg:text-lg">
              <p>
                This comprehensive professional development course is designed
                to provide you with the essential knowledge and skills needed to
                excel in today's competitive environment. With over 90 detailed
                lessons covering all critical topics, you'll receive expert
                guidance on professional strategies, time management, and
                critical thinking skills.
              </p>
              <p>
                Our course materials include in-depth subject reviews, practical
                exercises with detailed explanations, and comprehensive
                assessments that simulate real-world scenarios. Each module is
                carefully structured to progressively build your understanding
                and proficiency in key concepts that are vital for professional
                success.
              </p>
              <p>
                Whether you're looking to advance your career, change
                professional directions, or enhance your existing skills, this
                course provides the comprehensive framework and personalized
                support to help you achieve your professional goals and stand
                out in your field.
              </p>
            </div>
          )}

          {activeTab === "Curriculum" && (
            <div className="mt-6 sm:mt-8">
              <div className="mb-8 sm:mb-10">
                <h2 className="font-CanelaDeck text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                  Foundation Level Course Materials
                </h2>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  {renderLessonList(beginnerLessons)}
                </div>
              </div>

              <div className="mb-8 sm:mb-10">
                <h2 className="font-CanelaDeck text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                  Intermediate Application Techniques
                </h2>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  {renderLessonList(intermediateLessons)}
                </div>
              </div>

              <div className="mb-8 sm:mb-10">
                <h2 className="font-CanelaDeck text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                  Advanced Professional Mastery
                </h2>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  {renderLessonList(advancedLessons)}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Review" && (
            <div className="mt-6 sm:mt-8">
              <h2 className="font-CanelaDeck text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">
                Student Reviews
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-GTAmerican font-bold">
                        {review.name}
                      </div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex text-yellow-400 mb-3">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="font-GTAmerican text-gray-700 text-sm sm:text-base">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Instructor" && (
            <div className="mt-6 sm:mt-8">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="md:w-1/3">
                  <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src="https://i.pinimg.com/736x/3b/2b/95/3b2b959740fe60d97e702184da07dccf.jpg"
                        alt="Professor Robert Miller"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="font-CanelaDeck text-xl font-bold mb-2">
                      Professor Robert Miller
                    </h2>
                    <p className="font-GTAmerican text-blue-600 mb-4">
                      Professional Development Expert
                    </p>

                    <div className="flex justify-center space-x-3 mb-4">
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Facebook />
                      </a>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Twitter />
                      </a>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="font-CanelaDeck text-xl font-bold mb-4">
                    About the Instructor
                  </h3>

                  <div className="font-GTAmerican space-y-4 text-gray-700 text-sm sm:text-base md:text-base lg:text-lg">
                    <p>
                      Professor Robert Miller has over 18 years of experience in
                      professional development and corporate training. He holds
                      a Ph.D. in Organizational Leadership from Columbia
                      University and has helped thousands of professionals
                      advance their careers.
                    </p>
                    <p>
                      As a former executive for a Fortune 500 company, Professor
                      Miller brings real-world insights about what employers are
                      looking for and how to approach different professional
                      challenges strategically.
                    </p>
                    <p>
                      His teaching methodology combines research-backed
                      principles with practical applications. Professor Miller
                      is known for his ability to translate complex concepts
                      into actionable strategies and for creating engaging
                      learning experiences that produce measurable results.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-GTAmerican font-bold mb-2">
                      Specializations:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 font-GTAmerican text-sm sm:text-base">
                      <li>Strategic Leadership</li>
                      <li>Organizational Development</li>
                      <li>Professional Communication</li>
                      <li>Problem-Solving Methodologies</li>
                      <li>Career Advancement Strategies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Featured Section */}
          <div className="mt-8 sm:mt-10 lg:mt-12  p-5 sm:p-6 md:p-8  flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className="flex-shrink-0 w-full lg:w-1/3 overflow-hidden rounded-xl">
              <Image
                src="https://i.pinimg.com/736x/3b/2b/95/3b2b959740fe60d97e702184da07dccf.jpg"
                alt="Featured Course Content"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-CanelaDeck text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-600">
                Why our Professional Development approach stands out?
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Comprehensive coverage of essential professional skills
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Step-by-step implementation strategies
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Advanced career planning and positioning techniques
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Exclusive case studies with graduated complexity
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Personalized feedback on your professional development
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Targeted modules for specific industry challenges
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-blue-600 mr-3 mt-1 text-sm flex-shrink-0" />
                  <span className="font-GTAmerican text-sm sm:text-base">
                    Efficiency-focused methodologies for professional growth
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}