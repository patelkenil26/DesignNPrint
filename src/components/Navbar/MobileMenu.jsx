// components/navbar/MobileMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "../../data/servicesData";

const MobileMenu = ({ isOpen, toggle, serviceOpen, toggleServices }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="lg:hidden bg-gray-700 px-4 py-4 shadow-inner"
        >
          <ul className="flex flex-col gap-5 text-base font-medium">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={toggle}
                  className="block hover:text-yellow-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Services Toggle */}
            <li>
              <span
                className="block font-semibold text-white cursor-pointer"
                onClick={toggleServices}
              >
                Services {serviceOpen ? "▲" : "▼"}
              </span>

              <AnimatePresence>
                {serviceOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="columns-2 gap-4 mt-6"
                  >
                    {services.map((service) => (
                      <li key={service.id} className="break-inside-avoid mb-4">
                        <Link
                          to={`/services/${service.id}`}
                          onClick={() => {
                            toggle();
                            toggleServices();
                          }}
                          className="block text-sm text-gray-300 hover:text-yellow-500"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
