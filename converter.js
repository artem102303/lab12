const API = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");

let rates = { UAH: 1 };

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  from.innerHTML = "";
  to.innerHTML = "";

  from.add(new Option("UAH", "UAH"));
  to.add(new Option("UAH", "UAH"));

  data.forEach(c => {
    rates[c.cc] = c.rate;
    from.add(new Option(c.cc, c.cc));
    to.add(new Option(c.cc, c.cc));
  });

  from.value = "USD";
  to.value = "EUR";

  convert();
}

function convert() {
  let val = parseFloat(amount.value);

  if (!val) {
    result.textContent = "0";
    return;
  }

  let f = rates[from.value];
  let t = rates[to.value];

  let uah = val * f;
  let res = uah / t;

  result.textContent = res.toFixed(2);
}

amount.addEventListener("input", convert);
from.addEventListener("change", convert);
to.addEventListener("change", convert);

load();