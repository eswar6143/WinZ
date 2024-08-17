function isLoggedIn() {
  return localStorage.getItem("authToken") !== null;
}

function updateButton() {
  const button = document.getElementById("actionButton");

  if (isLoggedIn()) {
    button.innerHTML =
      '<span class="fa fa-trophy" aria-hidden="true"></span> Play Now';
    button.onclick = () => {
      // Handle the Play Now action
      console.log("Playing now!");
    };
  } else {
    button.innerHTML = "Login/Sign Up";
    button.onclick = () => {
      // Redirect to login/sign up page or trigger login function
      handleLogin();
    };
  }
}

function handleLogin() {
  const username = "your-username"; // Replace with your input
  const password = "your-password"; // Replace with your input

  fetch("https://api.cue88.com/account/v2/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.authToken) {
        // Save the token to localStorage
        localStorage.setItem("authToken", data.authToken);
        // Update the button text
        updateButton();
      } else {
        // Handle login failure
        console.error("Login failed:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}

function handleLogout() {
  localStorage.removeItem("authToken");
  updateButton();
}

// Call the function to update the button when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  updateButton();
});
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", function () {
    const isPasswordVisible = passwordInput.type === "text";
    if (isPasswordVisible) {
      passwordInput.type = "password";
      passwordInput.value = "*".repeat(passwordInput.value.length);
      togglePassword.classList.remove("fa-eye-slash");
      togglePassword.classList.add("fa-eye");
    } else {
      passwordInput.type = "text";
      passwordInput.value = passwordInput.getAttribute("data-plain-text");
      togglePassword.classList.remove("fa-eye");
      togglePassword.classList.add("fa-eye-slash");
    }
  });

  passwordInput.addEventListener("input", function () {
    // Store the plain text password in a data attribute for later use
    passwordInput.setAttribute("data-plain-text", passwordInput.value);

    if (passwordInput.type === "password") {
      // Display hashed characters visually
      passwordInput.value = "*".repeat(passwordInput.value.length);
    }
  });
});
