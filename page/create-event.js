const submitCreateEventForm = () => {
  const title = document.getElementById("input-title").getValue();
  const description = document.getElementById("input-description").getValue();
  const event_date = document.getElementById("input-event-date").getValue();

  createEvent({ title, description, event_date });
};

const createEvent = async (data) => {
  await useFetch("http://localhost:8000/api/event", {
    method: "POST",
    body: JSON.stringify(data),
  });

  document.getElementById("response").innerHTML = `
    <edusogno-alert color="success">Event ${data.title} was created</edusogno-alert>
  `;
  document.getElementById("submit-create-event").$root.disabled = true;
};
