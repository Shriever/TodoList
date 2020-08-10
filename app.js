// Activity class: Defines an Activity
class Activity {
  constructor(name, time) {
    this.name = name;
    this.time = time;
  }
}
// Store class: store activities in localStorage

// UI class: Control the UI
class UI {
  static displayActivities() {
    const activities = [
      {
        name: "run",
        time: "6:00",
      },
      {
        name: "jump",
        time: "7:00",
      },
    ];
    const list = document.querySelector("#activity-list");

    activities.forEach((el) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${el.name}</td>
        <td>${el.time}</td>
        <td><a href="#" class="btn waves-effect waves-light red delete">X</a></td>`;

      list.appendChild(row);
    });
  }
}

// Event: Display Activities
document.addEventListener("DOMContentLoaded", () => {
  UI.displayActivities();
});

// Event: Add an Activity
document.querySelector("#activity-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const time = document.querySelector("#time").value;

  const activity = new Activity(name, time);

  UI.displayActivities();
});
// Event: Remove an Activity
