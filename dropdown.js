document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".dropdownSectionbutton");
    const dropdownContent = document.querySelector(".dropdownSectioncontent");

    toggleButton.addEventListener("click", () => {
      toggleButton.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".energy-sources-card")) {
        toggleButton.classList.remove("active");
      }
    });
  });



/* change the graf */
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-button");
    const sections = document.querySelectorAll(".section");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        sections.forEach((section) => section.classList.remove("active"));

        button.classList.add("active");
        const sectionId = button.getAttribute("data-section");
        document.getElementById(sectionId).classList.add("active");
      });
    });
  });