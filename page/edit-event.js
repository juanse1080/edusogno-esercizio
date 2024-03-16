const submitEditEventForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const title = document.getElementById("input-title").getValue();
  const description = document.getElementById("input-description").getValue();
  const event_date = document.getElementById("input-event-date").getValue();

  editEvent(id, { title, description, event_date });
};

const editEvent = async (id, data) => {
  const event = await useFetch(`http://localhost:8000/api/event/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  document.getElementById("response").innerHTML = `
    <edusogno-alert color="success">Event ${event.title} was updated</edusogno-alert>
  `;
  document.getElementById("submit-create-event").$root.disabled = true;
};

const auth = loadState("auth");

(async () => {
  if (auth) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const event = await useFetch(`http://localhost:8000/api/event/${id}`, {
      method: "GET",
    });

    document.getElementById("title").innerHTML = `Update event ${event.title}`;
    document.getElementById("input-title").setValue(event.title);
    document
      .getElementById("input-description")
      .setValue(event.description ?? "");
    document.getElementById("input-event-date").setValue(event.event_date);
  }
})();
