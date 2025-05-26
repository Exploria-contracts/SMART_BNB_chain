// Handle contract form submission
document.getElementById('contractForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Hide just the form container, not the whole main content
  document.querySelector('.form-container').style.display = 'none';

  // Show contract recommendations
  document.getElementById('contractRecommendations').style.display = 'block';
});

// Dynamically show additional input based on selected contract type
document.getElementById('contractType').addEventListener('change', function() {
  const contractType = this.value;
  const relatedQuestionDiv = document.getElementById('relatedQuestion');

  // Clear previous question
  relatedQuestionDiv.innerHTML = '';

  // Add input fields based on contract type
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

// Handle selection of a recommended contract
document.querySelectorAll('.chooseContract').forEach(function(button) {
  button.addEventListener('click', function() {
    // Hide contract recommendations
    document.getElementById('contractRecommendations').style.display = 'none';

    // Show payment section
    document.getElementById('paymentSection').style.display = 'block';
  });
});
