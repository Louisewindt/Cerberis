// Initialize the temperature slider
$("#card__temperatur-slider").roundSlider({
  radius: 100,
  circleShape: "full",    // Circular shape
  sliderType: "min-range",
  mouseScrollAction: true,
  value: 22,              // Initial temperature
  handleSize: "+5",
  min: 10,                // Minimum temperature
  max: 35,                // Maximum temperature
  startAngle: 270,        // Starts at the bottom
  tooltipFormat: (e) => `${e.value}`, // Tooltip format
  change: (e) => updateRoomTemperatures(e.value), // Update room temps when slider changes
});

// Update temperatures in room cards based on slider
function updateRoomTemperatures(newTemp) {
  const roomTemperatures = document.querySelectorAll(".rooms-card__temperature");
  roomTemperatures.forEach((tempElement) => {
    tempElement.textContent = `${newTemp}°`;
  });
}

// Menu indicator functionality
const menuItems = document.querySelectorAll('.menu-item');
const indicator = document.querySelector('.menu-indicator');

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove the `sc-current` class from all items
    menuItems.forEach((menu) => menu.classList.remove('sc-current'));

    // Add the `sc-current` class to the clicked item
    item.classList.add('sc-current');

    // Move the indicator
    const leftPosition = item.offsetLeft + item.offsetWidth / 2 - indicator.offsetWidth / 2;
    indicator.style.left = `${leftPosition}px`;
  });
});

// Initialize the indicator position on page load
document.addEventListener('DOMContentLoaded', () => {
  const current = document.querySelector('.sc-current');
  if (current) {
    const leftPosition = current.offsetLeft + current.offsetWidth / 2 - indicator.offsetWidth / 2;
    indicator.style.left = `${leftPosition}px`;
  }
});

/*Dropdown*/
document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.querySelector(".dropdown__button");
  const dropdownContent = document.querySelector(".dropdown__content");

  if (dropdownButton && dropdownContent) {
    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from bubbling up
      dropdownContent.classList.toggle("active");
    });

    // Close the dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove("active");
      }
    });
  } else {
    console.error("Dropdown button or content not found.");
  }
});




// Get the toggle and all cards
const editToggle = document.querySelector('#toggle-card-edit__checkbox');
const draggableCards = document.querySelectorAll('.card');

// Toggle edit mode
editToggle.addEventListener('change', () => {
  const isEditingEnabled = editToggle.checked;

  draggableCards.forEach((card) => {
    if (isEditingEnabled) {
      card.setAttribute('draggable', 'true');
      card.classList.add('draggable', 'shaking'); // Add shaking and draggable behavior
    } else {
      card.removeAttribute('draggable');
      card.classList.remove('draggable', 'shaking'); // Remove behaviors
    }
  });
});

// Drag-and-Drop Events
let draggedElement = null;

draggableCards.forEach((card) => {
  card.addEventListener('dragstart', (event) => {
    draggedElement = event.target;
    event.target.classList.add('dragging');
  });

  card.addEventListener('dragend', (event) => {
    draggedElement = null;
    event.target.classList.remove('dragging');
  });

  card.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow drop
  });

  card.addEventListener('drop', (event) => {
    if (draggedElement) {
      const targetCard = event.target.closest('.card');
      if (targetCard && targetCard !== draggedElement) {
        targetCard.parentNode.insertBefore(
          draggedElement,
          targetCard.nextSibling
        );
      }
    }
  });
});
