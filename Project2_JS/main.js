//CONST SECTION
const clickButton = document.getElementById("btn");
const inputValue = document.getElementById("input_val");
const output = document.getElementById("output");
const select = document.getElementById("currencySelect");

//GET CURRENCY
const url = `http://api.nbp.pl/api/exchangerates/rates/a/`;

const fetchCurrency = (currency) => {
  fetch(url + currency)
    .then((response) => response.json())
    .then((data) => {
      const result = inputValue.value * data.rates[0].mid;
      output.innerText = result.toFixed(2) + " PLN";
    })
    .catch((err) => console.error(err));
};

clickButton.addEventListener("click", calculate);

//ALERT
function calculate() {
  if (inputValue.value < 0) {
    alert("Not possible negative value");
    inputValue.value = 0;
  } else {
    fetchCurrency(select.value);
  }
}
