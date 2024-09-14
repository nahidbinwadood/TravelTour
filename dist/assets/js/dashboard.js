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

// Dashboard::End
