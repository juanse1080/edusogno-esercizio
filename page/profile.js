const submitEditProfileForm = async () => {
  const first_name = document.getElementById("input-first-name").getValue();
  const last_name = document.getElementById("input-last-name").getValue();

  await editProfile({ first_name, last_name });
};

const editProfile = async (data) => {
  const response = await useFetch(`http://localhost:8000/api/me`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  document.getElementById("response").innerHTML = `
    <edusogno-alert color="success">Profile was updated</edusogno-alert>
  `;
  saveState("auth", response);
};

const auth = loadState("auth");

(async () => {
  if (auth) {
    const profile = await useFetch(`http://localhost:8000/api/me`, {
      method: "GET",
    });

    document.getElementById("input-first-name").setValue(profile.first_name);
    document.getElementById("input-last-name").setValue(profile.last_name);
    document.getElementById("input-email").setValue(profile.email);
  }
})();
