'use client';

import { useState } from "react";
import TestimonialsCarousel from "./TestimonialsCarousel";


const Testimonials = () => {
  const [] = useState(0);

  // Handle keyboard navigation

  return (
    <section
      aria-label="Customer Testimonials"
      className="py-16 bg-gray-50"
    >
      <TestimonialsCarousel />
    </section>
  );
}

export default Testimonials;