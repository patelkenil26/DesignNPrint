// import React, { useState } from "react";
// import { FaCheckCircle, FaBullhorn, FaLightbulb, FaHandshake } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";

// const services = [
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-11-1.png",
//     title: "Digital Visiting Card",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-12-1.png",
//     title: "Visiting Card, Letterhead, Envelope",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/niketart_product_6_pamphlet.jpg",
//     title: "Pamphlet Design & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-5.png",
//     title: "Brochure Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/03/niketart_product_14_catalogue.jpg",
//     title: "Product Catalogue",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-mica-designing.png",
//     title: "Laminates Mica Folder Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/vision-img-gallery-1.png",
//     title: "Box Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/niketart_product_6_pharma-box.jpg",
//     title: "Pharmaceutical Medicine Boxes",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-1.png",
//     title: "Sticker & Label Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/03/niketart_product_5_booklet.jpg",
//     title: "Booklet Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/03/niketart_product_10_pouch.jpg",
//     title: "Cotton Pouch Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-9.png",
//     title: "Customize Pouch Designing & Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/03/niketart_product_11_file_folder.jpg",
//     title: "Company File & Folder",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-13-1.jpg",
//     title: "Doctor File",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-3.png",
//     title: "Calendar",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-6.png",
//     title: "Certificate",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-8.png",
//     title: "Ceramic Mockup Design",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/design-n-print-product-10.png",
//     title: "Cosmetic Item Box & Sticker Printing",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/03/niketart_product_7_box_printing_pesticide.jpg",
//     title: "Pesticide Label and Box",
//   },
//   {
//     image: "https://dizname.in/wp-content/uploads/2021/09/vision-img-gallery-14.png",
//     title: "Flex Banner & Roller Standee Printing",
//   },
// ];

// const ServicesSection = () => {
//   const [modalIndex, setModalIndex] = useState(null);
//   const openModal = (index) => setModalIndex(index);
//   const closeModal = () => setModalIndex(null);
//   const prevImage = () => setModalIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
//   const nextImage = () => setModalIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));

//   return (
//     <div className="font-poppins">
//       {/* Core Values */}
//       <section className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//           {[
//             {
//               icon: <FaCheckCircle className="text-blue-500 text-4xl" />,
//               title: "Quality Control",
//               description: "Top-notch quality with timely delivery and trusted customer service.",
//             },
//             {
//               icon: <FaBullhorn className="text-green-500 text-4xl" />,
//               title: "Mission",
//               description: "To deliver impactful and professional printing solutions.",
//             },
//             {
//               icon: <FaLightbulb className="text-yellow-500 text-4xl" />,
//               title: "Innovation",
//               description: "Adapting to latest trends and customer needs every day.",
//             },
//             {
//               icon: <FaHandshake className="text-red-500 text-4xl" />,
//               title: "Integrity",
//               description: "Committed to transparency and ethical business values.",
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={item.title}
//               className="text-center"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <div className="mb-4">{item.icon}</div>
//               <h3 className="text-xl font-bold">{item.title}</h3>
//               <p className="mt-2 text-sm">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {services.map((card, index) => (
//               <motion.div
//                 key={card.title}
//                 className="border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//                 whileHover={{ scale: 1.05 }}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 onClick={() => openModal(index)}
//               >
//                 <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
//                 <div className="p-4 text-center">
//                   <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
//                     {card.title}
//                   </h3>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Modal Viewer */}
//       <AnimatePresence>
//   {modalIndex !== null && (
//     <motion.div
//       className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={closeModal} // 👈 Background click will close modal
//     >
//       <div
//         className="relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()} // 👈 Stop modal content click from closing
//       >
//         <button
//           onClick={closeModal}
//           className="absolute top-2 right-2 text-black hover:text-red-500 bg-white rounded-full p-1 text-3xl z-50"
//         >
//           <IoIosClose />
//         </button>
//         <button
//           onClick={prevImage}
//           className="absolute left-2 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-1 text-3xl z-50"
//         >
//           <IoIosArrowBack />
//         </button>
//         <img
//           src={services[modalIndex].image}
//           alt={services[modalIndex].title}
//           className="w-full max-h-[70vh] object-contain"
//         />
//         <button
//           onClick={nextImage}
//           className="absolute right-2 top-1/2 -translate-y-1/2 text-black bg-white rounded-full p-1 text-3xl z-50"
//         >
//           <IoIosArrowForward />
//         </button>
//         <h2 className="text-center text-xl font-semibold text-black py-4">
//           {services[modalIndex].title}
//         </h2>
//       </div>
//     </motion.div>
//   )}
// </AnimatePresence>

//     </div>
//   );
// };

// export default ServicesSection;
