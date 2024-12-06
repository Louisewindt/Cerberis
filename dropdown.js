document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".dropdownSectionbutton");
    const dropdownContent = document.querySelector(".dropdownSectioncontent");
  
    if (toggleButton && dropdownContent) {
      toggleButton.addEventListener("click", () => {
        toggleButton.classList.toggle("active");
        dropdownContent.style.opacity = dropdownContent.style.opacity === "1" ? "0" : "1";
        dropdownContent.style.visibility = dropdownContent.style.visibility === "visible" ? "hidden" : "visible";
      });
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".dropdownSectionbutton") && !event.target.closest(".dropdownSectioncontent")) {
          toggleButton.classList.remove("active");
          dropdownContent.style.opacity = "0";
          dropdownContent.style.visibility = "hidden";
        }
      });
    } else {
      console.error("Dropdown button or content is missing in the DOM.");
    }
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