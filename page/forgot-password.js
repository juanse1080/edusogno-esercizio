const submitForgotForm = () => {
  const email = document.getElementById("input-email").getValue();

  forgotPassword({ email });
};

const forgotPassword = async (data) => {
  await useFetch("http://localhost:8000/api/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

  replace("/reset-password");
};
