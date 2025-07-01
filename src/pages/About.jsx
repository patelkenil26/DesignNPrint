import React from "react";
import HeroSection from "../components/About/HeroSection";
import Breadcrumb from "../components/About/Breadcrumb";
import VisionSection from "../components/About/VisionSection";
import JourneySection from "../components/About/JourneySection";
import MissionCard from "../components/About/MissionCard";
import ServicesList from "../components/About/ServicesList";
import { motion } from "framer-motion";

const About = () => {
  const breadcrumbPaths = [{ name: "Home", link: "/" }, { name: "About Us" }];

  return (
    <div className="font-poppins">
      <HeroSection
        title="About Us"
        imageUrl="https://img.freepik.com/premium-vector/vector-flat-people-business-teamwork-illustration-flat-illustration_787500-10481.jpg?w=1060"
      />

      <Breadcrumb paths={breadcrumbPaths} />

      <motion.div
        className="grid md:grid-cols-2 gap-6 px-4 my-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.05 }}>
          <img
            src="https://img.freepik.com/free-vector/organic-printing-industry_23-2148904373.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>

        <div>
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Leading Printing Company
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Design N Prints is specialized in fine-quality printing and
            supporting services for commerce and industry of Gujarat since 2008.
          </motion.p>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We are a leading offset press in Ahmedabad. We’ve successfully
            executed complex jobs for our clients with timely delivery.
          </motion.p>
          <motion.a
            href="/contact"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 inline-block"
            whileHover={{ scale: 1.1 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </motion.div>

      <VisionSection
        title="Vision"
        description="We ensure quality stays high with a reliable workflow system from start to finish."
      />

      <JourneySection
        title="Journey"
        description="Started in 2012, we've made remarkable growth in the printing industry."
      />

      <div className="bg-gray-900 text-white py-8 px-4 font-poppins">
        <div className="grid md:grid-cols-4 gap-6">
          <MissionCard
            icon="🎯"
            title="Mission"
            description="Providing quality printing products and services to support businesses."
          />
          <MissionCard
            icon="⚙️"
            title="Quality Control"
            description="Maintaining the highest standards with timely delivery."
          />
          <MissionCard
            icon="🛠️"
            title="Integrity"
            description="We deliver with honesty, ethics and accountability."
          />
          <MissionCard
            icon="🚀"
            title="Innovation"
            description="We adapt and grow with new solutions that help our clients succeed."
          />
        </div>
      </div>

      <ServicesList />
    </div>
  );
};

export default About;
