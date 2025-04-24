// src/components/ServiceTemplate.jsx
import React from "react";

const ServiceTemplate = ({ title, bannerImg, description, types, advantages, contentImg }) => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative">
        {/* <img src={bannerImg} alt={title} className="w-full h-[300px] object-cover" />
        <h1 className="absolute bottom-5 left-5  text-3xl sm:text-4xl font-bold text-white bg-black bg-opacity-50 px-4 py-2 rounded">
          {title}
        </h1> */}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded">
            Get a Quote
          </button>
        </div>

        {/* Image */}
        <div>
          <img src={bannerImg} alt={title} className="w-full rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Service Details */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h3 className="text-xl font-bold border-b-2 border-yellow-500 pb-1 mb-4">Service Details</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Types</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {types.map((type, idx) => (
                <li key={idx}>{type}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Advantages</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {advantages.map((adv, idx) => (
                <li key={idx}>{adv}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTemplate;
