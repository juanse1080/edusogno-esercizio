const submitResetPasswordForm = () => {
  const temp_reset_password_code = document
    .getElementById("temp_reset_password_code")
    .getValue();
  const new_password = document.getElementById("new_password").getValue();

  resetPassword({ new_password, temp_reset_password_code });
};

const resetPassword = async (data) => {
  await useFetch("http://localhost:8000/api/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

  replace("/login");
};
