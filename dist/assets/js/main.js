const closeMenu = document.getElementById("close--menu");
const openMenu = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
document.getElementById("hamburger")?.addEventListener("click", function () {
  closeMenu.classList.remove("hidden");
  sidebar.classList.remove("-translate-x-full");
  openMenu.classList.add("hidden");
});
document.getElementById("close--menu")?.addEventListener("click", function () {
  openMenu.classList.remove("hidden");
  closeMenu.classList.add("hidden");
  sidebar.classList.add("-translate-x-full");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !openMenu.contains(e.target)) {
    openMenu.classList.remove("hidden");
    closeMenu.classList.add("hidden");
    sidebar.classList.add("-translate-x-full");
  }
});

// Check In
$(document).ready(function () {
  $("select").niceSelect();

  // select the date of departure:start
  // Select the date of departure:start
  const departureCalendarHomepageUnique = document.getElementById(
    "departure-date-show-calendar-unique",
  );
  const departureCalendarDaysUnique = document.getElementById(
    "departureCalendarDaysUnique",
  );
  const monthLabelUnique = document.getElementById(
    "monthLabelDepartureCalendarUnique",
  );
  const prevButtonUnique = document.getElementById(
    "prevButtonDepartureCalendarUnique",
  );
  const nextButtonUnique = document.getElementById(
    "nextButtonDepartureCalendarUnique",
  );
  const containerUnique = document.querySelector(
    ".departure--start--date-unique",
  );
  let currentMonthUnique = new Date().getMonth();
  let currentYearUnique = new Date().getFullYear();
  let selectedDateUnique = null;

  // Function to show the calendar
  function showCalendar() {
    departureCalendarHomepageUnique.classList.remove(
      "opacity-0",
      "-z-20",
      "translate-y-5",
    );
    departureCalendarHomepageUnique?.classList.add(
      "opacity-100",
      "z-20",
      "translate-y-0",
    );
  }

  // Function to hide the calendar
  function hideCalendar() {
    departureCalendarHomepageUnique?.classList.add(
      "opacity-0",
      "-z-20",
      "translate-y-5",
    );
    departureCalendarHomepageUnique?.classList.remove(
      "opacity-100",
      "z-20",
      "translate-y-0",
    );
  }

  // Render the calendar with updated month/year
  function renderDepartureCalendarUnique(month, year) {
    if (departureCalendarDaysUnique) {
      departureCalendarDaysUnique.innerHTML = "";
    }
    const firstDayUnique = new Date(year, month).getDay();
    const daysInMonthUnique = 32 - new Date(year, month, 32).getDate();

    if (monthLabelUnique) {
      monthLabelUnique.textContent =
        new Date(year, month).toLocaleString("default", { month: "long" }) +
        " " +
        year;
    }

    // Fill in the days
    for (let i = 0; i < firstDayUnique; i++) {
      const emptyDayUnique = document.createElement("div");
      departureCalendarDaysUnique.appendChild(emptyDayUnique);
    }

    for (let day = 1; day <= daysInMonthUnique; day++) {
      const dayElementUnique = document.createElement("div");
      dayElementUnique.textContent = day;
      dayElementUnique.classList.add(
        "cursor-pointer",
        "flex",
        "items-center",
        "justify-center",
        "size-10",
        "rounded-xl",
        "hover:bg-gray-300",
      );

      // If day is selected, apply a different background
      if (
        selectedDateUnique &&
        selectedDateUnique.getDate() === day &&
        selectedDateUnique.getMonth() === month &&
        selectedDateUnique.getFullYear() === year
      ) {
        dayElementUnique.classList.add("bg-blue-400", "text-white");
      }

      dayElementUnique.addEventListener("click", function (event) {
        event.stopPropagation(); // Ensure this click doesn't trigger the outside click listener
        if (selectedDateUnique) {
          // Clear the previous selected date background
          const previouslySelectedDayUnique =
            departureCalendarDaysUnique.querySelector(".bg-blue-400");
          if (previouslySelectedDayUnique) {
            previouslySelectedDayUnique.classList.remove(
              "bg-blue-400",
              "text-white",
            );
            previouslySelectedDayUnique.classList.add("hover:bg-gray-300");
          }
        }

        // Set the new selected date
        selectedDateUnique = new Date(year, month, day);
        dayElementUnique.classList.add("bg-blue-400", "text-white");
        document.getElementById("departure--start--date").value =
          selectedDateUnique.toLocaleDateString();

        // Hide the calendar after selecting the date
        hideCalendar();
      });

      departureCalendarDaysUnique?.appendChild(dayElementUnique);
    }
  }

  prevButtonUnique?.addEventListener("click", () => {
    currentMonthUnique--;
    if (currentMonthUnique < 0) {
      currentMonthUnique = 11;
      currentYearUnique--;
    }
    renderDepartureCalendarUnique(currentMonthUnique, currentYearUnique);
  });

  nextButtonUnique?.addEventListener("click", () => {
    currentMonthUnique++;
    if (currentMonthUnique > 11) {
      currentMonthUnique = 0;
      currentYearUnique++;
    }
    renderDepartureCalendarUnique(currentMonthUnique, currentYearUnique);
  });

  renderDepartureCalendarUnique(currentMonthUnique, currentYearUnique);

  // Show calendar when clicking on the container
  if (containerUnique) {
    containerUnique.addEventListener("click", (event) => {
      event.stopPropagation(); // Stop propagation so that it doesn't trigger the document click event
      showCalendar();
    });
  }

  // Hide calendar if clicking outside the calendar or container
  document.addEventListener("click", (event) => {
    if (
      !containerUnique?.contains(event.target) &&
      !departureCalendarHomepageUnique?.contains(event.target)
    ) {
      hideCalendar();
    }
  });
  // select the date of departure:end

  //dob:start

  //dob:end

  // profile popup::start
  const profilePicture = document.getElementById("user-profile-picture");
  const profileContainer = document.getElementById("profile-container");

  profilePicture?.addEventListener("click", () => {
    if (profileContainer) {
      if (profileContainer.classList.contains("opacity-0")) {
        profileContainer.classList.remove(
          "opacity-0",
          "-z-50",
          "translate-y-2",
        );
        profileContainer.classList.add("opacity-100", "z-50", "translate-y-0");
      } else if (profileContainer.classList.contains("opacity-100")) {
        profileContainer.classList.add("opacity-0", "-z-50", "translate-y-2");
        profileContainer.classList.remove(
          "opacity-100",
          "z-50",
          "translate-y-0",
        );
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !profileContainer.contains(e.target) &&
      !profilePicture.contains(e.target)
    ) {
      profileContainer.classList.add("opacity-0", "-z-50", "translate-y-2");
      profileContainer.classList.remove("opacity-100", "z-50", "translate-y-0");
    }
  });
  // profile popup::end

  // Initialize Flatpickr for Check-In Date

  // // Select all tab elements
  // const tabs = document.querySelectorAll(".tab");

  // // Function to handle tab switching
  // function switchTab(event) {
  //   // Remove active styles from all tabs
  //   tabs.forEach((tab) => {
  //     tab.classList.remove(
  //       "text-primary",
  //       "border",
  //       "border-primary",
  //       "rounded-[20px]",
  //       "px-6",
  //       "py-1",
  //     );
  //   });

  //   // Add active styles to the clicked tab
  //   event.target.classList.add(
  //     "text-primary",
  //     "border",
  //     "border-primary",
  //     "rounded-[20px]",
  //     "px-6",
  //     "py-1",
  //   );
  // }

  // // Add click event listeners to all tabs
  // tabs.forEach((tab) => {
  //   tab.addEventListener("click", switchTab);
  // });

  //Wishlist Icon::start
  const wishlistIcons = document.querySelectorAll(".wishlist-icon");
  wishlistIcons?.forEach((wishlistIcon) => {
    wishlistIcon?.addEventListener("click", () => {
      const path = wishlistIcon.querySelector("path");
      if (path.getAttribute("fill") === "#FF5108") {
        path.setAttribute("fill", "none");
      } else {
        path.setAttribute("fill", "#FF5108");
      }
    });
  });
  //Wishlist Icon::end

  // Tabs:

  const tabs = document.querySelectorAll(".tab");
  const indicator = document.querySelector(".indicator");
  const panels = document.querySelectorAll(".tab-panel");

  // Function to move the indicator
  const moveIndicator = (tab) => {
    const tabRect = tab?.getBoundingClientRect();
    const parentRect = tab?.parentElement.getBoundingClientRect();

    if (tabRect && parentRect) {
      const leftPosition = tabRect.left - parentRect.left;
      const topPosition = tabRect.top - parentRect.top;

      // Ensure the indicator is correctly positioned
      indicator.style.width = `${tabRect.width}px`;
      indicator.style.height = `${tabRect.height}px`;
      indicator.style.transform = `translate(${leftPosition}px, ${topPosition}px)`;
    }
  };

  // Function to activate the selected tab and panel
  const activateTab = (tab) => {
    const tabId = tab?.getAttribute("aria-controls");

    // Move indicator
    moveIndicator(tab);

    // Update panels visibility based on the selected tab
    panels.forEach((panel) => {
      const panelId = panel.getAttribute("id");
      if (panelId === tabId) {
        panel.classList.remove("invisible", "opacity-0");
        panel.classList.add("visible", "opacity-100");
      } else {
        panel.classList.remove("visible", "opacity-100");
        panel.classList.add("invisible", "opacity-0");
      }
    });

    // Update selected state for tabs
    tabs.forEach((t) => {
      t.setAttribute("aria-selected", "false");
      t.classList.remove("text-primary");
      t.setAttribute("tabindex", "-1");
    });

    // Set selected tab
    if (tab) {
      tab.setAttribute("aria-selected", "true");
      tab.classList.add("text-primary");
      tab.setAttribute("tabindex", "0");
    }
  };

  // Function to handle window resize and recalculate the indicator position
  const handleResize = () => {
    const activeTab =
      document.querySelector(".tab[aria-selected='true']") || tabs[0];
    moveIndicator(activeTab); // Recalculate indicator position on resize
  };

  // Add event listeners to tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab);
    });

    // Allow keyboard navigation
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const nextTab = tab.nextElementSibling || tabs[0];
        nextTab.focus();
        activateTab(nextTab);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const prevTab = tab.previousElementSibling || tabs[tabs.length - 1];
        prevTab.focus();
        activateTab(prevTab);
      }
    });
  });

  // Ensure that the indicator is correctly aligned on initial load
  window.addEventListener("load", () => {
    const activeTab =
      document.querySelector(".tab[aria-selected='true']") || tabs[0];
    activateTab(activeTab); // Activate the first tab or the active one on load
  });

  // Ensure indicator stays aligned on window resize
  window.addEventListener("resize", handleResize);

  // Tabs:End

  // Owl Carousel::Start
  $(".destination--slider .owl-carousel").owlCarousel({
    loop: true, // Enable looping for infinite scroll
    margin: 40,
    nav: true, // Show next/prev navigation arrows
    autoplay: true, // Enable autoplay (optional)
    autoplayTimeout: 3000, // Set autoplay speed (3 seconds in this example)
    autoplayHoverPause: true, // Pause autoplay on hover (optional)
    nav: true, // Show navigation arrows
    responsive: {
      0: {
        items: 1, // Number of items for screens up to 600px wide
      },
      768: {
        items: 2, // Number of items for screens up to 1000px wide
      },
      1000: {
        items: 3, // Number of items for screens wider than 1000px
      },
    },
  });
  $(".about--us--slider .owl-carousel").owlCarousel({
    loop: true, // Enable looping for infinite scroll
    margin: 40,
    nav: true, // Show next/prev navigation arrows
    autoplay: true, // Enable autoplay (optional)
    autoplayTimeout: 3000, // Set autoplay speed (3 seconds in this example)
    autoplayHoverPause: true, // Pause autoplay on hover (optional)
    nav: false, // Show navigation arrows
    responsive: {
      0: {
        items: 1, // Number of items for screens up to 600px wide
      },
      768: {
        items: 2, // Number of items for screens up to 1000px wide
      },
      1000: {
        items: 3, // Number of items for screens wider than 1000px
      },
    },
  });
  $(".blogs--slider .owl-carousel").owlCarousel({
    loop: true, // Enable looping for infinite scroll
    margin: 40,
    nav: true, // Show next/prev navigation arrows
    autoplay: true, // Enable autoplay (optional)
    autoplayTimeout: 3000, // Set autoplay speed (3 seconds in this example)
    autoplayHoverPause: true, // Pause autoplay on hover (optional)

    navText: [
      '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z" fill="white" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.8894 23.2931L14.6094 17.9981L19.8894 12.7031" stroke="#1CA8CB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z" fill="white" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.1094 23.2931L21.3894 17.9981L16.1094 12.7031" stroke="#1CA8CB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ],
    responsive: {
      0: {
        items: 1, // Number of items for screens up to 600px wide
      },
      768: {
        items: 1, // Number of items for screens up to 1000px wide
      },
      1000: {
        items: 1, // Number of items for screens wider than 1000px
      },
    },
  });

  // Owl Carousel::End

  // Best Deals Card Title::Start
  const dealsCardTitles = document.querySelectorAll(".deals-title");
  dealsCardTitles.forEach((dealsCardTitle) => {
    dealsCardTitle.textContent =
      dealsCardTitle.textContent.slice(0, 52) + "...";
  });
  // Best Deals Card Title::End

  // Filter Section::Start
  const filterText = document.querySelector(".filter-text");
  const filterButton = document.querySelector(".filter-btn");
  const allFilters = document.querySelector(".all-filters");
  if (filterText) {
    filterButton.addEventListener("click", () => {
      if (filterText.textContent === "Hide filters") {
        filterText.textContent = "Show Filters";
        allFilters.classList.add("opacity-0", "max-h-0");
        allFilters.classList.remove(
          "opacity-100",
          "xl:max-h-[500px]",
          "md:py-12",
          "lg:py-16",
          "py-7",
        );
      } else {
        filterText.textContent = "Hide filters";
        allFilters.classList.remove("opacity-0", "max-h-0");
        allFilters.classList.add(
          "opacity-100",
          "xl:max-h-[500px]",
          "md:py-12",
          "lg:py-16",
          "py-7",
        );
      }
    });
  }
  // Filter Section::End

  // Play Video::Start
  const video = document.getElementById("video");
  const play = document.getElementById("play-btn");
  const pause = document.getElementById("pause-btn");
  const screen = window.innerWidth;

  play?.addEventListener("click", () => {
    video?.play();
    play?.classList.add("hidden");
    pause?.classList.remove("hidden");
    video?.setAttribute("loop", "");
  });
  pause?.addEventListener("click", () => {
    video?.pause();
    play?.classList.remove("hidden");
    pause?.classList.add("hidden");
    video?.removeAttribute("loop", "");
  });

  if (screen) {
    if (screen > 319 && screen < 768) {
      video?.play();
      video?.setAttribute("loop", "");
    } else if (screen > 767) {
      video?.pause();
      video?.removeAttribute("loop", "");
    }
  }
  // Play Video::End

  // Accordion::Start

  const accordionBtn = document.getElementById("accordion-btn");
  const content = document.getElementById("content");
  const accordionBeach = document.getElementById("accordion-btn-beach");
  const contentBeach = document.getElementById("content-beach");
  const accordionCity = document.getElementById("city");
  const contentCity = document.getElementById("content-city");
  const accordionMountain = document.getElementById("mountain");
  const contentMountain = document.getElementById("content-mountain");
  const accordionNews = document.getElementById("news");
  const contentNews = document.getElementById("content-news");

  // accordionBtn?.addEventListener("click", () => {
  //   if (content.style.maxHeight) {
  //     content.style.maxHeight = null;
  //   } else {
  //     content.style.maxHeight = content.scrollHeight + "px";
  //   }
  // });

  // accordionBeach?.addEventListener("click", () => {
  //   if (contentBeach.style.maxHeight) {
  //     contentBeach.style.maxHeight = null;
  //   } else {
  //     contentBeach.style.maxHeight = contentBeach.scrollHeight + "px";
  //   }
  // });

  // accordionCity?.addEventListener("click", () => {
  //   if (contentCity.style.maxHeight) {
  //     contentCity.style.maxHeight = null;
  //   } else {
  //     contentCity.style.maxHeight = contentCity.scrollHeight + "px";
  //   }
  // });

  // accordionMountain?.addEventListener("click", () => {
  //   if (contentMountain.style.maxHeight) {
  //     contentMountain.style.maxHeight = null;
  //   } else {
  //     contentMountain.style.maxHeight = contentMountain.scrollHeight + "px";
  //   }
  // });

  // accordionNews?.addEventListener("click", () => {
  //   if (contentNews.style.maxHeight) {
  //     contentNews.style.maxHeight = null;
  //   } else {
  //     contentNews.style.maxHeight = contentNews.scrollHeight + "px";
  //   }
  // });

  const accordionButtons = document.querySelectorAll(".accordion-btn");
  accordionButtons.forEach((accordionButton) => {
    accordionButton.addEventListener("click", () => {
      const currentAccordionContent =
        accordionButton.querySelector(".accordion-content");
      const isOpen =
        currentAccordionContent.style.maxHeight &&
        currentAccordionContent.style.maxHeight !== "0px";

      const accordionContents = document.querySelectorAll(".accordion-content");
      accordionContents.forEach((accordionContent) => {
        accordionContent.style.maxHeight = "0";
      });

      if (isOpen) {
        currentAccordionContent.style.maxHeight = "0";
      } else {
        currentAccordionContent.style.maxHeight =
          currentAccordionContent.scrollHeight + "px";
      }
    });
  });
  // Accordion::End

  // FancyBox::Start
  const galleryButtons = document.querySelectorAll(".fancyGallerybtn");
  const videoButtons = document.querySelectorAll(".fancyVideobtn");

  // Images::Start
  galleryButtons.forEach((galleryButton) => {
    galleryButton?.addEventListener("click", () => {
      Fancybox.bind('[data-fancybox="gallery"]', {
        transition: "fade",
        Thumbs: {
          autostart: false,
        },
      });
      document.querySelector('[data-fancybox="gallery"]').click();
    });
  });
  // Images::End

  // Videos::Start
  videoButtons.forEach((videoButton) => {
    videoButton?.addEventListener("click", () => {
      const videoUrl = document
        .getElementById("hiddenVideo")
        .getAttribute("href");
      Fancybox.show(
        [
          {
            src: videoUrl,
            type: "iframe",
            iframe: {
              css: {
                width: "100%",
                height: "100%",
              },
            },
          },
        ],
        {
          Thumbs: false, // Disable thumbnails
          caption: "Watch this video", // Optional caption
        },
      );
    });
  });
  // Videos::End

  // FancyBox::End

  // Password Icon::Start
  const showButton = document.getElementById("show--pass");
  const hideButton = document.getElementById("hide--pass");
  const passField = document.getElementById("password--field");

  showButton?.addEventListener("click", () => {
    hideButton?.classList.remove("hidden");
    showButton?.classList.add("hidden");
    passField.setAttribute("type", "password");
  });
  hideButton?.addEventListener("click", () => {
    hideButton?.classList.add("hidden");
    showButton?.classList.remove("hidden");
    passField.setAttribute("type", "text");
  });

  const showButton2 = document.getElementById("show--pass--2");
  const hideButton2 = document.getElementById("hide--pass--2");
  const passField2 = document.getElementById("password--field--2");

  showButton2?.addEventListener("click", () => {
    hideButton2?.classList.remove("hidden");
    showButton2?.classList.add("hidden");
    passField2.setAttribute("type", "password");
  });
  hideButton2?.addEventListener("click", () => {
    hideButton2?.classList.add("hidden");
    showButton2?.classList.remove("hidden");
    passField2.setAttribute("type", "text");
  });
  // Password Icon::End

  // AOS::
  AOS.init({
    once: true,
  });
  // AOS::

  // Custom Price Range::Start
  const slider = document.querySelector(".range-slider");
  const minThumb = document.getElementById("minThumb");
  const maxThumb = document.getElementById("maxThumb");
  const range = document.querySelector(".slider-range");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  const minValue = 200;
  const maxValue = 580;
  let activeThumb = null;

  function setThumbPosition(thumb, value) {
    const percent = ((value - minValue) / (maxValue - minValue)) * 100;
    if (thumb) {
      thumb.style.left = `${percent}%`;
    }
  }

  function updateRange() {
    if (minThumb && range) {
      const minPercent = parseFloat(minThumb.style.left);
      const maxPercent = parseFloat(maxThumb.style.left);
      range.style.left = `${minPercent}%`;
      range.style.width = `${maxPercent - minPercent}%`;
    }
  }

  function updatePrices() {
    if (minThumb && maxThumb) {
      const minPercent = parseFloat(minThumb.style.left);
      const maxPercent = parseFloat(maxThumb.style.left);
      const minPriceValue = Math.round(
        minValue + (minPercent / 100) * (maxValue - minValue),
      );
      const maxPriceValue = Math.round(
        minValue + (maxPercent / 100) * (maxValue - minValue),
      );
      minPrice.textContent = minPriceValue;
      maxPrice.textContent = maxPriceValue;
    }
  }

  function onMouseMove(e) {
    if (!activeThumb) return;
    let percent =
      ((e.clientX - slider.getBoundingClientRect().left) / slider.offsetWidth) *
      100;
    percent = Math.max(0, Math.min(percent, 100));

    if (activeThumb === minThumb) {
      const maxPercent = parseFloat(maxThumb.style.left);
      if (percent < maxPercent) {
        setThumbPosition(
          minThumb,
          minValue + (percent / 100) * (maxValue - minValue),
        );
      }
    } else {
      const minPercent = parseFloat(minThumb.style.left);
      if (percent > minPercent) {
        setThumbPosition(
          maxThumb,
          minValue + (percent / 100) * (maxValue - minValue),
        );
      }
    }

    updateRange();
    updatePrices();
  }

  function onMouseUp() {
    activeThumb = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  minThumb?.addEventListener("mousedown", () => {
    activeThumb = minThumb;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  maxThumb?.addEventListener("mousedown", () => {
    activeThumb = maxThumb;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // Initialize positions
  setThumbPosition(minThumb, minValue);
  setThumbPosition(maxThumb, maxValue);
  updateRange();
  updatePrices();
  // Custom Price Range::End

  //  ===Custom Day Range::Start
  function createAntDateSlider(
    sliderId,
    minValue,
    maxValue,
    minDisplayId,
    maxDisplayId,
    minThumbId,
    maxThumbId,
  ) {
    const slider = document.getElementById(sliderId);
    const minThumb = document.getElementById(minThumbId);
    const maxThumb = document.getElementById(maxThumbId);
    const range = slider?.querySelector(".ant-date-range");
    const minDisplay = document.getElementById(minDisplayId);
    const maxDisplay = document.getElementById(maxDisplayId);

    let activeThumb = null;

    function setThumbPosition(thumb, value) {
      const percent = ((value - minValue) / (maxValue - minValue)) * 100;
      if (thumb) {
        thumb.style.left = `${percent}%`;
      }
    }

    function updateRange() {
      if (minThumb && range) {
        const minPercent = parseFloat(minThumb.style.left) || 0;
        const maxPercent = parseFloat(maxThumb.style.left) || 0;
        range.style.left = `${minPercent}%`;
        range.style.width = `${maxPercent - minPercent}%`;
      }
    }

    function updateDisplay() {
      if (minThumb && maxThumb) {
        const minPercent = parseFloat(minThumb.style.left) / 100;
        const maxPercent = parseFloat(maxThumb.style.left) / 100;
        const minVal = Math.round(
          minValue + minPercent * (maxValue - minValue),
        );
        const maxVal = Math.round(
          minValue + maxPercent * (maxValue - minValue),
        );
        minDisplay.textContent = minVal;
        maxDisplay.textContent = maxVal;
      }
    }

    function onMouseMove(e) {
      if (!activeThumb) return;
      const rect = slider.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(percent, 1));

      if (activeThumb === minThumb) {
        const maxPercent = parseFloat(maxThumb.style.left) / 100;
        if (percent < maxPercent) {
          setThumbPosition(
            minThumb,
            minValue + percent * (maxValue - minValue),
          );
        }
      } else {
        const minPercent = parseFloat(minThumb.style.left) / 100;
        if (percent > minPercent) {
          setThumbPosition(
            maxThumb,
            minValue + percent * (maxValue - minValue),
          );
        }
      }

      updateRange();
      updateDisplay();
    }

    function onMouseUp() {
      activeThumb = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    minThumb?.addEventListener("mousedown", () => {
      activeThumb = minThumb;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    maxThumb?.addEventListener("mousedown", () => {
      activeThumb = maxThumb;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function resetSlider() {
      setThumbPosition(minThumb, minValue);
      setThumbPosition(maxThumb, maxValue);
      updateRange();
      updateDisplay();
    }

    // Initialize the slider
    resetSlider();

    // Return the reset function for external use
    return { resetSlider };
  }

  // Initialize the date range slider
  const antDateSliderControl = createAntDateSlider(
    "antDateSlider",
    0,
    6,
    "antMinDate",
    "antMaxDate",
    "antMinDateThumb",
    "antMaxDateThumb",
  );

  // Ensure the button ID is correct

  //  ===Custom Day Range::End

  // ====Date Range ::Start====

  let finalDepartureDate = null;

  // ====Date Range ::End====

  // Clear All:: Start
  const clearAllBtn = document.getElementById("clear-all-btn");
  const searchInput = document.getElementById("searchInput");
  const allCheckBoxes = document.querySelectorAll(
    'input[name="destination"],input[name="TripTypes"]',
  );
  clearAllBtn?.addEventListener("click", () => {
    searchInput.value = "";
    allCheckBoxes?.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setThumbPosition(minThumb, minValue);
    setThumbPosition(maxThumb, maxValue);
    updateRange();
    updatePrices();

    antDateSliderControl.resetSlider();
  });

  // Clear All:: End

  // Suggestion::container::start
  const suggestionContainer = document.getElementById(
    "suggestions-container-1",
  );
  const departureContainer = document.getElementById("departure-container");
  const departureInput = document.getElementById("departure-input");

  // Toggle suggestion container visibility on click
  departureContainer?.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event from propagating to the document
    if (suggestionContainer.classList.contains("opacity-0")) {
      suggestionContainer.classList.remove(
        "opacity-0",
        "translate-y-3",
        "-z-20",
      );
      suggestionContainer.classList.add("opacity-100", "translate-y-0", "z-20");
    } else {
      suggestionContainer.classList.add("opacity-0", "translate-y-3", "-z-20");
      suggestionContainer.classList.remove(
        "opacity-100",
        "translate-y-0",
        "z-20",
      );
    }
  });

  // Handle click outside of suggestion container to close it
  document.addEventListener("click", (event) => {
    if (!departureContainer?.contains(event.target)) {
      suggestionContainer?.classList.add("opacity-0", "translate-y-3", "-z-20");
      suggestionContainer?.classList.remove(
        "opacity-100",
        "translate-y-0",
        "z-20",
      );
    }
  });

  // Handle text selection from the suggestion container
  suggestionContainer?.addEventListener("click", (event) => {
    if (event.target.tagName === "P") {
      const selectedText = event.target.textContent.trim(); // Get the text content of the clicked item
      departureInput.value = selectedText; // Set it to the input field
    }
  });

  // Suggestion::container::end

  // Departure length::start

  // Departure length::end

  //===================//
  //Room Number::Start

  const initialRoomNumber = $(".room-number").val();
  const roomDetailsContainer = $("#room-details-container");

  function createRoomDiv(roomNumber) {
    return `  <div class="flex flex-col items-center gap-4 pt-2.5 md:flex-row md:pl-8 xl:flex-col xl:pl-0 2xl:flex-row 2xl:pl-7">
        <h4 class="text-xs font-medium text-black">Room  ${roomNumber}:</h4>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <span class="text-xs text-gray-500">Child</span>
            <select class="child-select">
              <option value="0" selected>0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-xs text-gray-500">Adult</span>
            <select class="adult-select">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </div>`;
  }

  function renderRoomContainer(number) {
    roomDetailsContainer.html("");
    for (let i = 1; i <= number; i++) {
      roomDetailsContainer.append(createRoomDiv(i));
    }
    $("select").niceSelect();
  }
  renderRoomContainer(initialRoomNumber);

  $(".room-number").on("change", function () {
    const selectedRoomNumber = $(this).val();
    renderRoomContainer(selectedRoomNumber);
  });
  //Room Number::End

  // Arriving::

  const arrivalYes = document.getElementById("arrivalYes");
  const arrivalNo = document.getElementById("arrivalNo");
  const arrivalContainer = document.getElementById("arrival-container");
  arrivalYes?.addEventListener("click", () => {
    if (arrivalContainer) {
      arrivalContainer.classList.remove("hidden");
    }
  });
  arrivalNo?.addEventListener("click", () => {
    if (arrivalContainer) {
      arrivalContainer.classList.add("hidden");
    }
  });
  // Arriving::

  //Staying::
  const stayingYes = document.getElementById("stayingYes");
  const stayingNo = document.getElementById("stayingNo");
  const stayingContainer = document.getElementById("staying-container");
  stayingYes?.addEventListener("click", () => {
    if (stayingContainer) {
      stayingContainer.classList.remove("hidden");
    }
  });
  stayingNo?.addEventListener("click", () => {
    if (stayingContainer) {
      stayingContainer.classList.add("hidden");
    }
  });
  //Staying::

  //===================//

  // cart:start
  const cartCardHeadings = document.querySelectorAll(".header-card-title");
  cartCardHeadings?.forEach((cartHeading) => {
    if (cartHeading.textContent.length > 60) {
      cartHeading.textContent = cartHeading?.textContent.slice(0, 60) + "...";
    }
  });
  // cart:end

  //review:start
  const reviewStars = document.querySelectorAll(".star");
  function setActiveStars(count) {
    reviewStars?.forEach((star, index) => {
      const path = star.querySelector("path");
      if (index < count) {
        path.setAttribute("fill", "#EFCE4A");
        path.setAttribute("stroke", "#EFCE4A");
      } else {
        path.setAttribute("fill", "#fff");
        path.setAttribute("stroke", "#000");
      }
    });
  }

  reviewStars?.forEach((star) => {
    if (star) {
      star?.addEventListener("click", () => {
        const count = parseInt(star.getAttribute("data-index"));
        setActiveStars(count);
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (!document.getElementById("review-stars").contains(e.target)) {
      reviewStars?.forEach((star) => {
        const path = star.querySelector("path");
        path.setAttribute("fill", "#fff");
        path.setAttribute("stroke", "#000");
      });
    }
  });
  //review:end
});

// ====Solaimain====

// sort svg color change
const sortSvg1 = document.getElementById("filtering-click-sort-svg1");
const sortSvg2 = document.getElementById("filtering-click-sort-svg2");

// Grid::Start
const multiGrid = document.getElementById("multiGrid");
const singleGrid = document.getElementById("singleGrid");

// Grid::End
function changeLayout(svg1, svg2) {
  svg1.classList.add("svg-active");
  svg2.classList.remove("svg-active");
}

sortSvg1?.addEventListener("click", () => {
  changeLayout(sortSvg1, sortSvg2);
  console.log("svg1 clicked");
  singleGrid.classList.remove("hidden");
  singleGrid.classList.add("grid");
  multiGrid.classList.add("hidden");
  multiGrid.classList.remove("grid");
});

sortSvg2?.addEventListener("click", () => {
  changeLayout(sortSvg2, sortSvg1);
  console.log("svg2 clicked");
  singleGrid.classList.remove("grid");
  singleGrid.classList.add("hidden");
  multiGrid.classList.add("grid");
  multiGrid.classList.remove("hidden");
});

// change favIcon fill
const favIcon = document.querySelectorAll(".filtering-card-fav-icon");
let toggle = true;

function changeSvgFill(svg) {
  if (toggle) {
    svg.children[0].style.fill = "#1CA8CB";
    toggle = false;
  } else {
    svg.children[0].style.fill = "white";
    toggle = true;
  }
}

favIcon?.forEach((item) => {
  item.addEventListener("click", () => {
    changeSvgFill(item);
  });
});

$(".destination-filtering-card-carousel .owl-carousel").owlCarousel({
  loop: true, // Enable looping
  margin: 10, // Set margin between items
  nav: false,
  items: 1,
});

// accordion
const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header?.addEventListener("click", function () {
    const section = this.parentElement;
    const content = section.querySelector(".accordion-content");
    const allContents = document.querySelectorAll(".accordion-content");
    const dropDownArrow = header.querySelector(".dropdown--arrow");

    const destinationAccordionBtn = header.querySelector(
      ".destination--dropdown--arrow",
    );
    if (dropDownArrow) {
      allContents.forEach((c) => {
        if (c !== content) {
          const contentsParent = c.parentElement;
          const inactiveDropDows =
            contentsParent.querySelector(".dropdown--arrow");
          c.style.maxHeight = null;
          c.style.padding = "0 15px";
          c.parentElement.classList.remove("active");
          inactiveDropDows.style.transform = "rotate(180deg)";
        }
      });

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = "0 15px";
        section.classList.remove("active");
        dropDownArrow.style.transform = "rotate(180deg)";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px";
        dropDownArrow.style.transform = "rotate(360deg)";
        section.classList.add("active");
      }
    }

    if (destinationAccordionBtn) {
      allContents.forEach((c) => {
        if (c !== content) {
          const contentsParent = c.parentElement;
          const inactiveDropDows = contentsParent.querySelector(
            ".destination--dropdown--arrow",
          );
          c.style.maxHeight = null;
          c.style.padding = "0 15px";
          c.parentElement.classList.remove("active");
          inactiveDropDows.style.transform = "rotate(0deg)";
        }
      });

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = "0 15px";
        section.classList.remove("active");
        destinationAccordionBtn.style.transform = "rotate(0deg)";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px";
        destinationAccordionBtn.style.transform = "rotate(-90deg)";
        section.classList.add("active");
      }
    }
  });
});

// ====Solaimain====
