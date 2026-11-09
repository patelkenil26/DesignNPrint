import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { productCatalog } from "@/data/productCatalog";
import { buildWhatsAppLink, siteConfig } from "@/data/siteConfig";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All products", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const footerLinkClasses = "transition-colors duration-300 hover:text-brand-yellow";

const Footer = () => {
  return (
    <footer className="bg-ink text-white font-poppins">
      <span className="cmyk-strip block h-1.5 w-full" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <div className="relative mb-5 h-12 w-40">
            <Image src="/images/Logo/DesignNPrint.png" alt="Design N Print logo" fill className="object-contain object-left" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Fine-quality printing and packaging for commerce and industry in Gujarat — since {siteConfig.foundedYear}.
            A reliable workflow keeps the quality high, every time.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: siteConfig.facebookUrl, label: "Facebook", icon: <FaFacebookF size={16} /> },
              { href: siteConfig.instagramUrl, label: "Instagram", icon: <FaInstagram size={16} /> },
              { href: buildWhatsAppLink("Hi Design N Print"), label: "WhatsApp", icon: <FaWhatsapp size={16} /> },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-yellow hover:text-brand-yellow"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">Explore</h3>
          <ul className="space-y-3 text-sm text-white/60">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">What we print</h3>
          <ul className="space-y-3 text-sm text-white/60">
            {productCatalog.slice(0, 8).map((product) => (
              <li key={product.slug}>
                <Link href={`/services/${product.slug}`} className={footerLinkClasses}>
                  {product.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services" className={footerLinkClasses}>
                All {productCatalog.length} products →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">Contact us</h3>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <span>{siteConfig.addressLines.join(" ")}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <span className="flex flex-col">
                <a href={`tel:+${siteConfig.whatsappNumber}`} className={footerLinkClasses}>
                  {siteConfig.phoneDisplay}
                </a>
                <a href={`tel:+${siteConfig.secondaryPhoneNumber}`} className={footerLinkClasses}>
                  {siteConfig.secondaryPhoneDisplay}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <a href={`mailto:${siteConfig.email}`} className={`${footerLinkClasses} break-all`}>
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-white/50">
        <p>
          Copyright © {new Date().getFullYear()} Design N Print. All Rights Reserved | Designed by{" "}
          <Link href="/" className="text-brand-yellow hover:underline">
            KENIL IT Solution
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
