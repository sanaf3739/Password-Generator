let lengthDisplay = document.querySelector("[data-lengthNumber]");
let inputSlider = document.querySelector("[data-inputSlider]");
let passwordDisplay = document.querySelector("[data-passwordDisplay]");
let copyBtn = document.querySelector("[data-copyButton]");
let copyMsg = document.querySelector("[data-copyButton]");
let uppercaseCheck = document.querySelector("#uppercase");
let lowercaseCheck = document.querySelector("#lowercase");
let numberCheck = document.querySelector("#number");
let symbolCheck = document.querySelector("#symbol");
let indicator = document.querySelector("[data-indicator]");
let generatePassBtn = document.querySelector("#generate-btn");
let allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlide();

// handle input slider function
function handleSlide() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

// copy password function
async function handleCopyPass() {
  await navigator.clipboard.writeText(passwordDisplay.value);
  setInterval(() => {
    copyMsg.innerText = "copied";
  },1000);
}
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) handleCopyPass();
});

// function to generate random Integer
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function to generate random UpperCase letter
function generateRandomUc() {
  return String.fromCharCode(generateRandomInt(65, 90));
}

// function to generate random LowerCase letter
function generateRandomLc() {
  return String.fromCharCode(generateRandomInt(97, 122));
}

// function to generate random single digit number
function generateRandomNum() {
  return generateRandomInt(1, 9);
}

// function to generate random symbol
const symbol = "!@#$%^&*)_-+=`~[{]}|/,.<>?;:'";
function generateRandomSymbol() {
  let randomSymbol = generateRandomInt(0, symbol.length);
  return symbol.charAt(randomSymbol);
}

// set indicaator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
}

// calculate strength
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numberCheck.checked) hasNumber = true;
  if (symbolCheck.checked) hasSymbol = true;
  if ((hasUpper && hasLower) && (hasNumber || hasSymbol) && passwordLength >= 8) {
    setIndicator("green");
  } else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6) {
    setIndicator("yellow");
  } else {
    setIndicator("red");
  }
}
inputSlider.addEventListener("input", function (e) {
  passwordLength = e.target.value;
  handleSlide();
});
function handleCheckBoxChange() {
  // counting checked checkbox
  checkCount = 0;
  allCheckBoxes.forEach((checkBox) => {
    if (checkBox.checked) checkCount++;
  });
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlide();
  }
}

allCheckBoxes.forEach((checkBox) => {
  checkBox.addEventListener("change", handleCheckBoxChange);
});

generatePassBtn.addEventListener("click", function () {
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlide();
  }
  if(checkCount<=0)return;
  password = "";
  let genPassArray = [];
  if (uppercaseCheck.checked) {
    genPassArray.push(generateRandomUc);
  }
  if (lowercaseCheck.checked) {
    genPassArray.push(generateRandomLc);
  }
  if (numberCheck.checked) {
    genPassArray.push(generateRandomNum);
  }
  if (symbolCheck.checked) {
    genPassArray.push(generateRandomSymbol);
  }
  // compelsory addition
  for (let i = 0; i < genPassArray.length; i++) {
    password += genPassArray[i]();
  }

  // remaining addition
  for (let i = 0; i < passwordLength - genPassArray.length; i++) {
    let randomIndex = generateRandomInt(0, genPassArray.length);
    password += genPassArray[randomIndex]();
  }
  calcStrength();
  passwordDisplay.value = password;
});
