const auth = loadState("auth");

const adminActions = `
  <a href="/create-event">Create</a>
`;

if (auth)
  document.getElementById("user").innerHTML = `
    ${auth.is_admin ? adminActions : ""}
    <a href="/">My events</a>
    <a href="/events">Events</a> 
    <a href="/profile">${auth.first_name} ${auth.last_name}</a>
    <button class="logout" onclick="handleLogout()">
      <svg fill="#000000" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.971 384.971" xml:space="preserve">
        <g>
          <g id="Sign_Out">
            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
            C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
            C192.485,366.299,187.095,360.91,180.455,360.91z" />
            <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
            c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
            c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
          </g>
      </svg>
    </button>
  `;

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: "404",
    description: "Page not found",
  },
  "/": {
    template: "/templates/index.html",
    script: "/page/index.js",
    style: "/styles/index.css",
    title: "Home",
    description: "This is the home page",
  },
  "/login": {
    template: "/templates/login.html",
    script: "/page/login.js",
    title: "Login",
    description: "This is the login page",
  },
  "/register": {
    template: "/templates/register.html",
    script: "/page/register.js",
    title: "Register",
    description: "This is the register page",
  },
  "/profile": {
    template: "/templates/profile.html",
    script: "/page/profile.js",
    title: "Profile",
    description: "This is the profile page",
  },
  "/change-password": {
    template: "/templates/change-password.html",
    script: "/page/change-password.js",
    title: "Change password",
    description: "This is the change password page",
  },
  "/forgot-password": {
    template: "/templates/forgot-password.html",
    script: "/page/forgot-password.js",
    title: "Forgot password",
    description: "This is the forgot password page",
  },
  "/reset-password": {
    template: "/templates/reset-password.html",
    script: "/page/reset-password.js",
    title: "Restore password",
    description: "This is the restore password page",
  },
  "/events": {
    template: "/templates/events.html",
    script: "/page/events.js",
    style: "/styles/events.css",
    title: "All events",
    description: "This is the event list",
  },
  "/create-event": {
    template: "/templates/create-event.html",
    script: "/page/create-event.js",
    title: "Create event",
    description: "This is a create event page",
  },
  "/edit-event": {
    template: "/templates/edit-event.html",
    script: "/page/edit-event.js",
    title: "Edit event",
    description: "This is a edit event page",
  },
};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
  event = event || window.event; // get window.event if event argument not provided
  event.preventDefault();
  // window.history.pushState(state, unused, target link);
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  let location = window.location.pathname;
  if (location.length == 0) location = "/";

  const private_r = [
    "/",
    "/profile",
    "/change-password",
    "/events",
    "/create-event",
    "/edit-event",
  ];

  if (private_r.includes(location) && !auth) replace("/login");

  const publics = [
    "/register",
    "/login",
    "/forgot-password",
    "/reset-password",
  ];

  if (publics.includes(location) && auth) replace("/");

  const admin = ["/create-event", "/edit-event"];

  if (admin.includes(location) && !auth.is_admin) replace("/");

  const route = urlRoutes[location] || urlRoutes["404"];

  if (route.style) {
    const css = await fetch(route.style)
      .then((response) => response.text())
      .catch(() => "");
    document.getElementById("css-content").innerHTML = css;
  }

  const html = await fetch(route.template)
    .then((response) => response.text())
    .catch(() => "");
  document.getElementById("content").innerHTML = html;

  const js = await fetch(route.script)
    .then((response) => response.text())
    .catch(() => "");
  document.getElementById("js-content").innerHTML = js;

  document.title = route.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
