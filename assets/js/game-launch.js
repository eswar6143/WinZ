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
      '<span class="fa fa-user" aria-hidden="true">Login</span>';
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

document.getElementById("actionButton").onclick = function () {
  document.getElementById("loginModal").style.display = "block";
};

// JavaScript to handle form switching and submission logic

// Elements
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const otpForm = document.getElementById("otpForm");
const modalTitle = document.getElementById("modalTitle");
const switchToSignUpLink = document.getElementById("switchToSignUp");
const backToLoginLink = document.getElementById("backToLogin");
const closeModal = document.getElementById("closeModal");

// Switch to Sign Up form
switchToSignUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  signupForm.style.display = "block";
  otpForm.style.display = "none";
  modalTitle.textContent = "Sign Up";
});

// Switch back to Login form
backToLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.style.display = "none";
  otpForm.style.display = "none";
  loginForm.style.display = "block";
  modalTitle.textContent = "Login";
});

// Handle Sign Up form submission and OTP sending
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Simulate sending OTP
  signupForm.style.display = "none";
  otpForm.style.display = "block";
  modalTitle.textContent = "Verify OTP";
  startOtpResendTimer();
});

// Handle OTP form submission and verification
otpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Simulate OTP verification (you can add API logic here)
  alert("OTP verified successfully!");
  // Proceed to the next step or close the modal
  closeModal.click(); // Simulate closing the modal after OTP verification
});

// OTP resend timer logic
function startOtpResendTimer() {
  let timer = 30;
  const timerElement = document.getElementById("resendTimer");
  const countdown = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer === 0) {
      clearInterval(countdown);
      timerElement.textContent = "Resend OTP";
      timerElement.style.cursor = "pointer";
      timerElement.style.color = "#ffc107";
      timerElement.addEventListener("click", () => {
        console.log("Resending OTP...");
        startOtpResendTimer(); // Restart the timer after resending OTP
      });
    }
  }, 1000);
}

// Close modal logic
closeModal.addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
});
``;
