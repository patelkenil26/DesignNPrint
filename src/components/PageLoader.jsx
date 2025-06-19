// src/components/PageLoader.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Optional: Customize style
NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const PageLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500); // minimum duration

    return () => clearTimeout(timeout);
  }, [location]);

  return null; // This renders nothing visually
};

export default PageLoader;
