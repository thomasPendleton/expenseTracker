const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
// const delete_btn = document.getElementsById("delete-btn");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [] ;

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDom(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
// Generate random id
function generateId() {
  return Math.floor(Math.random() * 1000000000);
}

// add transaction to dom list
function addTransactionDom(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value +-
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick='removeTransaction(${transaction.id})'>x</button>
        `;

  list.appendChild(item);
}



function updateValues() {
  const amounts = transactions.map((trans) => trans.amount);
  
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts.filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) *-(1)
    .toFixed(2);

  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `$${expense}`;
  balance.innerText = `$ ${total}`;
}

// Update local storage transactions
function updateLocalStorage(){
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDom);
  updateValues();
}

// Remove tranaction by id
function removeTransaction(id){
    transactions = transactions
        .filter(transaction =>transaction.id !== id)
    init();
    updateLocalStorage();
}


init();

form.addEventListener("submit", (e) => {
  addTransaction(e);
});
