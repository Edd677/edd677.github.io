var cameraRig = document.querySelector('#cameraRig');
var keyboard = document.querySelector('#keyboard');

// Variables to track dragging state and hover state
var isDragging = false;
var isHovered = false;
var previousMousePosition = { x: 0, y: 0 };

// Function to handle mouse down event
function onMouseDown(event) {
  if (isHovered) {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
  }
}

// Function to handle mouse move event
function onMouseMove(event) {
  if (isDragging) {
    var deltaMousePosition = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };

    // Adjust the position of the box entity based on mouse movement
    keyboard.object3D.position.x += deltaMousePosition.x * 0.01;
    keyboard.object3D.position.y -= deltaMousePosition.y * 0.01;
  }
}

// Function to handle mouse up event
function onMouseUp() {
  isDragging = false;
}

// Function to handle mouse enter event
function onMouseEnter() {
  isHovered = true;
}

// Function to handle mouse leave event
function onMouseLeave() {
  isHovered = false;
  isDragging = false; // Stop dragging if mouse leaves while dragging
}

// Event listeners for mouse events
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
keyboard.addEventListener('mouseenter', onMouseEnter);
keyboard.addEventListener('mouseleave', onMouseLeave);