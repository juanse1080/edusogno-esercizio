const submitChangePasswordForm = () => {
  const password = document.getElementById("input-password").getValue();
  const new_password = document.getElementById("input-new-password").getValue();

  changePassword({ password, new_password });
};

const changePassword = async (data) => {
  await useFetch(`http://localhost:8000/api/me/change-password`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  document.getElementById("response").innerHTML = `
    <edusogno-alert color="success">Password was updated</edusogno-alert>
  `;
};
