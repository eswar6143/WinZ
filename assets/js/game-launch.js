function isLoggedIn() {
  return localStorage.getItem("authToken") !== null || undefined || "";
}

function updateButton() {
  const button = document.getElementById("actionButton");
  const logoutButton = document.getElementById("logoutButton");
  if (isLoggedIn()) {
    button.innerHTML =
      '<span class="fa fa-trophy" aria-hidden="true"></span> Play Now';
    button.onclick = () => {
      // Handle the Play Now action
      console.log("Playing now!");
    };
    // Show the logout button
    logoutButton.style.display = "inline-block";
  } else {
    button.innerHTML =
      '<span class="fa fa-user" aria-hidden="true">Login/Sign Up</span>';
    button.onclick = () => {
      document.getElementById("loginModal").style.display = "block";
    };
    // Hide the logout button
    logoutButton.style.display = "none";
  }
}
window.onclick = function (event) {
  if (event.target == document.getElementById("loginModal")) {
    document.getElementById("loginModal").style.display = "none";
  }
};
document.getElementById("loginForm").onsubmit = function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  handleLogin();
};

async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginButton = document.getElementById("loginButton");
  const spinner = document.getElementById("spinner");

  try {
    loginButton.disabled = true;
    spinner.style.display = "inline-block";
    const response = await axios.post(
      "https://stage-api.quickexch.com/account/v2/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;

      if (data) {
        // Save the token to localStorage
        localStorage.setItem("authToken", data);
        // Update the button text
        updateButton();
        popUpClose();
      } else {
        // Handle login failure when authToken is not present
        console.error(
          "Login failed:",
          data.message || "No authToken received."
        );
      }
    } else {
      // Handle non-200 responses (this would be rare with axios since it usually throws for non-2xx status codes)
      throw new Error(`Login failed with status code: ${response.status}`);
    }
  } catch (error) {
    // Handle errors during the axios request or in the response
    if (error.response) {
      console.error(
        "Error during login:",
        error.response.data.message || error.message
      );
    } else {
      console.error("Error during login:", error.message);
    }
  } finally {
    // Hide spinner and re-enable the button
    loginButton.disabled = false;
    spinner.style.display = "none";
  }
}

function handleLogout() {
  localStorage.removeItem("authToken");
  updateButton();
}

// Call the function to update the button when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  updateButton();
});
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const eyeOpenIcon = document.getElementById("eyeOpen");
    const eyeClosedIcon = document.getElementById("eyeClosed");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeOpenIcon.style.display = "none";
      eyeClosedIcon.style.display = "block";
    } else {
      passwordInput.type = "password";
      eyeOpenIcon.style.display = "block";
      eyeClosedIcon.style.display = "none";
    }
  });

document.getElementById("actionButton").onclick = function () {
  document.getElementById("loginModal").style.display = "block";
};

document.querySelector(".close").onclick = function () {
  document.getElementById("loginModal").style.display = "none";
};
function popUpClose() {
  document.getElementById("loginModal").style.display = "none";
}

window.onclick = function (event) {
  if (event.target == document.getElementById("loginModal")) {
    document.getElementById("loginModal").style.display = "none";
  }
};

function playNow() {
  const payload = {
    gameId: "900001",
    platformId: "desktop",
    providerName: "RG",
    subProviderName: "Royal Gaming",
  };

  axios
    .post(
      "https://stage-api.quickexch.com/catalog/v2/live-casino/game-url",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
      }
    )
    .then((response) => {
      console.log("API Response:", response);
      if (response) {
        // Display the iframe and load the URL
        const iframeContainer = document.getElementById("gameModal");
        const gameIframe = document.getElementById("gameIframe");
        gameIframe.src = response.data;
        iframeContainer.style.display = "block"; // Show the iframe container
      } else {
        console.error("Iframe URL not found in the response.");
      }
    })
    .catch((error) => {
      console.error("Error during API call:", error.message);
    });
}

// Add the click event listener to the "Play Now" button
document.getElementById("actionButton").addEventListener("click", playNow);
document.getElementById("closeIframeModal").addEventListener("click", () => {
  document.getElementById("gameModal").style.display = "none";
  document.getElementById("gameIframe").src = ""; // Clear the iframe source
});

function logout() {
  axios
    .post(
      "https://stage-api.quickexch.com/account/v2/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"), // Sending the authorization token
        },
      }
    )
    .then((response) => {
      console.log("Logout successful:", response.data);
      // Clear the token and user data from localStorage
      localStorage.removeItem("authToken");
      updateButton();
    })
    .catch((error) => {
      console.error("Error during logout:", error.message);
    });
}

// Add the click event listener to the "Logout" button
document.getElementById("logoutButton").addEventListener("click", logout);
document.getElementById("signupButton").onclick = function () {
  document.getElementById("signupModal").style.display = "block";
};

document
  .getElementById("signUp-closeModal")
  .addEventListener("click", function () {
    document.getElementById("signupModal").style.display = "none";
  });

document.addEventListener("click", function (event) {
  if (event.target == document.getElementById("signUp-signupModal")) {
    document.getElementById("signUp-signupModal").style.display = "none";
  }
});

const phoneNumberInput = document.getElementById("signUp-phoneNumber");
const enteredPhoneNumberInput = document.getElementById(
  "signUp-entered-phoneNumber"
);

const signUpLoginButton = document.getElementById("loginAccount-buuton");
signUpLoginButton.addEventListener("click", () => {
  document.getElementById("signUp-signupModal").style.display = "none"; // Close Sign up modal
  document.getElementById("loginModal").style.display = "block";
});

const termsCheckbox = document.getElementById("termsCheckbox");
const sendOTPButton = document.getElementById("sendOTPButton");
const verifyOTPButton = document.getElementById("verifyOTPButton");
const phoneError = document.getElementById("phoneError");
const termsError = document.getElementById("termsError");
const otpError = document.getElementById("otpError");
const userDetailsSection = document.getElementById("form3-userDetails");
const userDetailsError = document.getElementById("userDetailsError");
const usernameInput = document.getElementById("signUp-username");
const usernameError = document.getElementById("signUp-usernameError");
const fullnameInput = document.getElementById("signUp-fullname");
const fullnameError = document.getElementById("signUp-fullnameError");
const passwordInput = document.getElementById("signUp-password");
const passwordError = document.getElementById("signUp-passwordError");

// Ensure the input always starts with "+91"
phoneNumberInput.addEventListener("input", function (event) {
  event.preventDefault();
  phoneError.style.display = "none";
  phoneError.textContent = "";
  termsError.style.display = "none";
  otpError.style.display = "none";

  if (!phoneNumberInput.value.startsWith("+91")) {
    phoneNumberInput.value = "+91";
  }

  const enteredNumber = phoneNumberInput.value.slice(1);
  if (enteredNumber.length === 12) {
    checkNumberExists(enteredNumber);
  } else {
    sendOTPButton.disabled = true;
  }
});

function checkNumberExists(number) {
  axios
    .get(
      `https://stage-api.quickexch.com/account/v2/users/phones/${number}/:exists`
    )
    .then(function (response) {
      if (response.data) {
        phoneError.textContent = "This phone number already exists.";
        phoneError.style.display = "block";
        sendOTPButton.disabled = true;
      } else {
        sendOTPButton.disabled = !termsCheckbox.checked;
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}

termsCheckbox.addEventListener("change", function () {
  const enteredNumber = phoneNumberInput.value.slice(3);
  if (termsCheckbox.checked) {
    termsError.style.display = "none";
  }
  sendOTPButton.disabled = !(
    termsCheckbox.checked && enteredNumber.length === 10
  );
});

sendOTPButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (!termsCheckbox.checked) {
    termsError.textContent = "Please agree to the terms and conditions.";
    termsError.style.display = "block";
  } else {
    const phoneNumber = phoneNumberInput.value.slice(1);
    axios
      .post(
        `https://stage-api.quickexch.com/account/v2/otp/?mobileNumber=${phoneNumber}`
      )
      .then(function (response) {
        if (response) {
          enteredPhoneNumberInput.value = phoneNumberInput.value;
          document.getElementById("form1-phoneNumber").style.display = "none";
          document.getElementById("form2-verifyOTP").style.display = "block";
        } else {
          phoneError.textContent = "Failed to send OTP. Please try again.";
          phoneError.style.display = "block";
        }
      })
      .catch(function (error) {
        console.error("Error sending OTP:", error);
        phoneError.textContent = error?.response?.data?.message;
        phoneError.style.display = "block";
      });
  }
});

verifyOTPButton.addEventListener("click", function (event) {
  event.preventDefault();
  const otp = document.getElementById("signUp-otp").value;

  if (otp.trim() === "") {
    otpError.textContent = "Please enter the OTP.";
    otpError.style.display = "block";
    return;
  }

  const phoneNumber = phoneNumberInput.value.slice(3);
  axios
    .post(
      `https://stage-api.quickexch.com/account/v2/otp/validate?mobileNumber=${phoneNumber}&otp=${otp}`
    )
    .then(function (response) {
      console.log("r", response);
      if (true) {
        otpError.style.display = "none";
        document.getElementById("form2-verifyOTP").style.display = "none";
        userDetailsSection.style.display = "block"; // Show user details form after OTP verification
      } else {
        otpError.textContent = "Incorrect OTP. Please try again.";
        otpError.style.display = "block";
      }
    })
    .catch(function (error) {
      console.error("Error verifying OTP:", error);
      otpError.textContent = error?.response?.data?.message;
      otpError.style.display = "block";
      document.getElementById("form2-verifyOTP").style.display = "none";
      userDetailsSection.style.display = "block";
    });
});

// Handle Username Input for "username exists" API call
usernameInput.addEventListener("input", function () {
  const username = usernameInput.value;
  const usernamePattern = /^[a-zA-Z0-9]{4,15}$/;

  // Check if username length is greater than or equal to 4 characters
  if (!usernamePattern.test(username)) {
    usernameError.textContent =
      "Username must be 3-15 characters long and contain only letters and numbers";
    usernameError.style.display = "block";
    return;
  } else {
    usernameError.style.display = "none";
  }

  if (username.length >= 4) {
    checkUsernameExists(username);
  }
});

function checkUsernameExists(username) {
  axios
    .get(`https://stage-qe-api.cu8.io/account/v2/users/${username}/:exists`)
    .then(function (response) {
      if (response.data) {
        usernameError.textContent = "This username is already Used";
        usernameError.style.display = "block";
      } else {
        usernameError.style.display = "none";
      }
    })
    .catch(function (error) {
      console.error("Error checking username:", error);
    });
}

document
  .getElementById("form3-userDetails")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("signUp-username").value;
    const fullname = document.getElementById("signUp-fullname").value;
    const password = document.getElementById("signUp-password").value;
    const phoneNumber = phoneNumberInput.value.slice(1);
    const otp = document.getElementById("signUp-otp").value;

    if (!username || !fullname || !password) {
      userDetailsError.textContent = "All fields are required.";
      userDetailsError.style.display = "block";
      return;
    }

    // API call to save user details
    axios
      .post("https://stage-qe-api.cu8.io/account/v2/accounts/signup", {
        fullName: fullname,
        otp: otp,
        password: password,
        phoneNumber: phoneNumber,
        referralCode: null,
        username: username,
      })
      .then(function (response) {
        console.log("rr", response);

        if (response.data.success) {
          signUpLogin();
        } else {
          userDetailsError.textContent =
            "Failed to register. Please try again.";
          userDetailsError.style.display = "block";
        }
      })
      .catch(function (error) {
        signUpLogin();
        console.error("Error saving user details:", error);
        userDetailsError.textContent = error?.response?.data?.message;
        userDetailsError.style.display = "block";
      });
  });
async function signUpLogin() {
  const username = document.getElementById("signUp-username").value;
  const password = document.getElementById("signUp-password").value;
  try {
    loginButton.disabled = true;
    spinner.style.display = "inline-block";
    const response = await axios.post(
      "https://stage-api.quickexch.com/account/v2/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;

      if (data) {
        // Save the token to localStorage
        localStorage.setItem("authToken", data);
        // Update the button text
        updateButton();
        document.getElementById("signUp-signupModal").style.display = "none"; // Close modal after success
      } else {
        // Handle login failure when authToken is not present
        console.error(
          "Login failed:",
          data.message || "No authToken received."
        );
      }
    } else {
      // Handle non-200 responses (this would be rare with axios since it usually throws for non-2xx status codes)
      throw new Error(`Login failed with status code: ${response.status}`);
    }
  } catch (error) {
    // Handle errors during the axios request or in the response
    if (error.response) {
      console.error(
        "Error during login:",
        error.response.data.message || error.message
      );
    } else {
      console.error("Error during login:", error.message);
    }
  } finally {
    // Hide spinner and re-enable the button
    loginButton.disabled = false;
    spinner.style.display = "none";
  }
}
