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

document.addEventListener("DOMContentLoaded", function () {
  // Initialize a Flatpickr instance without using an extra input field
  const datePickerDiv = document.getElementById("dob-show");
  const dateSpan = document.getElementById("date-of-birth");

  // Initialize Flatpickr on a virtual input
  const flatpickrInstance = flatpickr(datePickerDiv, {
    dateFormat: "d-m-Y",
    defaultDate: "19-08-08", // Initial date
    clickOpens: false, // Disable default click behavior
    onReady: function (selectedDates, dateStr) {
      // Display initial date in the div
      dateSpan.textContent = dateStr || "19-08-08";
    },
    onChange: function (selectedDates, dateStr) {
      // Update the div with the selected date
      dateSpan.textContent = dateStr;
    },
  });

  // Add click event listener to open the Flatpickr calendar
  datePickerDiv.addEventListener("click", function () {
    flatpickrInstance.open();
  });
});

// Dashboard::End






// dob:start

// Select the DOB container and related elements
const dobContainer = document.getElementById("dob-show-container");
const dobInput = document.getElementById("dob-input");
const dobCalendar = document.getElementById("dob-date-show-calendar");
const dobCalendarDays = document.getElementById("dobCalendarDays");
const monthLabelDOBCalendar = document.getElementById("monthLabelDOBCalendar");
const prevButtonDOBCalendar = document.getElementById("prevButtonDOBCalendar");
const nextButtonDOBCalendar = document.getElementById("nextButtonDOBCalendar");

let currentMonthDOB = new Date().getMonth();
let currentYearDOB = new Date().getFullYear();
let selectedDateDOB = null;

// Function to show the calendar
function showDOBCalendar() {
  dobCalendar.classList.remove("opacity-0", "-z-20", "translate-y-5");
  dobCalendar.classList.add("opacity-100", "z-20", "translate-y-0");
}

// Function to hide the calendar
function hideDOBCalendar() {
  dobCalendar.classList.add("opacity-0", "-z-20", "translate-y-5");
  dobCalendar.classList.remove("opacity-100", "z-20", "translate-y-0");
}

// Render the calendar for DOB
function renderDOBCalendar(month, year) {
  if (dobCalendarDays) {
    dobCalendarDays.innerHTML = "";
  }

  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  // Update the month label
  if (monthLabelDOBCalendar) {
    monthLabelDOBCalendar.textContent = new Date(year, month).toLocaleString(
      "default",
      { month: "long" }
    ) + ` ${year}`;
  }

  // Add empty spaces for the first days
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    dobCalendarDays.appendChild(emptyDay);
  }

  // Add day elements to the calendar
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day;
    dayElement.classList.add(
      "cursor-pointer",
      "flex",
      "items-center",
      "justify-center",
      "size-10",
      "rounded-xl",
      "hover:bg-gray-300"
    );

    // Highlight the selected day
    if (
      selectedDateDOB &&
      selectedDateDOB.getDate() === day &&
      selectedDateDOB.getMonth() === month &&
      selectedDateDOB.getFullYear() === year
    ) {
      dayElement.classList.add("bg-blue-400", "text-white");
    }

    dayElement.addEventListener("click", function (event) {
      event.stopPropagation(); // Ensure this click doesn't trigger document click listener
      // Clear previous selection
      if (selectedDateDOB) {
        const previousSelectedDay = dobCalendarDays.querySelector(
          ".bg-blue-400"
        );
        if (previousSelectedDay) {
          previousSelectedDay.classList.remove("bg-blue-400", "text-white");
        }
      }

      // Set the new selected date
      selectedDateDOB = new Date(year, month, day);
      dayElement.classList.add("bg-blue-400", "text-white");
      dobInput.value = selectedDateDOB.toLocaleDateString("en-GB");

      // Hide the calendar after selection
      hideDOBCalendar();
    });

    if (dobCalendarDays) {
      dobCalendarDays.appendChild(dayElement);
    }
  }
}

// Event listeners for next and previous buttons
prevButtonDOBCalendar?.addEventListener("click", () => {
  currentMonthDOB--;
  if (currentMonthDOB < 0) {
    currentMonthDOB = 11;
    currentYearDOB--;
  }
  renderDOBCalendar(currentMonthDOB, currentYearDOB);
});

nextButtonDOBCalendar?.addEventListener("click", () => {
  currentMonthDOB++;
  if (currentMonthDOB > 11) {
    currentMonthDOB = 0;
    currentYearDOB++;
  }
  renderDOBCalendar(currentMonthDOB, currentYearDOB);
});

// Show the calendar when clicking on the DOB input container
dobContainer?.addEventListener("click", (event) => {
  event.stopPropagation(); // Stop event from propagating to document click listener
  showDOBCalendar();
});

// Hide the calendar when clicking outside
document.addEventListener("click", (event) => {
  if (
    !dobContainer.contains(event.target) &&
    !dobCalendar.contains(event.target)
  ) {
    hideDOBCalendar();
  }
});

// Initial render for the current month/year
renderDOBCalendar(currentMonthDOB, currentYearDOB);

// dob:end
