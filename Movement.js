// const AFRAME = window.AFRAME || {}        

// var movementSpeed = 0.5; // Adjust movement speed as needed
// var shiftMultiplier = 0.2; // Multiplier for faster upward movement

// // Listen for keydown events
// window.addEventListener('keydown', function(event) {
//   var camera = document.getElementById('camera');
//   var currentPosition = camera.getAttribute('position');
//   var newPosition = { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z };

//   switch(event.key) {
//     case 'w': // Move forward
//       newPosition.z -= movementSpeed;
//       break;
//     case 's': // Move backward
//       newPosition.z += movementSpeed;
//       break;
//     case 'a': // Move left
//       newPosition.x -= movementSpeed;
//       break;
//     case 'd': // Move right
//       newPosition.x += movementSpeed;
//       break;
//     case 'Shift': // Move upward (Shift key)
//       newPosition.y += movementSpeed * shiftMultiplier;
//       break;
//     case ' ': // Move downward (Space key)
//       newPosition.y -= movementSpeed * shiftMultiplier;   
//       break;
//   }

//   // Set the new position of the camera
//   camera.setAttribute('position', newPosition);
// });