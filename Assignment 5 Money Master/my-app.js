// Get All input fields
const incomeInput = document.getElementById("income-input");
const foodInput = document.getElementById("food-input");
const rentInput = document.getElementById("rent-input");
const clothesInput = document.getElementById("clothes-input");
const savingInput = document.getElementById("saving-input");
// Get All buttons
const btnIncExp = document.getElementById("btn-inc-exp");
const btnSaving = document.getElementById("btn-saving");
// Get All Output Displays
const totalExp = document.getElementById("total-exp");
const balance = document.getElementById("balance");
const savingAmount = document.getElementById("saving-amount");
const remainingBalance = document.getElementById("remaining-balance");
const errorDisplays = document.getElementsByClassName("error-display");

// Global Vars
let balanceValue = 0;
let incomeInputValue = 0;
const errors = {};

//////////// Calculate Balance with Income and Expenses //////////////
btnIncExp.addEventListener("click", (e) => {
  initialActions(e);

  // Validate inputs
  validateInput(
    incomeInput,
    "Income should be a positive number and greater than 0",
    1
  );
  validateInput(foodInput, "food cost should be a positive number");
  validateInput(rentInput, "rend cost should be a positive number");
  validateInput(clothesInput, "clothes cost should be a positive number");

  // return if there is an error
  if (Object.keys(errors).length > 0) return displayErrorsThenClearErrors();

  // local vars
  incomeInputValue = parseInt(incomeInput.value);
  const foodInputValue = parseInt(foodInput.value);
  const rentInputValue = parseInt(rentInput.value);
  const clothesInputValue = parseInt(clothesInput.value);

  // Calculate total Expenses
  const totalExpValue = foodInputValue + rentInputValue + clothesInputValue;
  // Calculate total Balance
  balanceValue = incomeInputValue - totalExpValue;

  // return if expenses is greater than income
  if (totalExpValue > incomeInputValue) {
    errors[incomeInput.id] = "Income should be greater than total Expenses";
    return displayErrorsThenClearErrors();
  }

  // Displaying total expenses on UI
  totalExp.innerText = totalExpValue.toFixed(2);
  // Displaying balance on UI
  balance.innerText = balanceValue.toFixed(2);
});

////////////// Calculate Saving with balance and saving percentage /////////////
btnSaving.addEventListener("click", (e) => {
  initialActions(e);

  // validate input
  validateInput(
    savingInput,
    "Saving Percent should be a positive number, and less than or equal to 100",
    0,
    100
  );

  // throw an error when balance is 0 or less
  if (balanceValue <= 0)
    errors[savingInput.id] = "You cannot save when your balance is zero";

  // return if there is an error
  if (Object.keys(errors).length > 0) return displayErrorsThenClearErrors();

  // local vars
  const savingInputValue = parseInt(savingInput.value);

  // calculating saving
  const savingPercent = savingInputValue / 100;
  const savingAmountValue = incomeInputValue * savingPercent;

  // return if saving amount more than the balance you have
  if (savingAmountValue > balanceValue) {
    const availableSavingPercent = Math.floor(
      (balanceValue / incomeInputValue) * 100
    );

    const errorText = `You cannot save more than ${availableSavingPercent} percent of your income`;
    errors[savingInput.id] = errorText;

    return displayErrorsThenClearErrors();
  }

  // Calculate remaining Balance
  const remainingBalanceValue = balanceValue - savingAmountValue;

  // Display saving amount on UI
  savingAmount.innerText = savingAmountValue.toFixed(2);
  // Display remaining balance amount on UI
  remainingBalance.innerText = remainingBalanceValue.toFixed(2);
});

function initialActions(e) {
  // preventing default behavior
  e.preventDefault();
  // clear error displays
  clearErrorDisplays();
}

function validateInput(domInput, errorText, min = 0, max = Infinity) {
  if (
    isNaN(parseInt(domInput.value)) ||
    parseInt(domInput.value) < min ||
    parseInt(domInput.value) > max
  ) {
    errors[domInput.id] = errorText;
  }
}

function displayErrorsThenClearErrors() {
  displayErrors();
  clearErrors();
}

function clearErrors() {
  for (const key in errors) {
    delete errors[key];
  }
}

function displayErrors() {
  for (const err in errors) {
    const target = document.getElementById(err + "-error");
    // show error
    target.classList.remove("hidden");
    // push error text
    target.innerText = errors[err];
  }
}

function clearErrorDisplays() {
  for (const ed of errorDisplays) {
    ed.classList.add("hidden");
  }
}