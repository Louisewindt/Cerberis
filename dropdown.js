
// Wait for the entire DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {
        // Select the dropdown button and its content
    const toggleButton = document.querySelector(".dropdownSection__button");
    const dropdownContent = document.querySelector(".dropdownSection__content");
  

    // Ensure both button and content exist in the DOM
    if (toggleButton && dropdownContent) {
     // Add click event to toggle the dropdown visibility
      toggleButton.addEventListener("click", () => {
         // Toggle the active state of the button
        toggleButton.classList.toggle("active");
     // Show or hide the dropdown content based on its current state
        dropdownContent.style.opacity = dropdownContent.style.opacity === "1" ? "0" : "1";
        dropdownContent.style.visibility = dropdownContent.style.visibility === "visible" ? "hidden" : "visible";
      });
  
      // Close the dropdown if the user clicks outside of it
      document.addEventListener("click", (event) => {
        // Check if the click is not inside the button or dropdown content
        if (!event.target.closest(".dropdownSection__button") && !event.target.closest(".dropdownSection__content")) {
         // Remove active state and hide the dropdown content
          toggleButton.classList.remove("active");
          dropdownContent.style.opacity = "0";
          dropdownContent.style.visibility = "hidden";
        }
      });
    } else {
    // Log an error if either the button or the content is missing
      console.error("Dropdown button or content is missing in the DOM.");
    }
  });
  
  
  
  // change the graf 
    document.addEventListener("DOMContentLoaded", () => {
    // Select all navigation buttons and sections in the graph
      const buttons = document.querySelectorAll(".nav-button");
      const sections = document.querySelectorAll(".section");
  

// Loop through all buttons and add a click event listener to each
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
// Remove the 'active' class from all buttons and sections
          buttons.forEach((btn) => btn.classList.remove("active"));
          sections.forEach((section) => section.classList.remove("active"));

// Add the 'active' class to the clicked button
  
          button.classList.add("active");
// Get the associated section ID from the button's data attribute
          const sectionId = button.getAttribute("data-section");

// Activate the corresponding section by adding the 'active' class
          document.getElementById(sectionId).classList.add("active");
        });
      });
    });