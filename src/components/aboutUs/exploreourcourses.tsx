import React from "react";
import Link from "next/link";
// Update to Lucide icons to match the other sections
import { Code, Paintbrush, Wrench, Cable, Building2, BarChart3, Computer, Cpu } from 'lucide-react';

interface CategoryProps {
  title: string;
  courses: number;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
}

const CategoryCard: React.FC<CategoryProps> = ({
  title,
  courses,
  icon,
  bgColor,
  hoverColor,
}) => {
  // Function to get the correct hover class based on the hoverColor prop
  const getHoverClass = () => {
    switch (hoverColor) {
      case "bg-red-500":
        return "group-hover:bg-red-500";
      case "bg-green-500":
        return "group-hover:bg-green-500";
      case "bg-amber-500":
        return "group-hover:bg-amber-500";
      case "bg-yellow-500":
        return "group-hover:bg-yellow-500";
      case "bg-blue-500":
        return "group-hover:bg-blue-500";
      case "bg-pink-500":
        return "group-hover:bg-pink-500";
      case "bg-purple-500":
        return "group-hover:bg-purple-500";
      case "bg-cyan-500":
        return "group-hover:bg-cyan-500";
      default:
        return "group-hover:bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-gray-300 border-dashed rounded-md h-44 sm:h-52 md:h-56 lg:h-60 justify-center transition-all duration-300 group">
      <div
        className={`${bgColor} p-3 sm:p-4 md:p-5 rounded-full mb-3 sm:mb-4 md:mb-5 transition-all duration-300 ${getHoverClass()}`}
      >
        <div className="text-xl sm:text-2xl md:text-3xl transition-transform duration-300 text-gray-800 group-hover:rotate-12">
          {icon}
        </div>
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-Urbanist font-semibold text-gray-900 text-center mb-1 sm:mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base md:text-base lg:text-lg text-gray-600 text-center font-GTAmerican">
        {courses} Courses
      </p>
    </div>
  );
};

const CourseCategories: React.FC = () => {
  const categories = [
    {
      title: "Web Development",
      courses: 5,
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-red-100",
      hoverColor: "bg-red-500",
    },
    {
      title: "UI / UX Design",
      courses: 8,
      icon: <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-green-100",
      hoverColor: "bg-green-500",
    },
    {
      title: "Mechanical Engineering",
      courses: 45,
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-amber-100",
      hoverColor: "bg-amber-500",
    },
    {
      title: "Electrical Engineering",
      courses: 3,
      icon: <Cable className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-yellow-100",
      hoverColor: "bg-yellow-500",
    },
    {
      title: "Civil Engineering",
      courses: 8,
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-blue-100",
      hoverColor: "bg-blue-500",
    },
    {
      title: "Data Science",
      courses: 1,
      icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-pink-100",
      hoverColor: "bg-pink-500",
    },
    {
      title: "Computer Science",
      courses: 6,
      icon: <Computer className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-purple-100",
      hoverColor: "bg-purple-500",
    },
    {
      title: "Robotics & AI",
      courses: 2,
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      bgColor: "bg-cyan-100",
      hoverColor: "bg-cyan-500",
    },
  ];

  return (
    <div className="relative w-full bg-white px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto">
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="hidden sm:block w-10 md:w-16 lg:w-20 h-1 bg-blue-500"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-CanelaDeck xl:text-5xl 2xl:text-6xl font-bold text-center">
              <span className="text-gray-900">Explore Our </span>
              <span className="text-blue-500">Courses</span>
            </h2>
            <div className="hidden sm:block w-10 md:w-16 lg:w-20 h-1 bg-blue-500"></div>
          </div>
          {/* Mobile-only divider */}
          <div className="w-20 h-1 bg-blue-500 block sm:hidden mt-2"></div>
          <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl text-gray-600 font-Urbanist mt-4 sm:mt-6 text-center max-w-2xl">
            Browse through our wide range of courses across various categories and disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              courses={category.courses}
              icon={category.icon}
              bgColor={category.bgColor}
              hoverColor={category.hoverColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCategories;