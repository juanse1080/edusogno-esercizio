const auth = loadState("auth");

const getEvents = async () => {
  try {
    const r = await fetch("http://localhost:8000/api/me/event", {
      method: "GET",
    });
    return handleResponse(r);
  } catch (err) {
    return console.error(err);
  }
};

(async () => {
  if (auth) {
    document.getElementById("user-name").innerHTML =
      loadState("auth").first_name;

    const events = await getEvents();

    document.getElementById("home-content").innerHTML = events.reduce(
      (acc, event) =>
        acc +
        `
          <edusogno-event 
            title="${event.title}" 
            event_date="${event.event_date}" 
            description="${event.description}" 
            action="false" 
            added="false"
            edit="${!!auth.is_admin}"
            key="${event.id}"
          ></edusogno-event>
        `,
      ""
    );
  }
})();
