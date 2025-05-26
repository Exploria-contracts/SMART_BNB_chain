// Step 1: Handle contract form submission
document.getElementById('contractForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Hide just the form container
  document.querySelector('.form-container').style.display = 'none';

  // Show contract recommendations
  document.getElementById('contractRecommendations').style.display = 'block';
});

// Step 2: Show additional input fields based on contract type
document.getElementById('contractType').addEventListener('change', function() {
  const contractType = this.value;
  const relatedQuestionDiv = document.getElementById('relatedQuestion');
  relatedQuestionDiv.innerHTML = '';

  if (contractType === 'erc20') {
    relatedQuestionDiv.innerHTML = `
      <label for="tokenSupply">What is the total supply of your token?</label>
      <input type="number" id="tokenSupply" name="tokenSupply" placeholder="Total token supply" required>
    `;
  } else if (contractType === 'erc721') {
    relatedQuestionDiv.innerHTML = `
      <label for="nftCount">How many unique NFTs will this contract manage?</label>
      <input type="number" id="nftCount" name="nftCount" placeholder="Total NFTs" required>
    `;
  } else if (contractType === 'staking') {
    relatedQuestionDiv.innerHTML = `
      <label for="stakingDuration">What is the staking duration?</label>
      <input type="number" id="stakingDuration" name="stakingDuration" placeholder="Staking duration (in days)" required>
    `;
  } else if (contractType === 'ico') {
    relatedQuestionDiv.innerHTML = `
      <label for="icoTarget">What is the ICO target amount?</label>
      <input type="number" id="icoTarget" name="icoTarget" placeholder="Target amount in ETH" required>
    `;
  }
});

// Step 3: Handle "Choose This" click
document.querySelectorAll('.chooseContract').forEach(function(button) {
  button.addEventListener('click', function() {
    // Hide recommendations
    document.getElementById('contractRecommendations').style.display = 'none';

    // Show payment step with BTC QR code
    const btcAddress = 'bc1q6fs0sy2p53xx0ewjtun6mhkuk8ulclngy6jldv';
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:${btcAddress}`;

    const paymentSection = document.getElementById('paymentSection');
    paymentSection.innerHTML = `
      <h2>Payment Instructions</h2>
      <p><strong>Network:</strong> BTC</p>
      <p><strong>Address:</strong> <span class="payment-address">${btcAddress}</span></p>
      <img src="${qrURL}" alt="BTC QR Code">
      <div class="loader"></div>
      <p>Awaiting payment confirmation...</p>
    `;
    paymentSection.style.display = 'block';
  });
});
