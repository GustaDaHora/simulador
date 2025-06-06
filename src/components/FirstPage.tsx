"use client"
import React, { useState, useRef } from "react";
import Image from "next/image";

const FirstPage: React.FC<{ onSimulate?: (bill: number) => void }> = ({
  onSimulate,
}) => {
  const [electricityBill, setElectricityBill] = useState(100);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Slider color animation
  const updateSliderBackground = (val: number) => {
    const min = 100;
    const max = 1000;
    const percentage = ((val - min) / (max - min)) * 100;
    if (sliderRef.current) {
      sliderRef.current.style.background = `linear-gradient(to right, #28a745 0%, #28a745 ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;
    }
  };

  // Sync slider and input
  const handleBillChange = (value: number) => {
    const v = Math.max(100, Math.min(1000, value));
    setElectricityBill(v);
    updateSliderBackground(v);
  };

  // Initialize slider background on mount and when electricityBill changes
  React.useEffect(() => {
    updateSliderBackground(electricityBill);
  }, [electricityBill]);

  const handleSimulate = () => {
    if (onSimulate) onSimulate(electricityBill);
  };

  return (
    <section className="first-page">
      <div className="main-div">
        <div className="text-container">
          <p>Synergy</p>
          <h1>Energia solar na ponta dos seus dedos</h1>
          <p>
            Calcule a economia potencial na sua conta de luz, utilizando nossa
            calculadora
          </p>
        </div>
        <div className="form-container">
          <div className="main-slider-container">
            <p>Gasto médio mensal de energia</p>
            <input
              type="range"
              id="form-electricity-slider2"
              className="main-slider"
              min={100}
              max={1000}
              step={10}
              value={electricityBill}
              ref={sliderRef}
              onChange={(e) => handleBillChange(Number(e.target.value))}
            />
          </div>
          <div className="input-group">
            <div className="main-manual-input">
              <span>R$</span>
              <input
                type="number"
                id="form-electricity-input2"
                min={100}
                max={1000}
                step={10}
                value={electricityBill}
                onChange={(e) => handleBillChange(Number(e.target.value))}
                required
                autoComplete="off"
                className="main-manual-input-field"
              />
            </div>
            <button className="btn-open-form" onClick={handleSimulate}>
              Simular Economia
            </button>
          </div>
        </div>
      </div>
      <Image
        className="casa1"
        src="/simulador/casa1.png"
        alt="Casa ilustrativa"
        width={400}
        height={300}
        priority
      />
    </section>
  );
};

export default FirstPage;
