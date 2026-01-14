const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expensesAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    // so that the page wont reload on submit
    e.preventDefault();

    // get the raw values from the elemetns
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);
    
    // push the transactions in the list as objects
    transactions.push({
        id:Date.now(),
        description,
        amount
    });

    // save the list in the local storage labeled "transactions"
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // update the transaction list and then the summary, balance, income and expense;
    updateTransactionList();
    updateSummary();

    // reset the form
    transactionFormEl.reset()
}

function updateTransactionList() {
    transactionListEl.innerHTML="";

    const sortedTransactions = [...transactions].reverse()

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML= `
        <span>${transaction.description}</span>
        <span>${formatCurrency(transaction.amount)}
            <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
        </span>
    `;

    return li;
}

function updateSummary() {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount ,0);
    
    const income = transactions.filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount ,0);

    const expenses = transactions.filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount ,0);

    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent = formatCurrency(income);
    expensesAmountEl.textContent = formatCurrency(expenses);

}
function formatCurrency(number){
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP"
    }).format(number);
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));
    
    updateTransactionList();
    updateSummary();
}

updateTransactionList();
updateSummary();