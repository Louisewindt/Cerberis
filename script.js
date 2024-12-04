$("#card__temperatur-slider").roundSlider({
    radius: 100,
    circleShape: "full",    // Cirkulær form
    sliderType: "min-range",
    mouseScrollAction: true,
    value: 19,
    handleSize: "+5",
    min: 10,
    max: 35,
    startAngle: 270        // Starter i bunden
});

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
