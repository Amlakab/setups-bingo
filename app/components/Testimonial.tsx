"use client";
import React from 'react';

type TestimonialProps = {
  name: string;
  role: string;
  content: string;
  earnings: string;
};

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, earnings }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
      <p className="text-gray-600 italic mb-4">`{content}`</p>
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
          {earnings}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;