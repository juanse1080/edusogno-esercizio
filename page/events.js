const auth = loadState("auth");

const getAllEvents = async () => {
  try {
    const r = await fetch("http://localhost:8000/api/event", {
      method: "GET",
    });

    return handleResponse(r);
  } catch (err) {
    return console.error(err);
  }
};

const joinEvent = async (id) => {
  try {
    const r = await fetch(`http://localhost:8000/api/me/event/${id}`, {
      method: "POST",
    });

    return handleResponse(r);
  } catch (err) {
    return console.error(err);
  }
};

const handleJoin = async (id) => {
  const cardEvent = document.getElementById(`event-${id}`);
  cardEvent.$button.setAttribute("loading", true);
  await joinEvent(id).catch((err) => console(err));
  cardEvent.$button.setAttribute("loading", false);
  cardEvent.setAttribute("action", false);
  cardEvent.setAttribute("added", true);
};

(async () => {
  if (auth) {
    document.getElementById("user-name").innerHTML =
      loadState("auth").first_name;

    const events = await getAllEvents();

    document.getElementById("events-content").innerHTML = events.reduce(
      (acc, event) => {
        const isAdded = event.users.includes(auth.id);

        return `
          ${acc}
          <edusogno-event 
            id="event-${event.id}" 
            title="${event.title}" 
            event_date="${event.event_date}" 
            description="${event.description}" 
            onclick="handleJoin(${event.id})" 
            action="${!isAdded}" 
            added="${!!isAdded}"
            edit="${!!auth.is_admin}"
            key="${event.id}"
          ></edusogno-event>
        `;
      },
      ""
    );
  }
})();
