import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ServiceDetails from "./components/ServiceTemplate";
import Footer from "./components/Footer";

import CalendarPrinting from "./pages/Services/CalendarPrinting";
import DigitalVisitingCard from "./pages/Services/DigitalVisitingCard";
import VisitingCardLetterheadEnvelope from "./pages/Services/VisitingCardLetterheadEnvelope";
import PamphletDesignPrinting from "./pages/Services/PamphletDesignPrinting";
import BrochureDesigningPrinting from "./pages/Services/BrochureDesigningPrinting";
import ProductCatalogue from "./pages/Services/ProductCatalogue";
import MicaFolderPrinting from "./pages/Services/MicaFolderPrinting";
import BoxDesignPrinting from "./pages/Services/BoxDesignPrinting";
import PharmaBox from "./pages/Services/PharmaBox";
import StickerLabelPrinting from "./pages/Services/StickerLabelPrinting";
import BookletDesign from "./pages/Services/BookletDesign";
import CottonPouch from "./pages/Services/CottonPouch";
import CustomPouch from "./pages/Services/CustomPouch";
import CompanyFileFolder from "./pages/Services/CompanyFileFolder";
import DoctorFile from "./pages/Services/DoctorFile";
import Certificate from "./pages/Services/Certificate";
import CeramicMockup from "./pages/Services/CeramicMockup";
import CosmeticBoxSticker from "./pages/Services/CosmeticBoxSticker";
import PesticideBoxLabel from "./pages/Services/PesticideBoxLabel";
import FlexBannerStandee from "./pages/Services/FlexBannerStandee";
import ScrollToTopButton from "./components/ScrollToTopButton";
import PageLoader from "./components/PageLoader";

const serviceRoutes = [
  { path: "/services/calendar", element: <CalendarPrinting /> },
  { path: "/services/digital-visiting-card", element: <DigitalVisitingCard /> },
  { path: "/services/visiting-card-letterhead-envelope", element: <VisitingCardLetterheadEnvelope /> },
  { path: "/services/pamphlet-design-printing", element: <PamphletDesignPrinting /> },
  { path: "/services/brochure-designing-printing", element: <BrochureDesigningPrinting /> },
  { path: "/services/product-catalogue", element: <ProductCatalogue /> },
  { path: "/services/laminates-mica-folder-designing-printing", element: <MicaFolderPrinting /> },
  { path: "/services/box-designing-printing", element: <BoxDesignPrinting /> },
  { path: "/services/pharmaceutical-medicine-boxes", element: <PharmaBox /> },
  { path: "/services/sticker-label-designing-printing", element: <StickerLabelPrinting /> },
  { path: "/services/booklet-designing-printing", element: <BookletDesign /> },
  { path: "/services/cotton-pouch-designing-printing", element: <CottonPouch /> },
  { path: "/services/customize-pouch-designing-printing", element: <CustomPouch /> },
  { path: "/services/company-file-folder", element: <CompanyFileFolder /> },
  { path: "/services/doctor-file", element: <DoctorFile /> },
  { path: "/services/certificate", element: <Certificate /> },
  { path: "/services/ceramic-mockup-design", element: <CeramicMockup /> },
  { path: "/services/cosmetic-item-box-sticker-printing", element: <CosmeticBoxSticker /> },
  { path: "/services/pesticide-label-and-box", element: <PesticideBoxLabel /> },
  { path: "/services/flex-banner-roller-standee-printing", element: <FlexBannerStandee /> },
];

function App() {
  return (
    <Router>
        <PageLoader /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Optional dynamic route */}
        <Route path="/services/:id" element={<ServiceDetails />} />

        {/* All service routes mapped */}
        {serviceRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
      <ScrollToTopButton/>
    </Router>
  );
}

export default App;
