import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Design N Print — home"
      className="shrink-0 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
    >
      <div className="relative h-12 w-36 sm:w-44">
        <Image src="/images/Logo/DesignNPrint.png" alt="Design N Print" fill priority sizes="176px" className="object-contain object-left" />
      </div>
    </Link>
  );
};

export default Logo;
