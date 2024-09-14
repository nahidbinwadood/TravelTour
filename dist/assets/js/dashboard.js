// Dashboard::Start

//Theme change::Sta
const toggleButton = document.getElementById("theme-toggle");
const nightBtn = document.getElementById("night-mode");
const lightBtn = document.getElementById("light-mode");
let theme = "light";
toggleButton?.addEventListener("click", () => {
  if (theme === "light") {
    nightBtn.classList.add("hidden");
    lightBtn.classList.remove("hidden");
    theme = "dark";
  } else if (theme === "dark") {
    nightBtn.classList.remove("hidden");
    lightBtn.classList.add("hidden");
    theme = "light";
  }
});

//Theme change::End

// Image Preview::Start
const imagePreview = document.querySelector(".image-preview");
const imageFile = document.querySelector(".imageInput");
const imageFileName = document.querySelector(".imageFileName");

imageFile?.addEventListener("change", () => {
  if (imageFile.files.length) {
    const image = imageFile.files[0];
    imageFileName.textContent = image?.name;
    imagePreview.src = URL.createObjectURL(image);
  }
});
// Image Preview::End

// Pass Show/Hide::Start
function togglePassVisibility(event) {
  const button = event.currentTarget;
  const inputId = button.getAttribute("data-input");
  const inputField = document.getElementById(inputId);

  if (button.classList.contains("showBtn")) {
    inputField.type = "text";
    button.classList.add("hidden");
    button.nextElementSibling.classList.remove("hidden");
  } else if (button.classList.contains("hideBtn")) {
    inputField.type = "password";
    button.classList.add("hidden");
    button.previousElementSibling.classList.remove("hidden");
  }
}

document.querySelectorAll(".showBtn, .hideBtn").forEach((button) => {
  button?.addEventListener("click", togglePassVisibility);
});

// Pass Show/Hide::End

// Notification Popup::Start
const notificationBtn = document.getElementById("notification-btn");
const notificationContainer = document.getElementById("notification-container");
notificationBtn?.addEventListener("click", () => {
  if (notificationContainer?.classList.contains("opacity-0")) {
    notificationContainer?.classList.remove(
      "opacity-0",
      "translate-y-3",
      "-z-10",
    );
    notificationContainer?.classList.add(
      "opacity-100",
      "translate-y-0",
      "z-10",
    );
  } else if (notificationContainer?.classList.contains("opacity-100")) {
    notificationContainer?.classList.add("opacity-0", "translate-y-3", "-z-10");
    notificationContainer?.classList.remove(
      "opacity-100",
      "translate-y-0",
      "z-10",
    );
  }
});

document.addEventListener("click", (e) => {
  if (
    notificationContainer?.classList.contains("opacity-100") &&
    !notificationBtn.contains(e.target) &&
    !notificationContainer.contains(e.target)
  ) {
    notificationContainer?.classList.add("opacity-0", "translate-y-3", "-z-10");
    notificationContainer?.classList.remove(
      "opacity-100",
      "translate-y-0",
      "z-10",
    );
  }
});
// Notification Popup::End

// Sidebar::Start
const responsiveSidebar = document.getElementById("dashboard-sidebar");
const openBtn = document.getElementById("hamburger");
const sidebarCloseBtn = document.getElementById("close--menu");

openBtn?.addEventListener("click", () => {
  if (responsiveSidebar) {
    responsiveSidebar.classList.remove("-translate-x-full");
    responsiveSidebar.classList.add("translate-x-0");
    sidebarCloseBtn?.classList.remove("hidden");
    openBtn?.classList.add("hidden");
  }
});
sidebarCloseBtn?.addEventListener("click", () => {
  if (responsiveSidebar) {
    responsiveSidebar.classList.add("-translate-x-full");
    responsiveSidebar.classList.remove("translate-x-0");
    sidebarCloseBtn?.classList.add("hidden");
    openBtn?.classList.remove("hidden");
  }
});

document.addEventListener("click", (e) => {
  // Sidebar::Start
  if (
    !responsiveSidebar.contains(e.target) &&
    !openBtn.contains(e.target) &&
    responsiveSidebar.classList.contains("translate-x-0")
  ) {
    responsiveSidebar.classList.add("-translate-x-full");
    responsiveSidebar.classList.remove("translate-x-0");
    sidebarCloseBtn?.classList.add("hidden");
    openBtn?.classList.remove("hidden");
  }
  // Sidebar::End
});
// Sidebar::End

// Dashboard::End
