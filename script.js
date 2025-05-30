// Brazilian cities for autocomplete
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

// Form elements
const cityInput = document.getElementById("city");
const citySuggestions = document.getElementById("citySuggestions");
const solarForm = document.getElementById("solarForm");
const phoneInput = document.getElementById("phone");
const mainSlider = document.getElementById("form-electricity-slider1");
const formSlider = document.getElementById("form-electricity-slider2");
const mainInput = document.getElementById("form-electricity-input1");
const formInput = document.getElementById("form-electricity-input2");
const mainForm = document.getElementById("main-form");

// Results elements
const slider = document.getElementById("electricity-slider");
const input = document.getElementById("electricity-input");
const currentBill = document.getElementById("current-bill");
const monthlyPayment = document.getElementById("monthly-payment");
const monthlySavings = document.getElementById("monthly-savings");
const totalCost = document.getElementById("total-cost");
const monthlyGeneration = document.getElementById("monthly-generation");
const systemPower = document.getElementById("system-power");
const panelCount = document.getElementById("panel-count");
const inverterModel = document.getElementById("inverter-model");
const discount = document.getElementById("discount");
const installmentAmount = document.getElementById("installment-amount");
const closeFormButton = document.getElementById("close-form-button");
const openFormButton = document.getElementById("open-form-button");

// User data storage
let userData = {};

// Phone mask
function formatPhone(value) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return value;
}

phoneInput.addEventListener("input", (e) => {
  e.target.value = formatPhone(e.target.value);
});

// --- Begin: Sync all four electricity inputs and sliders ---
function syncAllElectricityInputs(value) {
  let v = parseFloat(value);
  if (isNaN(v)) v = 100;
  if (v < 100) v = 100;
  if (v > 1000) v = 1000;

  // Update all four elements if needed
  if (mainSlider.value != v) mainSlider.value = v;
  if (formSlider.value != v) formSlider.value = v;
  if (mainInput.value != v) mainInput.value = v;
  if (formInput.value != v) formInput.value = v;

  // Optionally update calculations if needed
  updateCalculations(v);
}

[mainSlider, formSlider, mainInput, formInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    syncAllElectricityInputs(e.target.value);
    // Update all slider backgrounds after sync
    [mainSlider, formSlider].forEach((sliderEl) => {
      updateSliderBackground(sliderEl);
    });
  });
});

// City autocomplete
cityInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const suggestions = brazilianCities
    .filter((city) => city.toLowerCase().includes(query))
    .slice(0, 5);

  if (suggestions.length > 0 && query.length > 1) {
    citySuggestions.innerHTML = suggestions
      .map(
        (city) =>
          `<div class="city-suggestion" onclick="selectCity('${city}')">${city}</div>`
      )
      .join("");
    citySuggestions.style.display = "block";
  } else {
    citySuggestions.style.display = "none";
  }
});

function selectCity(city) {
  cityInput.value = city;
  citySuggestions.style.display = "none";
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!cityInput.contains(e.target) && !citySuggestions.contains(e.target)) {
    citySuggestions.style.display = "none";
  }
});

// Form validation
function validateForm() {
  let isValid = true;
  const requiredFields = ["full-name", "email", "phone", "city"];

  // Clear previous errors
  document.querySelectorAll(".form-group.error").forEach((group) => {
    group.classList.remove("error");
  });

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    if (!value) {
      showError(field, "Este campo é obrigatório");
      isValid = false;
    }
  });

  // Email validation
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRegex.test(email.value)) {
    showError(email, "Por favor, insira um e-mail válido");
    isValid = false;
  }

  // Phone validation
  const phone = document.getElementById("phone");
  const phoneNumbers = phone.value.replace(/\D/g, "");
  if (phone.value && phoneNumbers.length < 10) {
    showError(phone, "Por favor, insira um telefone válido");
    isValid = false;
  }

  return isValid;
}

function showError(field, message) {
  const formGroup = field.closest(".form-group");
  formGroup.classList.add("error");

  let errorElement = formGroup.querySelector(".error-message");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    formGroup.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

// Form submission
solarForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Collect form data
  userData = {
    electricityBill: parseFloat(formInput.value),
    installationType: document.querySelector(
      'input[name="installation-type"]:checked'
    ).value,
    city: document.getElementById("city").value,
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  // Show results
  showResults();
});

function showResults() {
  // Hide form and show results
  document.getElementById("user-form").style.display = "none";
  document.getElementById("calculation-results").style.display = "block";

  // Update results header
  document.getElementById("user-name-display").textContent = userData.fullName;
  document.getElementById(
    "user-bill-display"
  ).textContent = `R$ ${userData.electricityBill.toFixed(2).replace(".", ",")}`;
  document.getElementById("user-city-display").textContent = userData.city;

  // Update calculations with user data
  updateCalculations(userData.electricityBill);
}

function editForm() {
  document.getElementById("user-form").style.display = "block";
  document.getElementById("calculation-results").style.display = "none";
}

function updateCalculations(billValue) {
  // Base calculations with installation type multiplier
  const bill = parseFloat(billValue);
  let multiplier = 1;

  // Adjust calculations based on installation type
  switch (userData.installationType) {
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

  // Solar system sizing logic (simplified)
  const kwhPerMonth = (bill / 0.85) * multiplier; // Assuming R$0.85 per kWh average
  const systemPowerKw = Math.ceil(kwhPerMonth / 130); // 130 kWh per kW per month average
  const panelCountCalc = Math.ceil(systemPowerKw / 0.55); // 550W panels

  // Cost calculations
  const costPerKw = 4500 * multiplier; // R$ per kW installed
  const totalSystemCost = systemPowerKw * costPerKw;
  const discountPercent = 15;
  const finalCost = totalSystemCost * (1 - discountPercent / 100);

  // Financing calculations
  const monthlyPaymentCalc = finalCost / 60; // 60 months
  const savings = bill - monthlyPaymentCalc;

  // Update display
  currentBill.textContent = `R$ ${bill.toFixed(2).replace(".", ",")}`;
  monthlyPayment.textContent = `R$ ${monthlyPaymentCalc
    .toFixed(2)
    .replace(".", ",")}`;
  monthlySavings.textContent = `R$ ${Math.max(0, savings)
    .toFixed(2)
    .replace(".", ",")}`;
  totalCost.textContent = `R$ ${finalCost.toFixed(2).replace(".", ",")}`;
  monthlyGeneration.textContent = `${Math.round(kwhPerMonth)} kWh/mês`;
  systemPower.textContent = `${systemPowerKw.toFixed(1)} kWp`;
  panelCount.textContent = `${panelCountCalc} painéis de 550W`;

  // Update inverter model based on system size
  let inverterText = "1x WEG SIW200G M050";
  if (systemPowerKw > 10) {
    inverterText = "2x WEG SIW200G M050";
  } else if (systemPowerKw > 15) {
    inverterText = "1x WEG SIW400G M100";
  }
  inverterModel.textContent = inverterText;

  discount.textContent = `${discountPercent}% OFF`;
  installmentAmount.textContent = `60x de R$ ${monthlyPaymentCalc
    .toFixed(2)
    .replace(".", ",")}`;
}

function syncInputs(value) {
  if (slider && input) {
    slider.value = value;
    input.value = value;
    updateCalculations(value);
  }
}

function closeModal() {
  document.getElementById("consultModal").style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("consultModal");
  if (e.target === modal) {
    closeModal();
  }
});

function updateSliderBackground(input) {
  const min = parseInt(input.min);
  const max = parseInt(input.max);
  const val = parseInt(input.value);

  const percentage = ((val - min) / (max - min)) * 100;

  input.style.background = `linear-gradient(to right, #28a745 0%, #28a745 ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;
}

// Inicializa no carregamento
updateSliderBackground(mainSlider);

// Atualiza sempre que mover
mainSlider.addEventListener("input", () => {
  updateSliderBackground(mainSlider);
});

closeFormButton.addEventListener("click", () => {
  mainForm.style.display = "none";
  // Remove blur
  document.body.classList.remove("blurred-bg");
});

openFormButton.addEventListener("click", () => {
  mainForm.style.display = "block";
  // Blur background
  document.body.classList.add("blurred-bg");
});