"use client";
import Image from "next/image";
import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  X,
  Users,
  Clock,
  Award,
  Monitor,
  CheckCircle,
  Filter,
} from "lucide-react";

// Define course types
type CourseCategory =
  | "All Courses"
  | "Mechanical Engineering"
  | "Civil Engineering"
  | "Computer Science"
  | "Electrical Engineering";

type Course = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: CourseCategory;
  image: string;
  students: number;
  duration: string;
};

// Sample engineering courses data
const engineeringCourses: Course[] = [
  {
    id: 1,
    title: "Mechanical Engineering",
    shortDescription:
      "Comprehensive preparation for Mechanical Engineering entrance exams",
    longDescription:
      "Our Mechanical Engineering program offers in-depth preparation covering thermodynamics, fluid mechanics, material science, and mechanical design. The curriculum is designed by industry experts with decades of experience in the field.",
    category: "Mechanical Engineering",
    image: "https://i.pinimg.com/736x/fc/cb/f2/fccbf25adbdfced89cc47ec5bf178f19.jpg",
    students: 1250,
    duration: "24 weeks",
  },
  // Other course data remains the same
  {
    id: 2,
    title: "Civil Engineering",
    shortDescription:
      "Structured coaching for Civil Engineering entrance exams",
    longDescription:
      "This comprehensive Civil Engineering course covers structural analysis, construction materials, soil mechanics, surveying, and environmental engineering. Learn from industry professionals with real-world project experience.",
    category: "Civil Engineering",
    image: "https://i.pinimg.com/736x/bd/5e/ea/bd5eeadd20733a78263de6a438cdcfa2.jpg",
    students: 980,
    duration: "22 weeks",
  },
  {
    id: 3,
    title: "Computer Science",
    shortDescription: "Expert preparation for Computer Science entrance exams",
    longDescription:
      "Our Computer Science program covers data structures, algorithms, database management, operating systems, and software engineering principles. Includes practical coding exercises and mock entrance examinations.",
    category: "Computer Science",
    image: "https://i.pinimg.com/736x/08/70/c0/0870c06d6a0b9fe7eff0894ae02d9f46.jpg",
    students: 1450,
    duration: "26 weeks",
  },
  {
    id: 4,
    title: "Electrical Engineering",
    shortDescription:
      "Focused preparation for Electrical Engineering entrance exams",
    longDescription:
      "This Electrical Engineering course covers circuit theory, electromagnetic fields, power systems, control systems, and digital electronics. Includes laboratory simulation sessions and problem-solving workshops.",
    category: "Electrical Engineering",
    image: "https://i.pinimg.com/736x/fe/21/b1/fe21b1dd4a290def9b09cbeba1bf2b58.jpg",
    students: 1050,
    duration: "24 weeks",
  },
  {
    id: 5,
    title: "Robotics",
    shortDescription:
      "Specialized coaching for Robotics Engineering applicants",
    longDescription:
      "Our Robotics program combines mechanical, electrical, and software engineering fundamentals with specialized robotics concepts including kinematics, dynamics, and autonomous systems design.",
    category: "Mechanical Engineering",
    image: "https://i.pinimg.com/736x/c9/ac/17/c9ac1750f2590cc27fef3f53552ff7e1.jpg",
    students: 780,
    duration: "20 weeks",
  },
  {
    id: 6,
    title: "Software Engineering",
    shortDescription:
      "Comprehensive preparation for Software Engineering programs",
    longDescription:
      "This Software Engineering course covers software development methodologies, system architecture, testing strategies, and project management. Includes hands-on coding projects and system design exercises.",
    category: "Computer Science",
    image: "https://i.pinimg.com/736x/0b/b3/62/0bb362c092c4a6cf32b014df3303583b.jpg",
    students: 1320,
    duration: "24 weeks",
  },
  {
    id: 7,
    title: "Electronics",
    shortDescription:
      "Expert guidance for Bachelor of Electronics entrance exams",
    longDescription:
      "Our Electronics program covers semiconductor devices, integrated circuits, digital systems, signal processing, and communication systems. Includes practical circuit design and simulation exercises.",
    category: "Electrical Engineering",
    image: "https://i.pinimg.com/736x/cb/d7/cb/cbd7cb832ce20ec443fe6a07aa7e18a1.jpg",
    students: 890,
    duration: "22 weeks",
  },
  {
    id: 8,
    title: "Structural Engineering",
    shortDescription:
      "Focused coaching for Structural Engineering specialization",
    longDescription:
      "This specialized Structural Engineering course covers advanced structural analysis, concrete and steel design, earthquake engineering, and structural dynamics. Includes design projects and structural modeling exercises.",
    category: "Civil Engineering",
    image: "https://i.pinimg.com/736x/23/ae/19/23ae19e2736c95b9780d0d08d3a4b5a1.jpg",
    students: 720,
    duration: "20 weeks",
  },
  {
    id: 9,
    title: "Artificial Intelligence",
    shortDescription:
      "Advanced preparation for AI specialization entrance exams",
    longDescription:
      "Our AI program covers machine learning, neural networks, natural language processing, computer vision, and knowledge representation. Includes practical implementation of AI algorithms and research methodology.",
    category: "Computer Science",
    image: "https://i.pinimg.com/736x/94/96/d6/9496d60b0fa7f91945f3a5b1fc931e3c.jpg",
    students: 1100,
    duration: "24 weeks",
  },
];

// Dialog component
interface CourseDialogProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const CourseDialog: React.FC<CourseDialogProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="relative h-72 sm:h-80">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover rounded-t-xl"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium font-Urbanist">
              {course.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="font-CanelaDeck text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4">
            {course.title}
          </h2>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
            <div className="flex items-center">
              <Users className="text-blue-600 mr-2" size={20} />
              <span className="font-GTAmerican text-gray-700">
                {course.students} Students
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="text-blue-600 mr-2" size={20} />
              <span className="font-GTAmerican text-gray-700">
                {course.duration}
              </span>
            </div>
          </div>

          <p className="font-GTAmerican text-sm sm:text-base md:text-base lg:text-lg text-gray-600 mb-8 leading-relaxed">
            {course.longDescription}
          </p>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-CanelaDeck text-xl font-bold mb-4 flex items-center">
                <Award className="text-blue-600 mr-2" size={20} />
                Course Highlights
              </h3>
              <ul className="space-y-3 font-GTAmerican pl-8">
                <li className="flex items-start">
                  <CheckCircle
                    className="text-blue-600 mr-3 flex-shrink-0 mt-1"
                    size={16}
                  />
                  <span>Expert faculty with industry experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-blue-600 mr-3 flex-shrink-0 mt-1"
                    size={16}
                  />
                  <span>Comprehensive study materials and practice tests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-blue-600 mr-3 flex-shrink-0 mt-1"
                    size={16}
                  />
                  <span>
                    Regular mock examinations and performance analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-blue-600 mr-3 flex-shrink-0 mt-1"
                    size={16}
                  />
                  <span>Personalized doubt-clearing sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle
                    className="text-blue-600 mr-3 flex-shrink-0 mt-1"
                    size={16}
                  />
                  <span>Online and offline learning options</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-CanelaDeck text-xl font-bold mb-4 flex items-center">
                <Monitor className="text-blue-600 mr-2" size={20} />
                Learning Format
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-GTAmerican">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Online Classes</h4>
                  <p className="text-sm text-gray-700">
                    Live interactive sessions with recorded access
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Study Materials</h4>
                  <p className="text-sm text-gray-700">
                    Comprehensive notes and practice questions
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Mock Tests</h4>
                  <p className="text-sm text-gray-700">
                    Regular assessments with detailed analysis
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Doubt Sessions</h4>
                  <p className="text-sm text-gray-700">
                    One-on-one problem-solving with faculty
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button className="group relative text-white px-6 sm:px-8 py-3 sm:py-4 bg-[#1A73E8] border-2 border-[#1A73E8] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-[#1A73E8] hover:text-[#1A73E8] w-full">
                <span className="relative z-20 font-Urbanist text-sm sm:text-base">
                  Enroll Now
                </span>
                <div className="absolute inset-0 w-full h-full bg-white -z-10 transform translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category filter tabs
const CategoryTabs: React.FC<{
  categories: CourseCategory[];
  activeCategory: CourseCategory;
  onCategoryChange: (category: CourseCategory) => void;
}> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="relative mb-8 sm:mb-10">
      <div className="flex items-center mb-4">
        <Filter size={18} className="mr-2 text-blue-600" />
        <h2 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold font-CanelaDeck">Filter Courses</h2>
      </div>
      <div className="flex overflow-x-auto pb-4 gap-4 sm:gap-6 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors font-Urbanist ${
              activeCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Course card component
const CourseCard: React.FC<{
  course: Course;
  onLearnMore: () => void;
}> = ({ course, onLearnMore }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-52">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-medium font-Urbanist">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="font-CanelaDeck font-bold text-xl mb-3">{course.title}</h3>
        <p className="font-GTAmerican text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="flex justify-between text-sm text-gray-500 mb-5">
          <div className="flex items-center">
            <Users size={16} className="mr-1 text-blue-600" />
            <span className="font-GTAmerican">{course.students}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-blue-600" />
            <span className="font-GTAmerican">{course.duration}</span>
          </div>
        </div>

        <button
          onClick={onLearnMore}
          className="group relative px-6 py-3 border-2 border-[#1A73E8] text-[#1A73E8] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md mt-auto w-full flex items-center justify-center"
        >
          <span className="relative z-20 font-Urbanist text-sm sm:text-base flex items-center">
            <BookOpen size={16} className="mr-2" />
            Learn More
            <ChevronRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </span>
          <div className="absolute inset-0 w-full h-full bg-[#1A73E8] -z-10 transform translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
        </button>
      </div>
    </div>
  );
};

// Main component
export default function EngineeringCourses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<CourseCategory>("All Courses");

  const categories: CourseCategory[] = [
    "All Courses",
    "Mechanical Engineering",
    "Civil Engineering",
    "Computer Science",
    "Electrical Engineering",
  ];

  const filteredCourses =
    activeCategory === "All Courses"
      ? engineeringCourses
      : engineeringCourses.filter(
          (course) => course.category === activeCategory
        );

  const openCourseDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
    // Prevent scrolling on the background when dialog is open
    document.body.style.overflow = "hidden";
  };

  const closeCourseDialog = () => {
    setIsDialogOpen(false);
    // Re-enable scrolling when dialog is closed
    document.body.style.overflow = "auto";
  };

  return (
    <div className="relative w-full mt-10 bg-white px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden">
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto">
        <div className="w-full">
          <p className="text-blue-600 font-medium text-base sm:text-lg font-Urbanist">Our Programs</p>
          
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mt-2 font-CanelaDeck leading-tight mb-8 sm:mb-10">
            Engineering Entrance Exam Preparation
          </h1>

          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onLearnMore={() => openCourseDialog(course)}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              <h3 className="font-CanelaDeck text-xl font-bold mb-2">
                No courses found
              </h3>
              <p className="font-GTAmerican text-gray-600">
                No courses available in this category. Try selecting a different
                category.
              </p>
            </div>
          )}

          <CourseDialog
            course={selectedCourse}
            isOpen={isDialogOpen}
            onClose={closeCourseDialog}
          />
        </div>
      </div>
    </div>
  );
}