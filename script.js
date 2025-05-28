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

function updateCalculations(billValue) {
  // Base calculations
  const bill = parseFloat(billValue);

  // Solar system sizing logic (simplified)
  const kwhPerMonth = bill / 0.85; // Assuming R$0.85 per kWh average
  const systemPowerKw = Math.ceil(kwhPerMonth / 130); // 130 kWh per kW per month average
  const panelCountCalc = Math.ceil(systemPowerKw / 0.55); // 550W panels

  // Cost calculations
  const costPerKw = 4500; // R$ per kW installed
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
  slider.value = value;
  input.value = value;
  updateCalculations(value);
}

slider.addEventListener("input", (e) => {
  syncInputs(e.target.value);
});

input.addEventListener("input", (e) => {
  let value = parseFloat(e.target.value);
  if (value < 100) value = 100;
  if (value > 2000) value = 2000;
  if (isNaN(value)) value = 600;
  e.target.value = value;
  syncInputs(value);
});

function openModal() {
  document.getElementById("consultModal").style.display = "block";
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

// Initialize with default values
updateCalculations(600);
