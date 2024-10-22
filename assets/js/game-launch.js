document.getElementById("actionButton").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "block";
});
window.onclick = function (event) {
  if (event.target == document.getElementById("loginModal")) {
    document.getElementById("loginModal").style.display = "none";
  }
};
document.querySelector(".close").onclick = function () {
  document.getElementById("loginModal").style.display = "none";
};
function popUpClose() {
  document.getElementById("loginModal").style.display = "none";
}
function moveToGamePage() {
  window.location.href = "/game.html";
}
document.getElementById("loginForm").onsubmit = function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way
  handleLogin();
};

async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginButton = document.getElementById("loginButton");
  const spinner = document.getElementById("spinner");
  const loginError = document.getElementById("errorMessage");

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
        // move to game page
        moveToGamePage();
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
      loginError.style.display = "block";
      loginError.textContent = error?.response?.data?.message;

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
document.getElementById("signupButton").onclick = function () {
  window.location.href = "/signup.html";
};
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