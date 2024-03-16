const submitLoginForm = () => {
  const email = document.getElementById("input-email").getValue();
  const password = document.getElementById("input-password").getValue();

  login({ email, password });
};

const login = (data) => {
  fetch("http://localhost:8000/api/login", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((data) => {
      saveState("auth", data);
      window.location.replace("/");
    })
    .catch((err) => console.error(err));
};
