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
const container = document.querySelector('.content'); // Parent container of cards

let draggedElement = null; // Track the currently dragged card
let placeholder = null; // Placeholder for reordering
let offsetX = 0, offsetY = 0; // Offset for dragging

// Enable or disable edit mode
editToggle.addEventListener('change', () => {
  const isEditMode = editToggle.checked;

  cards.forEach((card) => {
    if (isEditMode) {
      card.classList.add('shaking'); // Add shaking animation
    } else {
      card.classList.remove('shaking', 'dragging'); // Remove shaking and dragging
      card.style.position = ''; // Reset position
      card.style.left = '';
      card.style.top = '';
    }
  });
});

// Add dragging functionality
cards.forEach((card) => {
  // Start dragging
  card.addEventListener('mousedown', (event) => {
    if (!editToggle.checked) return; // Only work in edit mode
    startDrag(event, card);
  });

  card.addEventListener('touchstart', (event) => {
    if (!editToggle.checked) return; // Only work in edit mode
    startDrag(event, card);
  }, { passive: false });

  // Move dragged card
  document.addEventListener('mousemove', (event) => moveDrag(event));
  document.addEventListener('touchmove', (event) => moveDrag(event), { passive: false });

  // Stop dragging
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
});

function startDrag(event, card) {
  draggedElement = card;
  card.classList.add('dragging'); // Add visual feedback

  // Create a placeholder for the dragged card
  placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.style.height = `${card.offsetHeight}px`;
  placeholder.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  container.insertBefore(placeholder, card);

  // Calculate offsets
  const rect = card.getBoundingClientRect();
  offsetX = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
  offsetY = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

  // Set position for dragging
  card.style.position = 'absolute';
  card.style.zIndex = 1000;
}

function moveDrag(event) {
  if (!draggedElement) return;

  // Prevent scrolling on touch devices
  event.preventDefault();

  // Update card position
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;

  draggedElement.style.left = `${clientX - offsetX}px`;
  draggedElement.style.top = `${clientY - offsetY}px`;

  // Update the position of the placeholder
  const closestCard = [...cards].filter((card) => card !== draggedElement)
    .find((card) => {
      const rect = card.getBoundingClientRect();
      return clientY > rect.top && clientY < rect.bottom;
    });

  if (closestCard && container.contains(closestCard)) {
    container.insertBefore(placeholder, closestCard.nextSibling);
  }
}

function stopDrag() {
  if (!draggedElement) return;

  // Replace the dragged card in the placeholder's position
  container.insertBefore(draggedElement, placeholder);

  // Reset card styles
  draggedElement.style.position = '';
  draggedElement.style.zIndex = '';
  draggedElement.style.left = '';
  draggedElement.style.top = '';
  draggedElement.classList.remove('dragging');

  // Remove the placeholder
  placeholder.remove();
  placeholder = null;
  draggedElement = null;
}
