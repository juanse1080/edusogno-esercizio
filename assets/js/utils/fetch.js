const handleResponse = async (r) => {
  const result = await r.json();
  if (result.status < 400) return result.response;
  throw result;
};

const useFetch = async (
  url,
  options,
  message = "An error occurred, try again"
) => {
  try {
    const r = await fetch(url, options);
    return await handleResponse(r);
  } catch (error) {
    document.getElementById("response").innerHTML = `
      <edusogno-alert color="error">${message}</edusogno-alert>
    `;

    throw error;
  }
};

const handleLogout = () => {
  useFetch("http://localhost:8000/api/logout", {
    method: "POST",
  })
    .then(() => {})
    .catch((err) => console.error(err));

  removeState("auth");
  window.location.replace("/login");
};
