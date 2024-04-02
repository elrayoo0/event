// Function to fetch currency data from an API
async function fetchCurrencies() {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest');
      const data = await response.json();
      return Object.keys(data.rates);
    } catch (error) {
      console.error('Error fetching currencies:', error);
      return [];
    }
  }
  
  // Function to populate dropdown menus with currencies
  
  async function populateCurrencies() {
    const currencies = await fetchCurrencies();
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = `From ${currency}`;
      
        fromCurrencySelect.appendChild(optionFrom.cloneNode(true));
        
        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = `To ${currency}`;
       
        toCurrencySelect.appendChild(optionTo);
    });
}
  
  // Function to convert currency
  async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await response.json();
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = amount * exchangeRate;
      document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').innerText = 'Error fetching exchange rates. Please try again later.';
    }
  }
  
  // Call the function to populate currencies when the page loads
  document.addEventListener('DOMContentLoaded', populateCurrencies);
  