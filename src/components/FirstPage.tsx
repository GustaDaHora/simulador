"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const FirstPage: React.FC<{ onSimulate?: (bill: number) => void }> = ({
  onSimulate,
}) => {
  const [electricityBill, setElectricityBill] = useState(100);
  const [hideBg, setHideBg] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const lastY = useRef<number | null>(null);

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

  // Handles mouse movement to detect direction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (lastY.current !== null) {
      if (e.clientY < lastY.current) {
        setHideBg(false); // Mouse moving up: now show elements
      } else if (e.clientY > lastY.current) {
        setHideBg(true); // Mouse moving down: now hide elements
      }
    }
    lastY.current = e.clientY;
  };

  // Trigger animation on mouse enter as well
  const handleMouseEnter = (e: React.MouseEvent) => {
    setHideBg(true); // Now hide elements on enter
    lastY.current = e.clientY;
  };

  // Reset lastY when mouse leaves
  const handleMouseLeave = () => {
    setHideBg(false); // Now show elements on leave
    lastY.current = null;
  };

  return (
    <section
      className="first-page"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Image
        className={`circle${hideBg ? ' hide-bg-anim' : ''}`}
        src="/simulador/circle.svg"
        alt="Círculo ilustrativo"
        width={600}
        height={600}
        priority
      />
      <Image
        className="casa1"
        src="/simulador/casa1.png"
        alt="Casa ilustrativa"
        width={400}
        height={300}
        priority
      />
      <Image
        className={`cloud2${hideBg ? ' hide-bg-anim' : ''}`}
        src="/simulador/cloud2.svg"
        alt="Nuvem ilustrativa"
        width={90}
        height={60}
        priority
      />
      <Image
        className={`cloud3${hideBg ? ' hide-bg-anim' : ''}`}
        src="/simulador/cloud3.svg"
        alt="Nuvem ilustrativa"
        width={90}
        height={60}
        priority
      />
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
    </section>
  );
};

export default FirstPage;
