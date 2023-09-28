const form = document.getElementById('my-form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const phoneNumber = document.getElementById('phoneNumber')
const password1 = document.getElementById('password1')
const password2 = document.getElementById('password2')
const allFormControls = document.querySelectorAll('.form-control')

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small')
  formControl.className = 'form-control error'
  small.textContent = message
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'
}

function clearInputs() {
  username.value = ""
  email.value = ""
  cpf.value = ""
  phoneNumber.value = ""
  password1.value = ""
  password2.value = ""
  allFormControls.forEach((formControl) => {
    formControl.className = 'form-control'
  })
}

function validateCpf(cpf) {
  //Eliminate invalids cpf
  if (cpf === "000.000.000-00" || cpf === "111.111.111-11" || cpf === "222.222.222-22" ||
      cpf === "333.333.333-33" || cpf === "444.444.444-44" || cpf === "555.555.555-55" ||
      cpf === "666.666.666-66" || cpf === "777.777.777-77" || cpf === "888.888.888-88" ||
      cpf === "999.999.999-99") {
      return false;
  }

  let cpfArray = cpf.split('.').join('').split('-').join('').split('');
  cpfArray = cpfArray.map((num) => Number(num));
  const checkers = cpfArray.slice(9);
  let temp = 0;
  let validateResult = [];
  
  // For the fist result digit:
  for (let i = 0; i < 9 ; i++) {
    temp = temp + (cpfArray[i] * (10 - i));
  }
  validateResult.push((temp%11 < 2) ? 0 : (11 - temp%11));
  temp = 0;

  // For the second result digit:
  for (let i = 0; i < 10 ; i++) {
    temp = temp + (cpfArray[i] * (11 - i));
  }
  validateResult.push((temp%11 < 2) ? 0 : (11 - temp%11));
  
  // Check if math the Result with Chekers.
  for (let i = 0; i < 2; i++) {
    if (validateResult[i] !== checkers[i])
      return false;
  }
  return true;
}

function isInputsError() {
  // To remove white space after and before the values.
  const usernameValue = username.value.trim()
  const emailValue = email.value.trim()
  const password1Value = password1.value.trim()
  const password2Value = password2.value.trim()
  let isError = false

  const cpfValue = cpf.value
  const phoneNumberValue = phoneNumber.value

  if (usernameValue === '') {
    setError(username, 'User name cannot be blank')
    isError = true
  } else {
    setSuccess(username)
  }

  if (emailValue === '') {
    setError(email, 'Email cannot be blank')
    isError = true
  } else if(!isEmail(emailValue)) {
    setError(email, 'Email is invalid')
    isError = true
  } else {
    setSuccess(email)
  }

  if (cpfValue === '') {
    setError(cpf, 'CPF cannot be blank')
    isError = true
  } else if(cpfValue.length < 14) {
    setError(cpf, 'CPF incomplete')
    isError = true
  } else if (!validateCpf(cpfValue)) {
    setError(cpf, 'Invalid CPF')
    isError = true
  } else {
    setSuccess(cpf)
  }

  if (phoneNumberValue === '') {
    setError(phoneNumber, 'Phone number cannot be blank')
    isError = true
  } else if (phoneNumberValue.length < 14) {
    setError(phoneNumber, 'Phone Number incomplete')
    isError = true
  } else {
    setSuccess(phoneNumber)
  }

  if (password1Value === '') {
    setError(password1, 'Password cannot be blank')
    isError = true
  } else {
    setSuccess(password1)
  }

  if (password2Value === '') {
    setError(password2, 'Password cannot be blank')
    isError = true
  } else if (password1Value !== password2Value) {
    setError(password2, 'Both passwords must match')
    isError = true
  } else {
    setSuccess(password2)
  }

  return isError
}

// EventListener to format the cpf input as 123.123.123-12
cpf.addEventListener('input', (e) => {
  e.target.value = e.target.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{1})/, '$1.$2')
    .replace(/(\d{3})(\d{1})/, '$1.$2')
    .replace(/(\d{3})(\d{1})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
})

// EventListener to format the Phone Number as (xx) 99999-9999 (Brasilian cellphone number). Or can be (xx) 3333-3333 (Brasilian landline number)
phoneNumber.addEventListener('input', (e) => {
  e.target.value = e.target.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{1})/, '($1) $2')
    .replace(/(\d{4})(\d{1})/, '$1-$2')
    .replace(/(\d{4})-(\d{1})(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1')
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if(isInputsError() === true) {
    console.log('Error')
  } else {
    // Here is where should send the information to a database.
    const data =  {
      name: username.value,
      email: email.value,
      cpf: cpf.value,
      phoneNumber: phoneNumber.value,
    }
    console.log(data)
    alert("Data submited")
    clearInputs()
  }
})