"use client"
import React, { useState } from "react";
import Header from "../components/Header";
import FirstPage from "../components/FirstPage";
import Form from "../components/Form";
import Footer from "../components/Footer";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [prefillBill, setPrefillBill] = useState<number | null>(null);

  const handleSimulate = (bill: number) => {
    setPrefillBill(bill);
    setShowForm(true);
    console.log(showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Header />
      <FirstPage onSimulate={handleSimulate} />
      {showForm && (
        <div className="modal-form-bg">
          <Form initialBill={prefillBill ?? undefined} onClose={handleCloseForm} />
        </div>
      )}
      <Footer />
    </div>
  );
}
