document.getElementById('contractForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Show contract recommendations
  document.querySelector('.main-content').style.display = 'none';
  document.getElementById('contractRecommendations').style.display = 'block';
});

document.getElementById('contractType').addEventListener('change', function() {
  const contractType = this.value;
  const relatedQuestionDiv = document.getElementById('relatedQuestion');

  // Clear previous question
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

document.querySelectorAll('.chooseContract').forEach(function(button) {
  button.addEventListener('click', function() {
    document.getElementById('contractRecommendations').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
  });
});
