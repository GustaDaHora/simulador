"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const FirstPage: React.FC<{ 
  onSimulate?: (bill: number) => void;
  isFormOpen?: boolean; // Add this prop to track form state
}> = ({
  onSimulate,
  isFormOpen = false,
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

  // Check if we're on mobile (you can adjust this breakpoint)
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only handle mouse movement on desktop and when form is not open
  const shouldHandleMouseMovement = !isMobile && !isFormOpen;

  // Handles mouse movement to detect direction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shouldHandleMouseMovement) return;
    
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
    if (!shouldHandleMouseMovement) return;
    
    setHideBg(true); // Now hide elements on enter
    lastY.current = e.clientY;
  };

  // Reset lastY when mouse leaves
  const handleMouseLeave = () => {
    if (!shouldHandleMouseMovement) return;
    
    setHideBg(false); // Now show elements on leave
    lastY.current = null;
  };

  // Determine which CSS classes to apply
  const getImageClasses = (baseClass: string) => {
    let classes = baseClass;
    
    // Add mouse movement animation class (only on desktop when form is closed)
    if (shouldHandleMouseMovement && hideBg) {
      classes += " hide-bg-anim";
    }
    
    // Add form blur animation class (when form is open)
    if (isFormOpen) {
      classes += " form-blur-anim";
    }
    
    return classes;
  };

  return (
    <section
      className="first-page"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Image
        className={getImageClasses("circle")}
        src="/simulador/circle.svg"
        alt="Círculo ilustrativo"
        width={600}
        height={600}
        priority
      />
      <Image
        className={getImageClasses("casa1")}
        src="/simulador/casas.png"
        alt="Casa ilustrativa"
        width={450}
        height={850}
        priority
      />
      <Image
        className={getImageClasses("casa3")}
        src="/simulador/casa3.png"
        alt="Casa ilustrativa"
        width={350}
        height={350}
        priority
      />
      <Image
        className={getImageClasses("cloud2")}
        src="/simulador/cloud2.svg"
        alt="Nuvem ilustrativa"
        width={80}
        height={70}
        priority
      />
      <Image
        className={getImageClasses("cloud3")}
        src="/simulador/cloud3.svg"
        alt="Nuvem ilustrativa"
        width={90}
        height={60}
        priority
      />
      <Image
        className={getImageClasses("cloud4")}
        src="/simulador/cloud4.png"
        alt="Nuvem ilustrativa"
        width={300}
        height={100}
        priority
      />
      <Image
        className={getImageClasses("fundo")}
        src="/simulador/fundo.png"
        alt="Fundo ilustrativo"
        width={500}
        height={300}
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