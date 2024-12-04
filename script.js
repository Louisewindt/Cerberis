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




// Select the toggle and all cards
const editToggle = document.querySelector('#toggle-card-edit__checkbox');
const cards = document.querySelectorAll('.card');

let draggedElement = null; // Track the currently dragged card

// Enable or disable draggable mode based on toggle
editToggle.addEventListener('change', () => {
  const isEditMode = editToggle.checked;

  cards.forEach((card) => {
    const editIcon = card.querySelector('.card__edit-icon');

    if (isEditMode) {
      card.classList.add('shaking'); // Enable shaking animation
      editIcon.style.pointerEvents = 'auto'; // Allow interaction with the icon
    } else {
      card.classList.remove('shaking'); // Disable shaking animation
      editIcon.style.pointerEvents = 'none'; // Disable interaction with the icon
      card.removeAttribute('draggable'); // Ensure draggable is off
    }
  });
});

// Add drag-and-drop functionality
cards.forEach((card) => {
  const editIcon = card.querySelector('.card__edit-icon');

  // Enable dragging only when interacting with the icon
  editIcon.addEventListener('mousedown', () => {
    card.setAttribute('draggable', 'true'); // Enable drag
  });

  editIcon.addEventListener('touchstart', () => {
    card.setAttribute('draggable', 'true'); // Enable drag
  });

  // Drag start
  card.addEventListener('dragstart', (event) => {
    draggedElement = card;
    event.target.classList.add('dragging'); // Add visual feedback
  });

  // Drag end
  card.addEventListener('dragend', (event) => {
    event.target.classList.remove('dragging'); // Remove visual feedback
    card.setAttribute('draggable', 'false'); // Disable drag after moving
    draggedElement = null;
  });

  // Allow dropping on other cards
  card.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow drop
  });

  // Handle dropping and reordering
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
