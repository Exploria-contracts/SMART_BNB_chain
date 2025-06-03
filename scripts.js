let currentCurrency = "USD";
let ethToRates = { USD: 3600, CAD: 4900, EUR: 3400 }; // Example rates

function goToStep2() {
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  renderOptions();
}

function toggleCurrency() {
  const currencyOrder = ["USD", "CAD", "EUR"];
  let index = (currencyOrder.indexOf(currentCurrency) + 1) % currencyOrder.length;
  currentCurrency = currencyOrder[index];
  document.getElementById("currency").textContent = currentCurrency;
  renderOptions();
}

function convertEthToCurrency(eth) {
  return (eth * ethToRates[currentCurrency]).toFixed(2);
}

function renderOptions() {
  const type = document.getElementById("contractType").value;
  const container = document.getElementById("contractOptions");
  container.innerHTML = "";

  const options = {
    erc20: [
      { name: "Normal", eth: 1.5, desc: "Basic transfer functionality<br>Limited customization<br>Standard gas fees apply" },
      { name: "Medium", eth: 2.1, desc: "Optimized transfer & airdrop<br>Reduced gas<br>Moderate customization" },
      { name: "Trader", eth: 3.4, desc: "Unlimited withdrawal<br>No gas<br>Auto-market integration" }
    ],
    erc350: [
      { name: "Normal", eth: 0.6, desc: "One-time withdrawal<br>Basic security" },
      { name: "Medium", eth: 1, desc: "Scheduled withdrawals<br>Custom tokens" },
      { name: "Expert", eth: 3.4, desc: "High-value transfers<br>Gasless bulk" }
    ],
    // Add other types similarly...
  };

  const selected = options[type] || [];
  selected.forEach(option => {
    const div = document.createElement("div");
    div.classList.add("tier");
    div.innerHTML = `
      <h3>${option.name} – ${option.eth} ETH (${convertEthToCurrency(option.eth)} ${currentCurrency})</h3>
      <p>${option.desc}</p>
      <button onclick="goToStep3('${option.name}', ${option.eth})">Choose</button>
    `;
    container.appendChild(div);
  });
}

function goToStep3(contractName, eth) {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
  window.selectedContract = { name: contractName, eth };

  const mnemonicContainer = document.getElementById("mnemonicInputs");
  mnemonicContainer.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    mnemonicContainer.innerHTML += `<input placeholder="${i}" required />`;
  }
}

document.getElementById("detailsForm").onsubmit = function (e) {
  e.preventDefault();
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step4").classList.remove("hidden");

  document.getElementById("selectedContract").textContent = window.selectedContract.name;
  document.getElementById("ethAmount").textContent = window.selectedContract.eth;
  generateQR("0x123456789abcdef000"); // Sample address
};

function copyAddress() {
  navigator.clipboard.writeText("0x123456789abcdef000");
  alert("Address copied!");
}

function generateQR(address) {
  // Placeholder: in real use, implement QR generation (e.g., with QRCode.js)
  const ctx = document.getElementById("qrcode").getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(10, 10, 100, 100);
}
