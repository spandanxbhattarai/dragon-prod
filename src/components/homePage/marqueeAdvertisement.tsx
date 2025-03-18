"use client";
import React, { useState, useRef, useEffect } from 'react';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

interface MarqueeAdvertisementProps {
  advertisements: Advertisement[];
  speed?: number; // pixels per second
  gap?: number;
  autoplayDirection?: 'left' | 'right';
}

const MarqueeAdvertisement: React.FC<MarqueeAdvertisementProps> = ({
  advertisements,
  speed = 30,
  gap = 8,
  autoplayDirection = 'left'
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [duplicatedAds, setDuplicatedAds] = useState<Advertisement[]>([]);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  useEffect(() => {
    // Duplicate advertisements to create seamless loop
    setDuplicatedAds([...advertisements, ...advertisements]);
  }, [advertisements]);

  // Setup and manage animation
  useEffect(() => {
    if (!innerRef.current || !containerRef.current) return;

    const totalDistance = innerRef.current.scrollWidth / 2; // One set of advertisements
    const pixelsPerMs = speed / 1000;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!innerRef.current) return;

      // Initialize lastTimestamp on first run
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isPaused) {
        const deltaTime = timestamp - lastTimestamp;

        // Move the animation forward
        positionRef.current += pixelsPerMs * deltaTime;

        // Reset when we've moved through half the content (one complete set)
        if (positionRef.current >= totalDistance) {
          positionRef.current = 0;
        }

        // Apply the transform
        const translateValue = autoplayDirection === 'left' ? -positionRef.current : positionRef.current;
        innerRef.current.style.transform = `translateX(${translateValue}px)`;
      }

      lastTimestamp = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, isPaused, autoplayDirection]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={innerRef}
        className="flex items-center"
        style={{ gap: `${gap}px` }}
      >
        {duplicatedAds.map((ad, index) => (
          <div
            key={`${ad.id}-${index}`}
            className="flex-shrink-0 relative w-80 h-64 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            style={{ marginRight: `${gap}px` }}
          >
            {/* Full-size image */}
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"></div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 className="font-bold text-xl mb-2 font-CanelaDeck">{ad.title}</h3>
              <p className="text-sm text-gray-200 mb-4 line-clamp-2 font-GTAmerican">{ad.description}</p>
              <a
                href={ad.linkUrl}
                className="inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-blue-500/20 font-Urbanist"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeAdvertisement;