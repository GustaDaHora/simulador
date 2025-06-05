"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

const brazilianCities = [
  "São Paulo",
  "Rio de Janeiro",
  "Brasília",
  "Salvador",
  "Fortaleza",
  "Belo Horizonte",
  "Manaus",
  "Curitiba",
  "Recife",
  "Goiânia",
  "Belém",
  "Porto Alegre",
  "Guarulhos",
  "Campinas",
  "São Luís",
  "São Gonçalo",
  "Maceió",
  "Duque de Caxias",
  "Natal",
  "Cuiabá",
  "Campo Grande",
  "Teresina",
  "São Bernardo do Campo",
  "Nova Iguaçu",
  "João Pessoa",
  "Santo André",
  "São José dos Campos",
  "Jaboatão dos Guararapes",
  "Osasco",
  "Ribeirão Preto",
  "Uberlândia",
  "Sorocaba",
  "Contagem",
  "Aracaju",
  "Feira de Santana",
  "Joinville",
  "Juiz de Fora",
  "Londrina",
  "Aparecida de Goiânia",
  "Ananindeua",
  "Barra do Bugres",
  "Várzea Grande",
  "Rondonópolis",
  "Sinop",
  "Tangará da Serra",
  "Cáceres",
  "Lucas do Rio Verde",
  "Primavera do Leste",
];

function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

function calculateResults({
  electricityBill,
  installationType,
}: {
  electricityBill: number;
  installationType: string;
}) {
  let multiplier = 1;
  switch (installationType) {
    case "business":
      multiplier = 1.2;
      break;
    case "industry":
      multiplier = 1.5;
      break;
    case "rural":
      multiplier = 0.9;
      break;
    default:
      multiplier = 1;
  }
  const bill = electricityBill;
  const kwhPerMonth = (bill / 0.85) * multiplier;
  const systemPowerKw = Math.ceil(kwhPerMonth / 130);
  const panelCountCalc = Math.ceil(systemPowerKw / 0.55);
  const costPerKw = 2000 * multiplier;
  const totalSystemCost = systemPowerKw * costPerKw;
  const discountPercent = 15;
  const finalCost = totalSystemCost * (1 - discountPercent / 100);
  const monthlyPaymentCalc = finalCost / 60;
  const savings = bill - monthlyPaymentCalc;
  let inverterText = "1x WEG SIW200G M050";
  if (systemPowerKw > 10) {
    inverterText = "2x WEG SIW200G M050";
  } else if (systemPowerKw > 15) {
    inverterText = "1x WEG SIW400G M100";
  }
  return {
    currentBill: bill,
    monthlyPayment: monthlyPaymentCalc,
    monthlySavings: Math.max(0, savings),
    totalCost: finalCost,
    monthlyGeneration: Math.round(kwhPerMonth),
    systemPower: systemPowerKw,
    panelCount: panelCountCalc,
    inverterModel: inverterText,
    discount: discountPercent,
    installmentAmount: monthlyPaymentCalc,
  };
}

// Define a type for the results object
interface SimulationResults {
  currentBill: number;
  monthlyPayment: number;
  monthlySavings: number;
  totalCost: number;
  monthlyGeneration: number;
  systemPower: number;
  panelCount: number;
  inverterModel: string;
  discount: number;
  installmentAmount: number;
  fullName: string;
  city: string;
  electricityBill: number;
  installationType: string;
  email: string;
  phone: string;
}

const Form: React.FC<{ initialBill?: number; onClose?: () => void }> = ({
  initialBill = 100,
  onClose,
}) => {
  const [electricityBill, setElectricityBill] = useState(initialBill);
  const [installationType, setInstallationType] = useState("residence");
  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const citySuggestionsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  // City autocomplete
  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setCity(e.target.value);
    if (query.length > 1) {
      const suggestions = brazilianCities
        .filter((c) => c.toLowerCase().includes(query))
        .slice(0, 5);
      setCitySuggestions(suggestions);
    } else {
      setCitySuggestions([]);
    }
  };
  const selectCity = (city: string) => {
    setCity(city);
    setCitySuggestions([]);
  };

  // Hide suggestions when clicking outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        citySuggestionsRef.current &&
        !citySuggestionsRef.current.contains(e.target as Node)
      ) {
        setCitySuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Phone mask
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  // Slider/input sync
  const handleBillChange = (value: number) => {
    const v = Math.max(100, Math.min(1000, value));
    setElectricityBill(v);
  };

  // Slider color animation
  const updateSliderBackground = (val: number) => {
    const min = 100;
    const max = 1000;
    const percentage = ((val - min) / (max - min)) * 100;
    if (sliderRef.current) {
      sliderRef.current.style.background = `linear-gradient(to right, #28a745 0%, #28a745 ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;
    }
  };

  React.useEffect(() => {
    updateSliderBackground(electricityBill);
  }, [electricityBill]);

  // Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors["fullName"] = "Este campo é obrigatório";
    if (!email.trim()) newErrors["email"] = "Este campo é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors["email"] = "Por favor, insira um e-mail válido";
    if (!phone.trim()) newErrors["phone"] = "Este campo é obrigatório";
    else if (phone.replace(/\D/g, "").length < 10)
      newErrors["phone"] = "Por favor, insira um telefone válido";
    if (!city.trim()) newErrors["city"] = "Este campo é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const userData = {
      electricityBill,
      installationType,
      city,
      fullName,
      email,
      phone,
    };
    setResults({
      ...userData,
      ...calculateResults({ electricityBill, installationType }),
    });
    setShowResults(true);
  };

  return (
    <div className="form">
      <button className="close-button" onClick={onClose}>
        <Image alt="Close" src="/simulador/cancel.svg" width={24} height={24} />
      </button>
      {/* Header with Images */}
      <div className="image-header">
        <Image
          className="sol"
          src="/simulador/sun.png"
          alt="Sol"
          width={80}
          height={80}
        />
        <Image
          className="casa2"
          src="/simulador/casa2.png"
          alt="Casa"
          width={120}
          height={80}
        />
        <Image
          className="nuvem"
          src="/simulador/cloud.png"
          alt="Nuvem"
          width={80}
          height={50}
        />
      </div>
      {/* User Form Section or Results Section */}
      {showResults && results ? (
        <div className="results">
          {/* Results Header */}
          <div className="results-header">
            <h2>
              Simulação Personalizada para <span>{results.fullName}</span>
            </h2>
            <p>
              Baseado em sua conta de luz de{" "}
              <span>
                R$ {results.electricityBill.toFixed(2).replace(".", ",")}
              </span>{" "}
              em <span>{results.city}</span>
            </p>
          </div>
          {/* Results Grid */}
          <div className="results-grid">
            <div className="result-card red">
              <h3>Conta de Luz Atual</h3>
              <div className="value">
                R$ {results.electricityBill.toFixed(2).replace(".", ",")}
              </div>
              <div className="description">Valor mensal médio</div>
            </div>
            <div className="result-card blue">
              <h3>Parcela Mensal do Sistema</h3>
              <div className="value">
                R$ {results.monthlyPayment.toFixed(2).replace(".", ",")}
              </div>
              <div className="description">Financiamento solar</div>
            </div>
            <div className="result-card green">
              <h3>Economia Mensal</h3>
              <div className="value">
                R$ {results.monthlySavings.toFixed(2).replace(".", ",")}
              </div>
              <div className="description">Sua economia desde o 1º mês</div>
            </div>
            <div className="result-card yellow">
              <h3>Custo Total do Projeto</h3>
              <div className="value">
                R$ {results.totalCost.toFixed(2).replace(".", ",")}
              </div>
              <div className="description">Investimento completo</div>
            </div>
          </div>
          {/* Technical Details */}
          <div className="technical-details">
            <h3>Detalhes Técnicos da Instalação</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-label">Geração Mensal Média:</span>
                <span className="tech-value">
                  {results.monthlyGeneration} kWh/mês
                </span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Potência do Sistema:</span>
                <span className="tech-value">
                  {results.systemPower.toFixed(1)} kWp
                </span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Número de Painéis:</span>
                <span className="tech-value">
                  {results.panelCount} painéis de 550W
                </span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Inversor:</span>
                <span className="tech-value">{results.inverterModel}</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">Desconto Aplicado:</span>
                <span className="tech-value">{results.discount}% OFF</span>
              </div>
            </div>
          </div>
          {/* Payment Options */}
          <div className="payment-options">
            <h3>Opções de Pagamento</h3>
            <div className="payment-highlight">
              <div className="payment-amount">
                60x de R${" "}
                {results.installmentAmount.toFixed(2).replace(".", ",")}
              </div>
              <div className="payment-terms">com 120 dias de carência</div>
              <button className="discount-badge">🎉 Promoção Especial!</button>
            </div>
          </div>
          <button className="btn-consultant">Falar com um Consultor</button>
          <button
            className="btn-edit-form"
            onClick={() => setShowResults(false)}
          >
            ✏️ Editar Informações
          </button>
        </div>
      ) : (
        <div className="form-section">
          {/* User Form Section */}
          <div className="form-instructions">
            <h2>Descubra Seu Potencial de Economia</h2>
            <p>
              Complete o formulário abaixo para descobrir quanto você pode
              economizar com energia solar personalizada para seu perfil.
            </p>
          </div>
          <form
            className="solar-form"
            id="solarForm"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {/* Electricity Bill Input */}
            <div className="form-group">
              <label htmlFor="form-electricity-bill">
                Qual é o valor da sua conta de luz mensal?
              </label>
              <div className="slider-container">
                <input
                  type="range"
                  id="form-electricity-slider1"
                  className="slider"
                  min={100}
                  max={1000}
                  step={10}
                  value={electricityBill}
                  ref={sliderRef}
                  onChange={(e) => handleBillChange(Number(e.target.value))}
                />
              </div>
              <div className="manual-input">
                <span>R$</span>
                <input
                  type="number"
                  id="form-electricity-input1"
                  min={100}
                  max={1000}
                  step={10}
                  value={electricityBill}
                  onChange={(e) => handleBillChange(Number(e.target.value))}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            {/* Installation Type */}
            <div className="form-group">
              <label>Finalidade da instalação:</label>
              <div className="radio-group">
                {[
                  {
                    label: "Residência",
                    value: "residence",
                  },
                  {
                    label: "Comércio",
                    value: "business",
                  },
                  {
                    label: "Indústria",
                    value: "industry",
                  },
                  {
                    label: "Área Rural",
                    value: "rural",
                  },
                ].map((opt) => (
                  <label className="radio-option" key={opt.value}>
                    <input
                      type="radio"
                      name="installation-type"
                      value={opt.value}
                      checked={installationType === opt.value}
                      onChange={() => setInstallationType(opt.value)}
                    />
                    <span className="radio-text">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* City Input */}
            <div
              className={`form-group${errors.city ? " error" : ""}`}
              ref={citySuggestionsRef}
            >
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Cidade"
                value={city}
                onChange={handleCityInput}
                required
                autoComplete="address-level2"
              />
              {citySuggestions.length > 0 && (
                <div className="city-suggestions">
                  {citySuggestions.map((c) => (
                    <div
                      key={c}
                      className="city-suggestion"
                      onClick={() => selectCity(c)}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
              {errors.city && (
                <div className="error-message">{errors.city}</div>
              )}
            </div>
            {/* Personal Information */}
            <div className={`form-group${errors.fullName ? " error" : ""}`}>
              <input
                type="text"
                id="full-name"
                name="full-name"
                placeholder="Nome e Sobrenome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && (
                <div className="error-message">{errors.fullName}</div>
              )}
            </div>
            <div className="form-row">
              <div className={`form-group${errors.email ? " error" : ""}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
              <div className={`form-group${errors.phone ? " error" : ""}`}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Telefone ou WhatsApp"
                  value={phone}
                  onChange={handlePhoneInput}
                  required
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
                )}
              </div>
            </div>
            <button type="submit" className="btn-view-results">
              <span>Ver Resultado da Simulação</span>
              <span className="btn-arrow">→</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
