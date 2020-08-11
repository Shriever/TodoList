// Activity class: Defines an Activity
class Activity {
  constructor(name, time) {
    this.name = name;
    this.time = time;
  }
}
// Store class: store activities in localStorage
class Store {
  static getActivities() {
    let activities = [];
    if (localStorage.getItem("activities")) {
      activities = localStorage.getItem("activities");
    } else {
      localStorage.setItem("activities", JSON.stringify(activities));
    }
    return JSON.parse(activities);
  }
  static addActivity(name, time) {
    let activities = Store.getActivities();
    const newActivity = {
      name: name,
      time: time,
    };

    activities.push(newActivity);

    localStorage.setItem("activities", JSON.stringify(activities));
  }
}

// UI class: Control the UI
class UI {
  static displayActivities() {
    const activities = Store.getActivities();
    console.log(activities);
    activities.forEach((el) => {
      UI.addActivity(el);
    });
  }
  static addActivity(activity) {
    const list = document.querySelector("#activity-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${activity.name}</td>
        <td>${activity.time}</td>
        <td><a href="#" class="btn waves-effect waves-light red delete">X</a></td>`;

    list.appendChild(row);
  }
  static removeActivity(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#time").value = "";
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

  // Add activity to UI
  UI.addActivity(activity);

  // Add activity to Store
  Store.addActivity(activity);

  // Clear inputs
  UI.clearFields();
});
// Event: Remove an Activity
document.querySelector("#activity-list").addEventListener("click", (e) => {
  UI.removeActivity(e.target);
});
