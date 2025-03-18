"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  category?: string;
  badge?: string;
}

interface AdvertisementDialogProps {
  advertisements: Advertisement[];
  autoScrollInterval?: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AdvertisementDialog: React.FC<AdvertisementDialogProps> = ({
  advertisements,
  autoScrollInterval = 5000,
  isOpen,
  setIsOpen
}) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced auto-scroll with smooth transitions
  useEffect(() => {
    if (!isOpen || isPaused || isHovered || !advertisements.length) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 100);
    }, autoScrollInterval / 100);

    const slideInterval = setInterval(() => {
      if (progress === 99) {
        handleNext();
        setProgress(0);
      }
    }, autoScrollInterval / 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [isOpen, isPaused, isHovered, progress, autoScrollInterval, advertisements.length]);

  const handlePrevious = () => {
    if (!advertisements.length) return;
    setDirection(-1);
    setCurrentAdIndex((prev) => (prev === 0 ? advertisements.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    if (!advertisements.length) return;
    setDirection(1);
    setCurrentAdIndex((prev) => (prev === advertisements.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  // Ensure advertisements array exists and has items before accessing
  const currentAd = advertisements.length ? advertisements[currentAdIndex] : null;

  // Enhanced animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div 
            className="relative bg-white rounded-2xl max-w-4xl w-full mx-4 overflow-hidden shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div 
              className="relative"
              onMouseEnter={() => {
                setIsPaused(true);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setIsHovered(false);
              }}
            >
              {/* Enhanced Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700/30 z-50">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 background-animate"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="p-6 relative z-20">
                <motion.h2 
                  className="text-4xl font-CanelaDeck font-bold text-black"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Featured Opportunities
                </motion.h2>
                <motion.p 
                  className="text-black text-lg font-Urbanist"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Discover exclusive educational pathways tailored for you
                </motion.p>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="absolute right-6 top-6 rounded-full p-2 bg-gray-200 transition-all hover:bg-gray-300 hover:rotate-90"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5 text-gray-700" />
                </motion.button>
              </div>

              <div className="relative overflow-hidden">
                {currentAd && (
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentAdIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="relative aspect-video"
                    >
                      {/* Enhanced Image with Parallax Effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.img
                        src={currentAd.imageUrl}
                        alt={currentAd.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Enhanced Content Animation */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="space-x-2">
                          {currentAd.category && (
                            <motion.span 
                              className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-400 bg-blue-400/10 rounded-full font-Urbanist"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              {currentAd.category}
                            </motion.span>
                          )}
                          {currentAd.badge && (
                            <motion.span 
                              className="inline-block px-3 py-1 mb-4 text-sm font-medium text-emerald-400 bg-emerald-400/10 rounded-full font-Urbanist"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              {currentAd.badge}
                            </motion.span>
                          )}
                        </div>
                        <motion.h3 
                          className="text-4xl font-bold text-white mb-3 font-Urbanist"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {currentAd.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-300 text-lg mb-6 max-w-2xl font-GTAmerican"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          {currentAd.description}
                        </motion.p>
                        <motion.a
                          href={currentAd.linkUrl}
                          className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-Urbanist"
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                          <ExternalLink className="h-5 w-5" />
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Enhanced Navigation Buttons */}
                <motion.button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all z-20"
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous advertisement"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all z-20"
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next advertisement"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </motion.button>

                {/* Enhanced Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {advertisements.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentAdIndex ? 1 : -1);
                        setCurrentAdIndex(index);
                        setProgress(0);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        currentAdIndex === index
                          ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      aria-label={`Go to advertisement ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvertisementDialog;