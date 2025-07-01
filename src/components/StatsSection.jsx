import React from "react";
import { FaUsers, FaBoxOpen, FaHandshake, FaAward } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={40} />, // bigger icon
    label: "Team Members",
    value: "30+",
  },
  {
    icon: <FaAward size={40} />,
    label: "Years of Experience",
    value: "15+",
  },
  {
    icon: <FaBoxOpen size={40} />,
    label: "Products Delivered",
    value: "120+",
  },
  {
    icon: <FaHandshake size={40} />,
    label: "Clients Served",
    value: "200+",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 flex justify-center items-center flex-col rounded-2xl p-6 shadow-lg text-center hover:shadow-2xl transition-all"
            >
              <div className="flex justify-center items-center mb-2 text-yellow-500">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p className="text-sm sm:text-xl text-gray-700 dark:text-gray-300 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
