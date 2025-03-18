
"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Allcourses from "@/components/courses/allcourses";
import Courses from "@/components/courses/courses";

const page = () => {
  return (
    <div>
      <Navbar />
      <Courses />
      <Allcourses />
      <Footer />
    </div>
  );
};

export default page;
