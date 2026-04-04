// Alert.js
export default class Alert {
  constructor(jsonPath = "/Alerts.json") {
    this.jsonPath = jsonPath;
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Failed to fetch alerts.json");
      const alerts = await response.json();

      if (alerts.length > 0) {
        this.createAlertSection(alerts);
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }

  createAlertSection(alerts) {
    const main = document.querySelector("main");
    if (!main) return;

    // Create container for alerts
    const section = document.createElement("section");
    section.classList.add("alert-list");

    // Loop through alerts and create <p> for each
    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background || "gray";
      p.style.color = alert.color || "white";
      p.style.padding = "10px";
      p.style.marginBottom = "5px";
      p.style.borderRadius = "5px";
      section.appendChild(p);
    });

    // Prepend section to main
    main.prepend(section);
  }
}
