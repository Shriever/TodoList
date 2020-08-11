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
  static addActivity(activity) {
    const activities = Store.getActivities();

    activities.push(activity);

    localStorage.setItem("activities", JSON.stringify(activities));
  }
  static removeActivity(name) {
    const activities = Store.getActivities();
    activities.forEach((el, index) => {
      if (el.name === name) {
        activities.splice(index, 1);
      }
    });
    localStorage.setItem("activities", JSON.stringify(activities));
  }
}

// UI class: Control the UI
class UI {
  static displayActivities() {
    const activities = Store.getActivities();
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
      const name =
        el.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      el.parentElement.parentElement.remove();
      Store.removeActivity(name);

      UI.showAlert("Activity removed", "green");
    }
  }
  static showAlert(message, color) {
    const container = document.querySelector(".container");
    const form = document.querySelector(".row");
    const div = document.createElement("div");
    div.innerHTML = message;
    div.className = `${color} card `;

    container.insertBefore(div, form);

    // remove after three seconds
    setTimeout(() => {
      div.remove();
    }, 3000);
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

  if (name === "" || time === "") {
    UI.showAlert("Please include the activity and time", "red");
  } else {
    const activity = new Activity(name, time);

    // Add activity to UI
    UI.addActivity(activity);

    // Add activity to Store
    Store.addActivity(activity);

    // Clear inputs
    UI.clearFields();

    // Show alert
    UI.showAlert("Activity Added", "green");
  }
});
// Event: Remove an Activity
document.querySelector("#activity-list").addEventListener("click", (e) => {
  UI.removeActivity(e.target);
});
