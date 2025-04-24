import React from "react";
import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services, openModal }) => {
  return (
    <section className="bg-white py-12 sm:py-16 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 overflow-x-hidden">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

          {services.map((card, index) => (
            <ServiceCard
              key={card.title}
              index={index}
              image={card.image}
              title={card.title}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
