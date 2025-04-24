import React, { useState } from "react";
import CoreValues from "./CoreValues";
import ServiceGrid from "./ServiceGrid";
import ServiceModal from "./ServiceModal";
import {services} from "./ServiceData"; // Move services array to a separate file if needed

const ServicesSection = () => {
  const [modalIndex, setModalIndex] = useState(null);
  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const prevImage = () => setModalIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  const nextImage = () => setModalIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));

  return (
    <div className="font-poppins px-2 sm:px-4 md:px-6 lg:px-8">
    <CoreValues />
    <ServiceGrid services={services} openModal={openModal} />
    <ServiceModal
      isOpen={modalIndex !== null}
      service={services[modalIndex]}
      close={closeModal}
      prev={prevImage}
      next={nextImage}
    />
  </div>
  
  );
};

export default ServicesSection;
