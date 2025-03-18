"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavItem[];
}

const NavDropdown = ({ label, items }: NavDropdownProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        className="flex items-center px-4 h-full text-base font-semibold font-GTAmerican text-gray-800 transition-all duration-300"
        aria-expanded={isHovering}
        aria-controls={`dropdown-${label.toLowerCase()}`}
      >
        {label}
        <ChevronDown
          className="ml-1 h-4 w-4 font-bold transition-transform duration-300 group-hover:rotate-180"
          strokeWidth={3}
        />
      </button>

      {/* Dropdown menu with blue indicator on top */}
      <div
        id={`dropdown-${label.toLowerCase()}`}
        className={`absolute left-0 top-full w-56 transition-all duration-300 ease-in-out z-50 ${
          isHovering
            ? "opacity-100 visible -translate-y-6"
            : "opacity-0 invisible -translate-y-8"
        }`}
        role="menu"
        aria-hidden={!isHovering}
      >
        {/* Blue indicator line */}
        <div className="h-1 bg-blue-600 w-full"></div>

        <div className="shadow-lg bg-white rounded-b-lg overflow-hidden">
          <div
            className="py-1 space-y-0.5"
            role="menu"
            aria-orientation="vertical"
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 mx-2 text-sm font-GTAmerican font-semibold text-gray-700 hover:bg-blue-600 hover:text-white active:bg-blue-700 focus:bg-blue-600 focus:text-white transition-all duration-300 relative group"
                role="menuitem"
              >
                <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNavDropdown = ({ label, items }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3 py-2 text-base font-semibold font-GTAmerican text-gray-700"
        aria-expanded={isOpen}
        aria-controls={`mobile-dropdown-${label.toLowerCase()}`}
      >
        {label}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`mobile-dropdown-${label.toLowerCase()}`}
            className="pl-4 py-1 bg-gray-50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-3 py-2 text-sm font-GTAmerican text-gray-700 active:text-blue-600 focus:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  // Animation variants for menu items
  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <nav
      className={`bg-white shadow-sm z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
      style={{ fontFamily: "GTAmerican, sans-serif" }}
    >
      <div className="max-w-full xl:max-w-[90rem] 2xl:max-w-[120rem] mx-auto">
        <div className="flex justify-between items-stretch w-full flex-wrap h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 2xl:h-24">
          <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-8 xl:px-4 2xl:px-4">
            <div className="flex items-center justify-between h-full">
              {/* Logo section */}
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-12 w-auto sm:h-14 md:h-16 lg:h-18 xl:h-20 2xl:h-20 transition-all duration-300"
                />

                {/* Divider - hidden on mobile */}
                <div className="hidden sm:block h-10 md:h-12 lg:h-14 xl:h-14 w-[0.5px] py-3 bg-zinc-300 mx-1 md:mx-4"></div>

                {/* Category button - simplified on mobile */}
                <button className="flex items-center sm:space-x-2 h-full py-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="14"
                      y="4"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="4"
                      y="14"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="14"
                      y="14"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="hidden sm:inline font-medium text-black font-Urbanist text-sm md:text-base lg:text-base xl:text-lg">
                    Category
                  </span>
                </button>
              </div>

              {/* Navigation Links - Desktop only */}
              <div className="hidden lg:flex lg:items-stretch lg:h-full">
                <Link
                  href="/"
                  className="px-3 lg:px-4 h-full flex items-center text-base lg:text-lg xl:text-lg font-semibold font-GTAmerican text-gray-800 transition-colors duration-300"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="px-3 lg:px-4 h-full flex items-center text-base lg:text-lg xl:text-lg font-semibold font-GTAmerican text-gray-800  transition-colors duration-300"
                >
                  About Us
                </Link>
                <Link
                  href="/results"
                  className="px-3 lg:px-4 h-full flex items-center text-base lg:text-lg xl:text-lg font-semibold font-GTAmerican text-gray-800  transition-colors duration-300"
                >
                  Result
                </Link>
                <Link
                  href="/courses"
                  className="px-3 lg:px-4 h-full flex items-center text-base lg:text-lg xl:text-lg font-semibold font-GTAmerican text-gray-800  transition-colors duration-300"
                >
                  Courses
                </Link>

                <Link
                  href="/contact"
                  className="px-3 lg:px-4 h-full flex items-center text-base lg:text-lg xl:text-lg font-semibold font-GTAmerican text-gray-800  transition-colors duration-300 relative z-20"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side with blue background - Adjusted z-index */}
          <div className="bg-blue-600 relative flex items-center justify-end px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 2xl:px-20 z-10">
            {/* Diagonal cut for blue background - preserved on all screen sizes */}
            <div className="absolute left-0 top-0 h-full w-10 sm:w-12 md:w-16 lg:w-20 xl:w-20 bg-white transform skew-x-40 -ml-5 sm:-ml-6 md:-ml-8 lg:-ml-10"></div>

            {/* Right side buttons - Reduced z-index */}
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              {/* Fixed login/register button with RIGHT-TO-LEFT hover effect */}
              <div className="hidden lg:flex items-center">
                <div className="inline-flex items-center px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 md:py-2 lg:py-3 border border-transparent text-sm sm:text-base md:text-base lg:text-lg xl:text-lg font-medium font-GTAmerican rounded-full bg-white transition-all duration-500 relative overflow-hidden group">
                  {/* Background that slides from RIGHT to LEFT on hover */}
                  <span className="absolute right-0 top-0 h-full w-0 bg-[#002935] transition-all duration-500 ease-in-out group-hover:w-full"></span>

                  {/* Content positioned on top of the background layers */}
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                    <Link
                      href="/login"
                      className="text-black group-hover:text-white transition-colors duration-500 font-Urbanist"
                    >
                      Login
                    </Link>
                    <span className="mx-1 text-gray-800 group-hover:text-white transition-colors duration-500">
                      {" "}
                      /{" "}
                    </span>
                    <Link
                      href="/register"
                      className="text-black group-hover:text-white transition-colors duration-500 font-Urbanist"
                    >
                      Register
                    </Link>
                  </span>
                </div>
              </div>

              {/* Premium styled Mobile menu button with elegant design - shifted right */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative inline-flex items-center justify-center p-2 sm:p-3 group"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">Open main menu</span>

                  {/* Circular background with gradient and shadow */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"></span>

                  {/* Three lines for the hamburger icon */}
                  <div className="relative flex flex-col justify-center items-center w-6 h-5 z-10">
                    <span
                      className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                        isMobileMenuOpen
                          ? "transform rotate-45 translate-y-1.5"
                          : ""
                      }`}
                    ></span>
                    <span
                      className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 ${
                        isMobileMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></span>
                    <span
                      className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 mt-1.5 ${
                        isMobileMenuOpen
                          ? "transform -rotate-45 -translate-y-1.5"
                          : ""
                      }`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Mobile menu with Framer Motion animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white bg-opacity-95 backdrop-blur-sm"
            id="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            {/* Close button at top-right */}
            <motion.div
              className="absolute top-6 right-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>

            {/* Centered logo */}
            <motion.div
              className="flex justify-center mt-12 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              <img src="/images/logo.png" alt="Logo" className="h-12 sm:h-14 md:h-16 w-auto" />
            </motion.div>

            {/* Menu items with staggered animation */}
            <motion.div className="flex flex-col px-6 space-y-6 mt-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  className="text-2xl sm:text-3xl font-Urbanistfont-bold text-gray-900 hover:text-blue-600 relative group w-full py-3 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-16 transition-all duration-300 ease-in-out"></span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/about"
                  className="text-2xl sm:text-3xl font-Urbanist font-bold text-gray-900 hover:text-blue-600 relative group w-full py-3 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-24 transition-all duration-300 ease-in-out"></span>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link
                  href="/contact"
                  className="text-2xl sm:text-3xl font-Urbanist font-bold text-gray-900 hover:text-blue-600 relative group w-full py-3 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-20 transition-all duration-300 ease-in-out"></span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Login/Register buttons with staggered animation */}
            <motion.div
              className="mt-20 mb-12 px-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <div className="flex flex-col space-y-4 max-w-sm mx-auto w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/login"
                    className="w-full text-center px-6 py-4 text-base font-semibold font-GTAmerican rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-md block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/register"
                    className="w-full text-center px-6 py-4 text-base font-semibold font-GTAmerican rounded-full bg-transparent text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 transition-all duration-300 block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No need for spacer div since navbar is not fixed */}
    </nav>
  );
};

export default Navbar;