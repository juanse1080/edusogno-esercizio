const submitLoginForm = () => {
  const email = document.getElementById("input-email").getValue();
  const password = document.getElementById("input-password").getValue();

  login({ email, password });
};

const login = async (data) => {
  const response = await useFetch(
    "http://localhost:8000/api/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    "Wrong credentials"
  );

  saveState("auth", response);
  replace("/");
};
