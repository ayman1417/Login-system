var user_name = document.querySelector("#user-name");
var newUser_email = document.querySelector("#newUser-email");
var newUser_password = document.querySelector("#newUser-password");
var user_email = document.querySelector("#user-email");
var user_password = document.querySelector("#user-password");
var mode = document.querySelector("#door");
var content = document.querySelector("#content");
var controlMode = document.querySelector('button[onclick="modeSelect()"]');
var error = document.querySelector("#error-sign");
var errorLog = document.querySelector("#error-log");

var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

var isLogin = true;

userContainer = [];

function addNewUser(event) {
  event.preventDefault();

  if (
    user_name.value.trim() === "" ||
    newUser_email.value.trim() === "" ||
    newUser_password.value.trim() === ""
  ) {
    error.innerHTML = `<p id="error-log" class="text-danger text-center">All fields are required!</p>`;
    clearInputes();
    return;
  }
  var user = {
    name: user_name.value.trim(),
    email: newUser_email.value.trim(),
    password: newUser_password.value.trim(),
  };
  if (!emailRegex.test(user.email)) {
    error.innerHTML = `<p id="error-log" class="text-danger text-center">Invalid email format</p>`;
    clearInputes();
    return;
  }

  var userExists = false;
  for (let i = 0; i < userContainer.length; i++) {
    if (userContainer[i].email === user.email) {
      userExists = true;
      break;
    }
  }

  if (userExists) {
    error.innerHTML = `<p id="error-sign" class="text-danger text-center">email already exists</p>`;
    clearInputes();
  } else {
    userContainer.push(user);
    localStorage.setItem("users", JSON.stringify(userContainer));

    error.innerHTML = `<p id="error-sign" class="text-success text-center">Success</p>`;
  }
  newUser_email.value = "";
  newUser_password.value = "";
  user_name.value = "";
}

function log(event) {
  event.preventDefault();

  if (localStorage.getItem("users") != null) {
    userContainer = JSON.parse(localStorage.getItem("users"));
  } else {
    errorLog.innerHTML = `<p id="error-log" class="text-danger text-center">email do not exist</p>`;
    clearInputes();
  }

  if (user_email.value.trim() === "" || user_password.value.trim() === "") {
    errorLog.innerHTML = `<p id="error-log" class="text-danger text-center">the inputs is empty </p>`;
  }
  if (userContainer.length == 0) {
    errorLog.innerHTML = `<p id="error-log" class="text-danger text-center">user do not exis</p>`;
  }
  for (i = 0; i < userContainer.length; i++) {
    if (
      userContainer[i].email == user_email.value.trim() &&
      userContainer[i].password == user_password.value.trim()
    ) {
      errorLog.innerHTML = `<p id="error-log" class="text-success text-center">Success</p>`;

      localStorage.setItem('userName', userContainer[i].name);

      window.location.href = "home.html";
      break;
    } else {
      errorLog.innerHTML = `<p id="error-log" class="text-danger text-center">email do not exist</p>`;
      clearInputes();
    }
  }
  clearInputes();
}

function modeSelect() {
  if (isLogin) {
    mode.classList.replace("go-right", "go-left");
    isLogin = false;
    controlMode.innerHTML = "Log in";
    content.innerHTML = "You have an account? Signin";
    error.innerHTML = "";
    errorLog.innerHTML = "";
    clearInputes();
  } else {
    mode.classList.replace("go-left", "go-right");
    isLogin = true;
    content.innerHTML = "Don’t have an account? Sign Up";
    controlMode.innerHTML = "Sign Up";
    error.innerHTML = "";
    errorLog.innerHTML = "";
    clearInputes();
  }
  console.log(controlMode);
}

function clearInputes() {
  user_email.value = "";
  user_password.value = "";
  newUser_email.value = "";
  newUser_password.value = "";
  user_name.value = "";
}
