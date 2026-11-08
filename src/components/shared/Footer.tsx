import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        {/* Company Section */}
        <div className="col-span-full sm:col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="relative w-36 h-12 mb-6">
            <Image 
              src="/images/Logo/DesignNPrint.png" 
              alt="Design N Print Logo" 
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-400 mb-3 leading-relaxed">
            Design N Prints is specialized in fine-quality printing and
            supporting services for the commerce and industry of Gujarat since
            2008.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Our reliable workflow ensures that the quality remains high at all
            times.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-center sm:text-left">
          <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-5">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services/booklet-designing-printing"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center sm:text-left">
          <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-5">
            Contact Us
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <p className="font-semibold text-gray-400">DESIGN N PRINT</p>
            <p>
              Modern Corner, opp. National Handloom Street, nr. J.R.Amin Petrol
              Pump, Naroda, Ahmedabad, Gujarat 382330
            </p>
            <p>
              <a
                href="tel:+919725281074"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                +91 9725281074
              </a>
            </p>
            <p>
              <a
                href="tel:+919913290354"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                +91 9913290354
              </a>
            </p>
            <p>
              <a
                href="mailto:designnprintsamd@gmail.com"
                className="hover:text-yellow-500 transition-colors duration-300"
              >
                designnprintsamd@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-5">
            Follow Us
          </h3>
          <div className="flex justify-center sm:justify-start space-x-6">
            <a
              href="https://www.facebook.com/share/19FYcyioTy/?mibextid=qi2Omg"
              className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/designnprints.in?igsh=MWRqaWNmNmFoYjZ0bw=="
              className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://wa.me/919725281074"
              className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        <p>
          Copyright © {new Date().getFullYear()} Design N Print. All Rights Reserved | Designed by{" "}
          <Link
            href="/"
            className="text-yellow-500 hover:underline transition-colors duration-300"
          >
            KENIL IT Solution
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
