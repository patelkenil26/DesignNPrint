// components/navbar/Logo.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="hover:text-yellow-500 transition-all hover:scale-105">
      <div className="relative w-36 sm:w-44 h-12">
        <Image src="/images/Logo/DesignNPrint.png" alt="Logo" fill className="object-contain" />
      </div>
    </Link>
  );
};

export default Logo;
