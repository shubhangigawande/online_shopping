// const { default: axios } = require("axios");
// const { response } = require("../../app");

var validateeUserCredentials = () => {

  $(".invalidCredentials").hide();
  var userData = {};
  userData.userId = $("#userId").val();
  userData.password = $("#acctPassword").val();
  var captcha = $("#captchaInput").val();


  if (captcha !== $("#captchaImage").attr("alt")) {
    $(".invalidCredentials").text("Invalid Captcha");
    $(".invalidCredentials").show();
    return;
  }


  axios.post('/validate/userCredentials', { params: userData })
    .then(function (response) {
      // console.log(response);
      if (response.data.msg == 'ValidUser') {
        $(".invalidCredentials").hide();
        loginModel.hide();
        $(".loginBtns").hide();
        $(".logoutBtns").show();
        loadSelectedPage('productDetails');

        // clear the fields
        document.querySelector("#userId").value = "";
        document.querySelector("#acctPassword").value = "";
        document.querySelector("#captchaInput").value = "";

      } else {
        // invalid user
        $(".invalidCredentials").text("Invalid credentials");
        $(".invalidCredentials").show();
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  document.querySelector("#navBurgerButton").classList.add("collapsed");
  document.querySelector("#navbarNav").classList.remove("show");

}

var closeBtn = () => {
  // document.querySelector("#closeButton").setAttribute("data-bs-dismiss", "modal");
  document.querySelector("#userId").value = "";
  document.querySelector("#acctPassword").value = "";
  document.querySelector("#captchaInput").value = "";
  document.querySelector("#navBurgerButton").classList.add("collapsed");
  document.querySelector("#navbarNav").classList.remove("show");
}

var signUpcloseBtn = () => {
  document.querySelector("#signUpId").value = "";
  document.querySelector("#signUpPwd").value = "";
  document.querySelector("#signUpRepPwd").value = "";
  document.querySelector("#signUpMail").value = "";
  document.querySelector("#signUpCaptcha").value = "";
  document.querySelector(".passwordValidation").style.display = "none";
  document.querySelector(".repPassValidation").style.display = "none";
  document.querySelector(".emailValidation").style.display = "none";
}

var signUp = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInSignup").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInSignup").alt = captcha; // Set captcha as the alt attribute
  // document.querySelector("#signUpCaptcha").value = "";

  // for hamburger menu
  document.querySelector("#navBurgerButton").classList.add("collapsed");
  document.querySelector("#navbarNav").classList.remove("show");
}

var loginModel;
var showLoginDialog = () => {
  openCaptcha();
  loginModel = new bootstrap.Modal('#loginDialog');
  loginModel.show();
}

var loginInSignUp = () => {
  openCaptcha();
  document.querySelector("#signUpId").value = "";
  document.querySelector("#signUpPwd").value = "";
  document.querySelector("#signUpRepPwd").value = "";
  document.querySelector("#signUpMail").value = "";
  document.querySelector("#signUpCaptcha").value = "";
}

var signUpInLogin = () => {
  refreshCaptchaOnSignUp();
  document.querySelector("#userId").value = "";
  document.querySelector("#acctPassword").value = "";
  document.querySelector("#captchaInput").value = "";
}

var forgotPwdInLogin = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInForgot").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInForgot").alt = captcha; // Set captcha as the alt attribute

  // clear the login fields
  document.querySelector("#userId").value = "";
  document.querySelector("#acctPassword").value = "";
  document.querySelector("#captchaInput").value = "";
}

var closeBtnOnForgotPwd = () => {
  document.querySelector("#userIdInForgot").value = "";
  document.querySelector("#mailIdInForgot").value = "";
  document.querySelector("#captchaInForgot").value = "";
}

var refreshCaptchaOnSignUp = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInSignup").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInSignup").alt = captcha; // Set captcha as the alt attribute
  document.querySelector("#signUpCaptcha").value = "";
}

var refreshCaptchaOnForgot = () => {
  var captcha = generateCaptcha();
  document.querySelector("#captchaImageInForgot").src = "https://dummyimage.com/200x80/000/fff&text=" + captcha;
  document.querySelector("#captchaImageInForgot").alt = captcha; // Set captcha as the alt attribute
  document.querySelector("#captchaInForgot").value = "";
}

var logOutYesBtn = () => {
  loadSelectedPage('wlcmPage');
  $(".loginBtns").show();
  $(".logoutBtns").hide();
}


// validation of Password and repeat password

var validatePassword = (event) => {

  var userInputPwd = document.querySelector("#signUpPwd").value;

  var noCount = 0;
  var specialCount = 0;
  var capitalCount = 0;
  var lowerCount = 0;
  var firstCount = false;


  // minimum size is 8 characters
  var stringSize = userInputPwd.length;
  applyColorBasedOnType("#len8", stringSize >= 8);


  // first alphabet not an uppercase
  if (userInputPwd.length == 0) {
    document.querySelector("#notUpp").style.color = 'red';
    // if we speedily click backspace the color of all qualifications is red
    document.querySelector("#num2").style.color = 'red';
    document.querySelector("#spe2").style.color = 'red';
    document.querySelector("#upp2").style.color = 'red';
    document.querySelector("#low2").style.color = 'red';
  }
  else if (userInputPwd.charCodeAt(0) >= 65 && userInputPwd.charCodeAt(0) <= 90) {
    document.querySelector("#notUpp").style.color = 'red';
  } else {
    document.querySelector("#notUpp").style.color = 'green';
  }


  for (var i = 0; i < userInputPwd.length; i++) {

    // should have 2 numbers 
    if (userInputPwd.charCodeAt(i) >= 48 && userInputPwd.charCodeAt(i) <= 57) {
      noCount++;
    }
    applyColorBasedOnType('#num2', noCount >= 2);

    // should have 2 uppercase alphabets
    if (userInputPwd.charCodeAt(i) >= 65 && userInputPwd.charCodeAt(i) <= 90) {
      capitalCount++;
    }
    applyColorBasedOnType("#upp2", capitalCount >= 2);

    // console.log(capitalCount);

    // should have 2 lowercase alphabets
    if (userInputPwd.charCodeAt(i) >= 97 && userInputPwd.charCodeAt(i) <= 122) {
      lowerCount++;
    }
    applyColorBasedOnType("#low2", lowerCount >= 2);


    // should have 2 special characters
    if (userInputPwd.charCodeAt(i) >= 32 && userInputPwd.charCodeAt(i) <= 47 || userInputPwd.charCodeAt(i) >= 58 && userInputPwd.charCodeAt(i) <= 64 || userInputPwd.charCodeAt(i) >= 91 && userInputPwd.charCodeAt(i) <= 96 || userInputPwd.charCodeAt(i) >= 123 && userInputPwd.charCodeAt(i) <= 126) {
      specialCount++;
    }
    applyColorBasedOnType("#spe2", specialCount >= 2);
  }

  if (document.querySelector("#len8").style.color == 'green' && document.querySelector("#num2").style.color == 'green' && document.querySelector("#spe2").style.color == 'green' && document.querySelector("#notUpp").style.color == 'green' && document.querySelector("#upp2").style.color == 'green' && document.querySelector("#low2").style.color == 'green') {
    document.querySelector(".passwordValidation").style.display = "none";
    document.getElementById("signUpRepPwd").disabled = false;
  } else {
    document.getElementById("signUpRepPwd").disabled = true;
  }

}

// simple validation
var validatePasswordSimple = (event) => {

  var userInputPwd = document.querySelector("#signUpPwd").value;

  var noCount = 0;
  var lowerCount = 0;

  // first alphabet not an uppercase
  if (userInputPwd.length == 0) {
    // if we speedily click backspace the color of all qualifications is red
    document.querySelector("#num2").style.color = 'red';
    document.querySelector("#low2").style.color = 'red';
  }

  for (var i = 0; i < userInputPwd.length; i++) {

    // should have 2 numbers 
    if (userInputPwd.charCodeAt(i) >= 48 && userInputPwd.charCodeAt(i) <= 57) {
      noCount++;
    }
    applyColorBasedOnType('#num2', noCount >= 2);

    // should have 2 lowercase alphabets
    if (userInputPwd.charCodeAt(i) >= 97 && userInputPwd.charCodeAt(i) <= 122) {
      lowerCount++;
    }
    applyColorBasedOnType("#low2", lowerCount >= 2);
  }

  if (document.querySelector("#num2").style.color == 'green' && document.querySelector("#low2").style.color == 'green') {
    document.querySelector(".passwordValidation").style.display = "none";
    document.getElementById("signUpRepPwd").disabled = false;
  } else {
    document.getElementById("signUpRepPwd").disabled = true;
  }

}



var applyColorBasedOnType = (selector, isValid) => {
  if (isValid) {
    // console.log(selector);
    document.querySelector(selector).style.color = 'green';
  } else {
    // console.log(selector);
    document.querySelector(selector).style.color = 'red';
  }
}

// var repPwdElement = document.querySelector("#signUpRepPwd");

// if(repPwdElement.disabled) {
  
// }


var validateRePassword = (event) => {
  // document.querySelector(".repPassValidation").style.display = "block";
  var rePassword = document.getElementById("signUpRepPwd").value;
  var stringSizeRepeat = rePassword.length;

  var userInputPwdRe = document.querySelector("#signUpPwd").value;
  var userInputPwdRepeat = document.querySelector("#signUpRepPwd").value;

  if (userInputPwdRe == userInputPwdRepeat) {
    document.querySelector(".repPassValidation").style.display = "none";
    // console.log('Matched');
  } else {
    document.querySelector(".repPassValidation").style.display = "block";
    // console.log('this is a validation');
  }
}

var showValidationDialogue = () => {
  document.querySelector(".passwordValidation").style.display = "block";
  if (document.querySelector("#len8").style.color == 'green' && document.querySelector("#num2").style.color == 'green' && document.querySelector("#spe2").style.color == 'green' && document.querySelector("#notUpp").style.color == 'green' && document.querySelector("#upp2").style.color == 'green' && document.querySelector("#low2").style.color == 'green') {
    document.querySelector(".passwordValidation").style.display = "none";
  }
}


var ValidateEmail = (mail) => {
  // console.log('hello validateEmail');
  var mail = document.querySelector("#signUpMail").value;
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(validRegex)) {
    document.querySelector(".emailValidation").style.display = "none";
    // console.log('yes validation');
  } else {
    document.querySelector(".emailValidation").style.display = "block";
    // console.log('No validation');
  }
}

var checkUserLoginstatus = () => {
  axios.get("/user/validateSession").then((response) => {
    console.log(response);
    if(response.data.isUserLoggedin){
      //show directly the product details page
      loadSelectedPage('productDetails');
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserLoginstatus();
})