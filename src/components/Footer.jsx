import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import logo from "../images/Logo/DesignNPrint.png";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-10 font-poppins">
      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* About Section */}
        <div>
          <img
            src={logo}
            alt="Company Logo"
            className="mb-4 w-32 mx-auto lg:mx-0"
          />
          <p className="text-sm mb-2">
            Design N Print is a professional Printing Company in Ahmedabad,
            India, specialized in fine-quality printing and supporting services
            for commerce and industry of Gujarat since 1982.
          </p>
          <p className="text-sm">
            We don't forget about the last check for the quality. Our reliable
            process and workflow management ensures that the quality remains
            high all the time.
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-yellow-500 hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-yellow-500 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/services/booklet-designing-printing" className="text-yellow-500 hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-yellow-500 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">Modern Multi Print</p>
          <p className="text-sm">
            Behind Hotel Satluj, N.H No 8, Opposite Bhagat Petrol, Naroda,
            Ahmedabad 382446, India
          </p>
          <p className="text-sm mt-2" itemType="phone">
            +91 7048501999, +91 9824991999
          </p>
          <p className="text-sm mt-2" typeof="email">
            work.modernprinters@gmail.com
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center lg:justify-start space-x-6">
            <a
              href="https://www.facebook.com/share/19FYcyioTy/?mibextid=qi2Omg"
              className="text-yellow-500 hover:text-yellow-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="https://www.instagram.com/designnprints.in?igsh=MWRqaWNmNmFoYjZ0bw=="
              className="text-yellow-500 hover:text-yellow-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle size={20} />
            </a>
            <a
              href="#"
              className="text-yellow-500 hover:text-yellow-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center px-4">
        <p className="text-sm">
          Copyright © 2025 Modern Multi Print. All Rights Reserved | Designed By{" "}
          <a
            href="#"
            className="text-yellow-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            KENIL IT Solution
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Footer;
