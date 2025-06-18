"use client";
import React, { useState, useRef } from "react";
import Header from "../components/Header";
import FirstPage from "../components/FirstPage";
import Form from "../components/Form";
import Footer from "../components/Footer";
import SecondPage from "@/components/SecondPage";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [prefillBill, setPrefillBill] = useState<number | null>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const mainContent = mainContentRef.current;
    
    if (showForm) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      mainContent?.classList.add("blurred-bg");
      body.classList.add("form-open");
      html.classList.add("form-open");
      
      // Apply scroll position as negative top margin to prevent jump
      body.style.top = `-${scrollY}px`;
      body.style.position = 'fixed';
      body.style.width = '100%';
    } else {
      // Get the scroll position from the top style
      const scrollY = parseInt(body.style.top || '0') * -1;
      
      mainContent?.classList.remove("blurred-bg");
      body.classList.remove("form-open");
      html.classList.remove("form-open");
      
      // Reset body styles
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    }
    
    // Cleanup on unmount
    return () => {
      mainContent?.classList.remove("blurred-bg");
      body.classList.remove("form-open");
      html.classList.remove("form-open");
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
    };
  }, [showForm]);

  const handleSimulate = (bill: number) => {
    setPrefillBill(bill);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm && (
        <div className="modal-form-bg">
          <Form
            initialBill={prefillBill ?? undefined}
            onClose={handleCloseForm}
          />
        </div>
      )}
      
      {/* Main content wrapper with ref */}
      <div ref={mainContentRef} className="main-content">
        <Header />
        <FirstPage onSimulate={handleSimulate} />
        {/* <SecondPage /> */}
        <Footer />
      </div>
    </div>
  );
}