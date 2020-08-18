const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");
const triggers = document.querySelectorAll(".cool > li");

function handleEnter() {
  this.classList.add("trigger-enter");
  setTimeout(
    () =>
      this.classList.contains("trigger-enter") &&
      this.classList.add("trigger-enter-active"),
    150
  );
  background.classList.add("open");

  const dropdown = this.querySelector(".dropdown");
  // Destruction
  const { width, height, top, left } = dropdown.getBoundingClientRect();
  const { top: navCordsTop, left: navCordsLeft } = nav.getBoundingClientRect();

  background.style.setProperty("width", `${width}px`);
  background.style.setProperty("height", `${height}px`);
  background.style.setProperty(
    "transform",
    `translate(${left - navCordsLeft}px, ${top - navCordsTop}px)`
  );
}

function handleLeave() {
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);
