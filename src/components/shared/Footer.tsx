import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FooterOpenStatus from "@/components/shared/Footer/FooterOpenStatus";
import FooterWordmark from "@/components/shared/Footer/FooterWordmark";
import { productCatalog } from "@/data/productCatalog";
import { buildWhatsAppLink, siteConfig } from "@/data/siteConfig";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All products", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Start a job ticket", href: "/contact#job-ticket" },
];

const socialLinks = [
  { href: siteConfig.facebookUrl, label: "Facebook", icon: <FaFacebookF size={16} /> },
  { href: siteConfig.instagramUrl, label: "Instagram", icon: <FaInstagram size={16} /> },
  { href: buildWhatsAppLink("Hi Design N Print"), label: "WhatsApp", icon: <FaWhatsapp size={16} /> },
];

const footerLinkClasses =
  "inline-block transition-all duration-300 hover:translate-x-1 hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow";

const footerHeadingClasses = "mb-5 text-sm font-semibold uppercase tracking-widest text-white";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-ink font-poppins text-white" aria-label="Site footer">
      <span className="cmyk-strip block h-1.5 w-full" aria-hidden="true" />

      {/* closing call-to-action */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 pb-2 pt-12 sm:px-10">
        <p className="max-w-xl font-display text-2xl font-bold leading-tight sm:text-3xl">
          Have a job in mind? <span className="text-brand-yellow">Tell us — we reply the same day.</span>
        </p>
        <Link
          href="/contact#job-ticket"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Start a job ticket
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.2fr_0.8fr_1.4fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="Design N Print — home" className="relative mb-5 block h-12 w-40">
            <Image src="/images/Logo/DesignNPrint.png" alt="Design N Print" fill sizes="160px" className="object-contain object-left" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Fine-quality printing and packaging for commerce and industry in Gujarat — since {siteConfig.foundedYear}. A reliable
            workflow keeps the quality high, every time.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Design N Print on ${social.label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-yellow hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <h2 className={footerHeadingClasses}>Explore</h2>
          <ul className="space-y-3 text-sm text-white/60">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Products */}
        <nav aria-label="Products">
          <h2 className={footerHeadingClasses}>What we print</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/60">
            {productCatalog.map((product) => (
              <li key={product.slug}>
                <Link href={`/services/${product.slug}`} className={footerLinkClasses}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className={footerHeadingClasses}>Visit & contact</h2>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <a
                href={siteConfig.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-brand-yellow"
              >
                <address className="not-italic leading-relaxed">
                  {siteConfig.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <span className="flex flex-col">
                <a href={`tel:+${siteConfig.whatsappNumber}`} className="transition-colors duration-300 hover:text-brand-yellow">
                  {siteConfig.phoneDisplay}
                </a>
                <a href={`tel:+${siteConfig.secondaryPhoneNumber}`} className="transition-colors duration-300 hover:text-brand-yellow">
                  {siteConfig.secondaryPhoneDisplay}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <a href={`mailto:${siteConfig.email}`} className="break-all transition-colors duration-300 hover:text-brand-yellow">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
              <div>
                <dl className="space-y-0.5">
                  {siteConfig.workingHours.map((slot) => (
                    <div key={slot.label} className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-white/80">{slot.label}</dt>
                      <dd>{slot.value}</dd>
                    </div>
                  ))}
                </dl>
                <FooterOpenStatus />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* oversized CMYK wordmark */}
      <FooterWordmark />

      <div className="relative border-t border-white/10 px-5 pb-24 pt-6 text-center text-sm text-white/50 sm:pb-6">
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/privacy-policy" className={footerLinkClasses}>
            Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms" className={footerLinkClasses}>
            Terms &amp; Conditions
          </Link>
        </p>
        <p className="mt-3">
          Copyright © {new Date().getFullYear()} Design N Print. All Rights Reserved | Designed by{" "}
          <span className="text-brand-yellow">KENIL IT Solution</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
