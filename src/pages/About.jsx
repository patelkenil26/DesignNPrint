import React from "react";
import { motion } from "framer-motion";

export const services = [
  {
    id: "booklet-designing-printing",
    name: "Booklet Designing & Printing",
    link: "/services/booklet-designing-printing",
  },
  {
    id: "box-designing-printing",
    name: "Box Designing & Printing",
    link: "/services/box-designing-printing",
  },
  {
    id: "calendar",
    name: "Calendar",
    link: "/services/calendar",
  },
  {
    id: "certificate",
    name: "Certificate",
    link: "/services/certificate",
  },
  {
    id: "ceramic-mockup-design",
    name: "Ceramic Mockup Design",
    link: "/services/ceramic-mockup-design",
  },
  {
    id: "company-file-folder",
    name: "Company File & Folder",
    link: "/services/company-file-folder",
  },
  {
    id: "cosmetic-item-box-sticker-printing",
    name: "Cosmetic Item Box & Sticker Printing",
    link: "/services/cosmetic-item-box-sticker-printing",
  },
  {
    id: "cotton-pouch-designing-printing",
    name: "Cotton Pouch Designing & Printing",
    link: "/services/cotton-pouch-designing-printing",
  },
  {
    id: "customize-pouch-designing-printing",
    name: "Customize Pouch Designing & Printing",
    link: "/services/customize-pouch-designing-printing",
  },
  {
    id: "digital-visiting-card",
    name: "Digital Visiting Card",
    link: "/services/digital-visiting-card",
  },
  {
    id: "doctor-file",
    name: "Doctor File",
    link: "/services/doctor-file",
  },
  {
    id: "flex-banner-roller-standee-printing",
    name: "Flex Banner & Roller Standee Printing",
    link: "/services/flex-banner-roller-standee-printing",
  },
  {
    id: "laminates-mica-folder-designing-printing",
    name: "Laminates Mica Folder Designing & Printing",
    link: "/services/laminates-mica-folder-designing-printing",
  },
  {
    id: "pamphlet-design-printing",
    name: "Pamphlet Design & Printing",
    link: "/services/pamphlet-design-printing",
  },
  {
    id: "pharmaceutical-medicine-boxes",
    name: "Pharmaceutical Medicine Boxes",
    link: "/services/pharmaceutical-medicine-boxes",
  },
  {
    id: "product-catalogue",
    name: "Product Catalogue",
    link: "/services/product-catalogue",
  },
  {
    id: "pesticide-label-and-box",
    name: "Pesticide Label and Box",
    link: "/services/pesticide-label-and-box",
  },
  {
    id: "sticker-label-designing-printing",
    name: "Sticker & Label Designing & Printing",
    link: "/services/sticker-label-designing-printing",
  },
  {
    id: "visiting-card-letterhead-envelope",
    name: "Visiting Card, Letterhead, Envelope",
    link: "/services/visiting-card-letterhead-envelope",
  },
];


const HeroSection = ({ title, imageUrl }) => {
  return (
    <motion.div
      className="bg-cover bg-center h-[300px] flex items-center justify-center text-white font-poppins"
      style={{ backgroundImage: `url(${imageUrl})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {title}
      </motion.h1>
    </motion.div>
  );
};

const Breadcrumb = ({ paths }) => {
  return (
    <motion.div
      className="my-4 px-4 text-sm text-gray-600 font-poppins"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {paths.map((path, index) => (
        <span key={index}>
          {path.link ? (
            <a href={path.link} className="text-blue-500 hover:underline">
              {path.name}
            </a>
          ) : (
            <span>{path.name}</span>
          )}
          {index < paths.length - 1 && " › "}
        </span>
      ))}
    </motion.div>
  );
};

const VisionSection = ({ title, description }) => {
  return (
    <motion.div
      className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 mx-4 my-6 font-poppins"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

const JourneySection = ({ title, description }) => {
  return (
    <motion.div
      className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 mx-4 my-6 font-poppins"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-800 font-semibold">{description}</p>
    </motion.div>
  );
};

const MissionCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="text-center p-4 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 font-poppins"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-yellow-400 text-3xl mb-2">{icon}</div>
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm mt-2">{description}</p>
    </motion.div>
  );
};

const About = () => {
  const breadcrumbPaths = [{ name: "Home", link: "#" }, { name: "About Us" }];

  return (
    <div className="font-poppins">
      {/* Hero Section */}
      <HeroSection
        title="About Us"
        imageUrl="https://img.freepik.com/premium-vector/vector-flat-people-business-teamwork-illustration-flat-illustration_787500-10481.jpg?w=1060"
      />

      {/* Breadcrumb */}
      <Breadcrumb paths={breadcrumbPaths} />

      {/* Content Section */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 px-4 my-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <img
            src="https://img.freepik.com/free-vector/organic-printing-industry_23-2148904373.jpg?t=st=1737808878~exp=1737812478~hmac=0f684c6c574569701f14f1e5e707d8b221ee4fb586daffa1db7064a501e69ff4&w=1060"
            alt="About Us"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>

        {/* Text */}
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
            supporting services for the commerce and industry of Gujarat since
            2008.
          </motion.p>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We are a leading offset press situated in Ahmedabad. During this
            period we have successfully executed complex printing jobs to the
            delight of our customers. We understand the importance of time in
            today's competitive markets.
          </motion.p>
          <motion.a
            href="#"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 inline-block"
            whileHover={{ scale: 1.1 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </motion.div>

      {/* Vision Section */}
      <VisionSection
        title="Vision"
        description="We don’t forget about the last check for the quality. Our reliable process and workflow management ensure that the quality remains high all the time."
      />

      {/* Journey Section */}
      <JourneySection
        title="Journey"
        description="We started our journey in the year 2012 yet made a huge progress and have conquered an enormous market share."
      />

      {/* Mission and Services Section */}
      <div className="bg-gray-900 text-white py-8 px-4 font-poppins">
        <div className="grid md:grid-cols-4 gap-6">
          <MissionCard
            icon="🎯"
            title="Mission"
            description="Providing quality printing products and services to support our customers to grow their business through teamwork and innovation."
          />
          <MissionCard
            icon="⚙️"
            title="Quality Control"
            description="Ensuring every print meets the highest standards with a focus on customer satisfaction and timely delivery."
          />
          <MissionCard
            icon="🛠️"
            title="Integrity"
            description="Committed to customers and accountability for our actions with honesty and ethics."
          />
          <MissionCard
            icon="🚀"
            title="Innovation"
            description="Continuously growing by understanding customer needs and offering new solutions to ensure success."
          />
        </div>
      </div>

      {/* Services Section */}
      <motion.div
        className="py-8 px-4 font-poppins"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-center mb-6">Services</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-lg text-gray-600">
          {services.map((service) => (
            <div key={service.id} className="flex items-start gap-2">
              <span className="text-blue-500">+</span>
              <a
                href={service.link}
                className="text-blue-500 hover:underline"
              >
                {service.name}
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
