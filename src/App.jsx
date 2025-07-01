import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";

function App() {
  return (
    <Router>
      <PageLoader />
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
