const submitRegisterForm = () => {
  const first_name = document.getElementById("input-first-name").getValue();
  const last_name = document.getElementById("input-last-name").getValue();
  const email = document.getElementById("input-email").getValue();
  const password = document.getElementById("input-password").getValue();

  register({ first_name, last_name, email, password });
};

const register = (data) => {
  fetch("http://localhost:8000/api/register", {
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
