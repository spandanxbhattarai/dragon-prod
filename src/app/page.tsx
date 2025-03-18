"use client";
import Navbar from "@/components/navbar";
import HeroSection from '@/components/homePage/heroSection';
import FeatureSection from '@/components/homePage/featureSection';
import PopularCourses from '@/components/homePage/courses';
import HowItWorks from "@/components/homePage/howItWork";
import Teacher from "@/components/homePage/teachersection";
import Video from "@/components/homePage/videoSection";
import Testimonials from "@/components/homePage/testimonials";
import Footer from "@/components/footer";
import Announcement from "@/components/homePage/announcement";
import MarqueeAdvertisement from "@/components/homePage/marqueeAdvertisement";
import Banner from "@/components/homePage/baneer";
import PricingSection from "@/components/homePage/pricingSection";

export default function Home() {
  const adData = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Up to 50% off on all summer items. Limited time offer!",
      imageUrl: "https://i.pinimg.com/736x/1f/bf/c6/1fbfc6440f097863e1694d4b71e24c45.jpg",
      linkUrl: "https://example.com/summer-sale"
    },
    {
      id: 2,
      title: "New Collection",
      description: "Check out our latest fashion collection for this season.",
      imageUrl: "https://i.pinimg.com/736x/93/0d/8b/930d8b62e0a0c070c9d9b1928f0abec8.jpg",
      linkUrl: "https://example.com/new-collection"
    },
    {
      id: 3,
      title: "Summer Sale",
      description: "Up to 50% off on all summer items. Limited time offer!",
      imageUrl: "https://i.pinimg.com/736x/3c/9f/63/3c9f631551c1e98af4fcfc025b0d698f.jpg",
      linkUrl: "https://example.com/summer-sale"
    },
    {
      id: 4,
      title: "New Collection",
      description: "Check out our latest fashion collection for this season.",
      imageUrl: "https://i.pinimg.com/736x/cc/e4/4b/cce44ba705dc3f50512fa369058ff4e0.jpg",
      linkUrl: "https://example.com/new-collection"
    }

  ];
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <div className="w-full mx-auto py-8">
        <MarqueeAdvertisement
          advertisements={adData}
          speed={40}
          gap={16}
          autoplayDirection="left"
        />
      </div>
      <PopularCourses />
      <PricingSection />
      <Announcement></Announcement>
      <HowItWorks />
      <Video />
      <Teacher />
      <Banner></Banner>

      <Testimonials />
      <Footer />
    </div>
  );
}