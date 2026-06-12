import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { ScrollTrigger } from "@/lib/gsap";
import { ToastProvider } from "@/lib/toast";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ConsultationProvider } from "@/components/ConsultationModal";
import Home from "@/pages/Home";
import ServicesPage from "@/pages/Services";
import ProductsPage from "@/pages/Products";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import AdminConsultations from "@/pages/AdminConsultations";
import NotFound from "@/pages/NotFound";

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(
    () => sessionStorage.getItem("mbp-intro-played") === "1"
  );

  const handleDone = () => {
    sessionStorage.setItem("mbp-intro-played", "1");
    setLoaded(true);
  };

  return (
    <ToastProvider>
      <BrowserRouter>
        <ConsultationProvider>
          <div className="grain" />
          <SmoothScroll />
          <Cursor />
          {!loaded && <Preloader onDone={handleDone} />}
          <ScrollReset />
          <Routes>
            <Route path="/" element={<Home ready={loaded} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin/consultations" element={<AdminConsultations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConsultationProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}
