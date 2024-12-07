

// Initialize the temperature slider using the "roundSlider" library
$("#card__temperatur-slider").roundSlider({
  radius: 100, // Sets the radius of the circular slider
  circleShape: "full", // Makes the slider a complete circle
  sliderType: "min-range", // Allows the slider to adjust values from the minimum
  mouseScrollAction: true, // Enables mouse wheel interaction for the slider
  value: 22, // Initial value (temperature in this case)
  handleSize: "+5", // Sets the size of the slider handle
  min: 10, // Minimum temperature value
  max: 35, // Maximum temperature value
  startAngle: 270, // Starting angle of the slider (270 degrees is the bottom)
  tooltipFormat: (e) => `${e.value}`, // Tooltip displays the current value
  change: (e) => updateRoomTemperatures(e.value), // Updates room temperatures when slider value changes
});

// Function to update the temperatures in all room cards
function updateRoomTemperatures(newTemp) {
  const roomTemperatures = document.querySelectorAll(".rooms-card__temperature"); // Select all temperature elements
  roomTemperatures.forEach((tempElement) => {
    tempElement.textContent = `${newTemp}°`; // Update the text content with the new temperature
  });
}

// Menu indicator functionality for navigation
const menuItems = document.querySelectorAll('.menu-item'); // Select all menu items
const indicator = document.querySelector('.menu-indicator'); // Select the sliding indicator

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove the `sc-current` class from all items to reset their state
    menuItems.forEach((menu) => menu.classList.remove('sc-current'));

    // Add the `sc-current` class to the clicked menu item
    item.classList.add('sc-current');

    // Calculate the indicator's new position
    const leftPosition = item.offsetLeft + item.offsetWidth / 2 - indicator.offsetWidth / 2;
    indicator.style.left = `${leftPosition}px`; // Move the indicator to the new position
  });
});

// Set the initial position of the indicator on page load
document.addEventListener('DOMContentLoaded', () => {
  const current = document.querySelector('.sc-current'); // Find the currently active menu item
  if (current) {
    const leftPosition = current.offsetLeft + current.offsetWidth / 2 - indicator.offsetWidth / 2; // Calculate its center
    indicator.style.left = `${leftPosition}px`; // Position the indicator initially
  }
});



// Toggle edit mode for dragging cards
const editToggle = document.querySelector('#toggle-card-edit__checkbox'); // Edit mode toggle checkbox
const cards = document.querySelectorAll('.card:not(.toggle-card-edit)'); // Select all cards except the edit toggle card
const container = document.querySelector('.content'); // The container holding all draggable cards

let draggedElement = null; // The currently dragged card
let placeholder = null; // Placeholder element to show the position for reordering
let offsetX = 0, offsetY = 0; // Offsets to calculate drag position

// Enable or disable edit mode based on the toggle
editToggle.addEventListener('change', () => {
  const isEditMode = editToggle.checked; // Check if edit mode is active

  cards.forEach((card) => {
    if (isEditMode) {
      card.classList.add('shaking'); // Start shaking animation to indicate edit mode
    } else {
      card.classList.remove('shaking', 'dragging'); // Stop shaking and reset dragging state
      card.style.position = ''; // Reset card's position styles
      card.style.left = '';
      card.style.top = '';
    }
  });
});

// Add dragging functionality to each card (pc/laptop for responsive)
cards.forEach((card) => {
  // Start dragging with mouse
  card.addEventListener('mousedown', (event) => {
    if (!editToggle.checked) return; // Dragging works ONLY in edit mode
    startDrag(event, card);
  });

  // Start dragging with touch (phones)
  card.addEventListener('touchstart', (event) => {
    if (!editToggle.checked) return; // Dragging works ONLY in edit mode
    startDrag(event, card);
  }, { passive: false });

  // Move the dragged card both mous and touch
  document.addEventListener('mousemove', (event) => moveDrag(event));
  document.addEventListener('touchmove', (event) => moveDrag(event), { passive: false });

  // Stop dragging
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
});

// Function to start dragging a card
function startDrag(event, card) {
  draggedElement = card; // Set the card as the dragged element
  card.classList.add('dragging'); // Add the visual effect (styled in css) for dragging

  // Create a placeholder to maintain layout
  placeholder = document.createElement('section');
  placeholder.className = 'placeholder'; // Assign a classs to the placeholder
  placeholder.style.height = `${card.offsetHeight}px`; // Set the same height as the dragged card
  placeholder.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // Make it slightly visible
  container.insertBefore(placeholder, card); // Insert the placeholder in the DOM

  // Calculate the offset for accurate positioning during the drag
  const rect = card.getBoundingClientRect();
  offsetX = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
  offsetY = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

  // Apply these styles to make the card draggable
  card.style.position = 'absolute';
  card.style.zIndex = 1000; // Bring the card to the top layer
}

// Function to move the dragged card
function moveDrag(event) {
  if (!draggedElement) return; // Exit if no card is being dragged

  event.preventDefault(); // Prevent scrolling on touch devices so it doesnt go all over the place

  // Calculate the new position based where the on mouse or touch input is placed
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;

  draggedElement.style.left = `${clientX - offsetX}px`; // Update the card's left position
  draggedElement.style.top = `${clientY - offsetY}px`; // Update the card's top position

  // Find the closest card to the dragged card's current position
  const closestCard = [...cards].filter((card) => card !== draggedElement)
    .find((card) => {
      const rect = card.getBoundingClientRect();
      return clientY > rect.top && clientY < rect.bottom; // Check if within bounds
    });

  if (closestCard && container.contains(closestCard)) {
    container.insertBefore(placeholder, closestCard.nextSibling); // Insert placeholder near closest card
  }
}

// Function so it stops dragging
function stopDrag() {
  if (!draggedElement) return; // Exit if no card is being dragged

  // Replace the placeholder with the dragged card
  container.insertBefore(draggedElement, placeholder);

  // Reset styles for the dragged card
  draggedElement.style.position = ''; // Clear absolute positioning
  draggedElement.style.zIndex = ''; // Reset stacking order
  draggedElement.style.left = ''; // Clear left position
  draggedElement.style.top = ''; // Clear top position
  draggedElement.classList.remove('dragging'); // Remove dragging effect

  // Remove the placeholder element
  placeholder.remove();
  placeholder = null;
  draggedElement = null; // Clear the reference to the dragged card
}

// Enable dragging with a double-tap on touch devices (easier for mobile users)
let lastTap = 0; // Store the timestamp of the last tap

cards.forEach((card) => {
  card.addEventListener('touchend', (event) => {
    const currentTime = new Date().getTime(); // Get the current time
    const tapInterval = currentTime - lastTap; // Calculate the time since the last tap

    if (tapInterval < 300 && tapInterval > 0) { // Detect double-tap
      startDragWithDoubleTap(event, card); // Start dragging on double-tap
    }

    lastTap = currentTime; // Update the last tap time
  });
});

// Function to start dragging on double-tap
function startDragWithDoubleTap(event, card) {
  if (!editToggle.checked) return; // Only allow dragging in edit mode

  const touch = event.changedTouches[0]; // Get touch input
  const rect = card.getBoundingClientRect();
  offsetX = touch.clientX - rect.left; // Calculate horizontal offset
  offsetY = touch.clientY - rect.top; // Calculate vertical offset

  draggedElement = card; // Set the card as the dragged element
  card.classList.add('dragging'); // Add dragging feedback

  card.style.position = 'absolute'; // Enable absolute positioning
  card.style.zIndex = 1000; // Bring the card to the top

  document.addEventListener('touchmove', moveDrag, { passive: false }); // Listen for drag movement
  document.addEventListener('touchend', stopDrag); // Stop dragging on touch end
}



