document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registration successful!");
    location.href = "login.html";
  } else {
    alert(data.message);
  }
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const body = {
    email: email.value,
    password: password.value,
  };

  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.user.email);
    location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
});

if (document.getElementById("welcomeText")) {
  let email = localStorage.getItem("email");
  welcomeText.textContent = "Welcome, " + (email || "User");
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.clear();
  location.href = "index.html";
});
