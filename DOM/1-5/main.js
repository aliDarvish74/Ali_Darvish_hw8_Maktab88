let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let passwordTest = document.querySelector("#passwordTest");
let btn = document.querySelector("#btn");
let userMsg = document.querySelector("#userMsg");
let passMsg = document.querySelector("#passMsg");
let passTestMsg = document.querySelector("#passTestMsg");

btn.onclick = function () {
  errorReset();

  similarPassword(password, passwordTest, passTestMsg);

  passCharacterValidation(password, passMsg);

  passLengthValidation(password, passMsg, 8);

  emptyFieldValidation(userName, userMsg);
  emptyFieldValidation(password, passMsg);
  emptyFieldValidation(passwordTest, passTestMsg);
};

function emptyFieldValidation(element, msg) {
  if (element.value === "") {
    msg.innerHTML = "الزامی";
    element.style.border = "1px solid red";
    element.classList.add("error");
    console.log(new Error(`${element.name} value is empty`));
  }
}

function similarPassword(passElement, passConfirmElement, msg) {
  if (passElement.value !== passConfirmElement.value) {
    msg.innerHTML = "رمز های وارد شده یکسان نیستند";
    passConfirmElement.classList.add("error");
    passConfirmElement.style.border = "1px solid red";
    console.log(new Error(`Password and confirmation aren't similar!`));
  }
}

function passCharacterValidation(passInput, msg) {
  let passValue = passInput.value;
  let splitedPass = passValue.split("");
  let numberFlag = false;
  let charFlag = false;
  for (let char in splitedPass) {
    if (splitedPass[char] === " ") {
      charFlag = true;
      continue;
    }
    if (numberFlag && charFlag) {
      break;
    }
    !isNaN(Number(splitedPass[char])) ? (numberFlag = true) : (charFlag = true);
  }
  if (numberFlag && charFlag) {
    console.log("validPassword");
  } else {
    msg.innerHTML = "رمز عبور باید شامل حداقل یک حرف و یک عدد باشد.";
    passInput.classList.add("error");
    passInput.style.border = "1px solid red";
    console.log(
      new Error(`Password must have at least one number and one character`)
    );
  }
}

function passLengthValidation(passInput, msg, validLength) {
  let passLength = passInput.value.length;
  if (passInput.value !== "" && passLength < validLength) {
    msg.innerHTML = "رمز عبور باید شامل حداقل 8 کاراکتر باشد";
    passInput.classList.add("error");
    passInput.style.border = "1px solid red";
    console.log(new Error(`Password must have at least 8 characters length`));
  }
}

function errorReset() {
  userMsg.innerHTML = "";
  passMsg.innerHTML = "";
  passTestMsg.innerHTML = "";
  userName.style.border = "none";
  userName.classList.remove("error");
  password.style.border = "none";
  password.classList.remove("error");
  passwordTest.style.border = "none";
  passwordTest.classList.remove("error");
}
