AFRAME.registerComponent('generate-keyboard', {
    init: function () {
        //Creates the different keys
        const keyRows = [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '<-', '#'],
            ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
            ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'],
            ['CTRL', 'ALT', 'SPACE', 'Day/Night']
        ];
  
        // Specific overrides for each key
        const keyWidthOverrides = {
            '<-': 0.25, 'TAB': 0.2, 'CAPS': 0.22, 'ENTER': 0.25,
            'SHIFT': 0.22, 'CTRL': 0.22, 'ALT': 0.22, 'SPACE': 0.65, 'Day/Night': 0.27
        };
  
     
  
  
  
        // Sets a gap between each key
        const gapBetweenKeys = 0.05;
        // Sets a gap between each row of keys
        const gapBetweenRows = 0.15;
        // Sets the height for all keys
        const keyHeight = 0.1;
        // Sets the depth for all keys
        const keyDepth = 0.02;
        // Sets the default width for all keys
        let keyWidth = 0.1;
        // Sets the thickness for the outline
        const outlineThickness = 0.01;
        // Sets Outline space between keys and border
        const outlineSpace = 0.05
  
        let currentY = 0;
        let currentZ = 0;
  
        const keyboardEl = document.getElementById('keyboard');
  
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        let minZ = Infinity;
        let maxZ = -Infinity;
  
                                                                                  
  
        
  
        for (const row of keyRows) {
            let currentX = 0;
  
            for (let i = 0; i < row.length; i++) {
                const key = row[i];
                let keyX = currentX;
  
                if (i !== 0) {
                    keyX += gapBetweenKeys;
                }
  
                // Changes width of specific keys otherwise sets to default key width
                const keyWidthValue = keyWidthOverrides[key] || keyWidth;
  
                minY = Math.min(minY, currentY - 0.05); // Adjusted minY
                maxY = Math.max(maxY, currentY + keyHeight - 0.05); // Adjusted maxY      // This is because the keyboard is offset to be in the top left of a key instead of centre
  
                const keyEl = document.createElement('a-box');
                keyEl.setAttribute('class', 'key');
                keyEl.setAttribute('value', key);
                keyEl.setAttribute('position', `${keyX + (keyWidthValue / 2)} ${currentY} ${currentZ}`); //Sets the width offset to the left edge of the key instead of the centre
                keyEl.setAttribute('width', keyWidthValue);
                keyEl.setAttribute('height', keyHeight);
                keyEl.setAttribute('depth', keyDepth);
                
  
  
                // Gets coordinates for each corner of keyboard
                minX = Math.min(minX, keyX);
                maxX = Math.max(maxX, keyX + keyWidthValue);
                minY = Math.min(minY, currentY);
                maxY = Math.max(maxY, currentY + keyHeight);
                minZ = Math.min(minZ, currentZ);
                maxZ = Math.max(maxZ, currentZ + keyDepth);
  
                keyboardEl.appendChild(keyEl);
  
                // Creates a-text for displaying the key value
                const textEl = document.createElement('a-text');
                textEl.setAttribute('value', key);
                textEl.setAttribute('align', 'left');
                textEl.setAttribute('color', 'black')
                textEl.setAttribute('position', `${keyX} ${currentY} ${currentZ + 0.01}`); //Positions text above the key by 0.01
                textEl.setAttribute('scale', '0.25 0.25 0.25'); //Adjusts text scale
                keyboardEl.appendChild(textEl);
  
                currentX = keyX + keyWidthValue; //Update currentX for the next key
            }
  
            currentY -= gapBetweenRows;
  
              
  
        }
  
        // Create outline
        const outlinePoints = [
            [minX - outlineSpace, minY - outlineSpace, minZ],           // Bottom left corner
            [minX - outlineSpace, maxY + outlineSpace, minZ],           // Top left corner
            [maxX + outlineSpace, maxY + outlineSpace, minZ],           // Top right corner
            [maxX + outlineSpace, minY - outlineSpace, minZ],           // Bottom right corner
            [minX - outlineSpace, minY - outlineSpace, minZ],           // Closing the loop (back to bottom left corner)
        ];
  
        for (let i = 0; i < outlinePoints.length - 1; i++) {
            const startPoint = outlinePoints[i];
            const endPoint = outlinePoints[i + 1];
  
            const deltaX = endPoint[0] - startPoint[0];
            const deltaY = endPoint[1] - startPoint[1];
            const deltaZ = endPoint[2] - startPoint[2];
  
            // Calculate the distance between the start and end points
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
  
            const lineEl = document.createElement('a-box');
            lineEl.setAttribute('position', `${(startPoint[0] + endPoint[0]) / 2} ${(startPoint[1] + endPoint[1]) / 2} ${(startPoint[2] + endPoint[2]) / 2}`);
            lineEl.setAttribute('width', distance);
            lineEl.setAttribute('height', outlineThickness);
            lineEl.setAttribute('depth', outlineThickness);
            lineEl.setAttribute('color', 'black');
  
            // Calculate rotation angles
            const rotationY = Math.atan2(deltaY, deltaX); // Rotation around Y-axis
            const rotationZ = Math.atan2(deltaY, deltaZ); // Rotation around Z-axis
  
            // Apply rotations
            lineEl.object3D.rotation.y = rotationY;
            lineEl.object3D.rotation.z = rotationZ;
  
            keyboardEl.appendChild(lineEl);
        }
  
        // Prints out coordinates to console
        console.log('Min X:', minX);
        console.log('Max X:', maxX);
        console.log('Min Y:', minY);
        console.log('Max Y:', maxY);
        console.log('Min Z:', minZ);
        console.log('Max Z:', maxZ);
  
        // Get all the key elements
        const keys = document.querySelectorAll('.key');
  
  
       
        // Top Board
        const topBoard = document.createElement('a-box');
        topBoard.setAttribute('scale', '2.05 0.15 0.03');
        topBoard.setAttribute('position', '0.95 0.17 0');
        topBoard.setAttribute('color', 'black');
        keyboardEl.appendChild(topBoard);




        // Transparent Background
        const backBoard = document.createElement('a-box');
        backBoard.setAttribute('scale', '2 0.87 0.03');
        backBoard.setAttribute('position', '0.95 -0.27 -0.02');
        backBoard.setAttribute('material', 'transparent: true; opacity 1;');
        backBoard.setAttribute('color', 'red');
        keyboardEl.appendChild(backBoard);


  
  
        // Size Button
        // Create the size button entity (e.g., a sphere)
        const sizeButton = document.createElement('a-sphere');
        sizeButton.setAttribute('radius', 0.04); // Set the size of the slider button
        sizeButton.setAttribute('color', 'blue'); // Set the color of the slider button
  
        // Set the initial position of the size button relative to the keyboard
        sizeButton.setAttribute('position', '0 0.17 0');
  
        // Append the size button entity as a child of the keyboard
        keyboardEl.appendChild(sizeButton);
  
        // Add event listener to the size button
        sizeButton.addEventListener('click', function () {
          // Increase the size of each key by 0.1
          keys.forEach(function (key) {
              let currentWidth = parseFloat(key.getAttribute('width'));
              let currentHeight = parseFloat(key.getAttribute('height'));
              key.setAttribute('width', currentWidth + 0.1);
              key.setAttribute('height', currentHeight + 0.1);
              
          });
      });
  
  
  
        
        // Interactions
  
  
        // Function to handle key interactions
        const handleKeyInteraction = function () {
          // Set colour based on interaction
          if (this.isHovering) {
              this.setAttribute('material', 'color', 'red');
          } else {
              this.setAttribute('material', 'color', 'white');
          }
        };
  
        // Add event listeners for mouse events to all keys
      keys.forEach(function (key) {
      // Flag to track hover state
      key.isHovering = false;
  
      // Add mouse enter interaction
      key.addEventListener('mouseenter', function () {
          this.isHovering = true;
          handleKeyInteraction.call(this);
      });
  
      // Add mouse leave interaction
      key.addEventListener('mouseleave', function () {
          this.isHovering = false;
          handleKeyInteraction.call(this);
      });
  
      
      // Add mouse down interaction
      key.addEventListener('mousedown', function () {
          this.setAttribute('material', 'color', 'blue');
      });
  
      // Add mouse up interaction
      key.addEventListener('mouseup', function () {
          handleKeyInteraction.call(this);
      });
  
      // Add click interaction
      key.addEventListener('click', function () {
          const keyValue = this.getAttribute('value');
  
          // Check for special keys SPACE and <-
          if (keyValue === 'SPACE') {
              // Add a space to the text output box
              const outputText = document.getElementById('outputText');
              outputText.setAttribute('value', outputText.getAttribute('value') + ' ');
          } else if (keyValue === '<-') {
              // Remove the last character from the text output box
              const outputText = document.getElementById('outputText');
              const currentValue = outputText.getAttribute('value');
              outputText.setAttribute('value', currentValue.substring(0, currentValue.length - 1));
          } else if (keyValue === 'ENTER'){
              const enterKey = document.querySelector('.key[value="ENTER"]');
              enterKey.addEventListener('click', function () {
              // Do nothing when the "ENTER" key is clicked
              });
          } else if (keyValue === 'ALT'){
              const enterKey = document.querySelector('.key[value="ALT"]');
              enterKey.addEventListener('click', function () {
              // Do nothing when the "ALT" key is clicked
              });
          } else if (keyValue === 'CAPS'){
              const capsKey = document.querySelector('.key[value="CAPS"]');
          let capsLockActivated = false;
  
          capsKey.addEventListener('click', function () {
              // Toggle caps lock state
              capsLockActivated = !capsLockActivated;
  
              // Update text on keys
              keys.forEach(function (key) {
                  const keyValue = key.getAttribute('value');
                  if (capsLockActivated) {
                      key.setAttribute('value', keyValue.toUpperCase());
                  } else {
                      key.setAttribute('value', keyValue.toLowerCase());
                  }
              });
  
                  // Update text in the text box
                  const outputText = document.getElementById('outputText');
                  const currentText = outputText.getAttribute('value');
                  outputText.setAttribute('value', capsLockActivated ? currentText.toUpperCase() : currentText.toLowerCase());
              });
          } 
          
              else {
                  // For regular keys, append their values to the text output box
                  const outputText = document.getElementById('outputText');
                  outputText.setAttribute('value', outputText.getAttribute('value') + keyValue);
          }
  
          // Update key color
          if (this.isHovering) {
              this.setAttribute('material', 'color', 'red');
          } else {
              this.setAttribute('material', 'color', 'white');
          }
  
          console.log('Clicked key:', keyValue);
      });   
  });

        
  
  
          // Interaction for dark and light mode
          let isNightMode = false;
          const nightDayKey = document.querySelector('.key[value="Day/Night"]');
          nightDayKey.addEventListener('click', function () {
          isNightMode = !isNightMode;
          // Do nothing when the "Day/Night" key is clicked
          const outputText = document.getElementById('outputText');
          const currentValue = outputText.getAttribute('value');
          outputText.setAttribute('value', currentValue.substring(0, currentValue.length - 9));
         // Change all key colors and text colors based on the current mode
          keys.forEach(function (key) {
              if (isNightMode) {
                  key.setAttribute('material', 'color', 'black'); // Change key color to black
                  const textEl = key.nextSibling; // Get the text element associated with the key
                  if (textEl.tagName === 'A-TEXT') {
                      textEl.setAttribute('color', 'white'); // Change text color to white
                  }
                  key.addEventListener('mouseleave', function () {
                      key.setAttribute('material', 'color', 'black'); // Change key color to black on mouse leave
                  });
              } else {
                  key.setAttribute('material', 'color', 'white'); // Change key color to white
                  const textEl = key.nextSibling; // Get the text element associated with the key
                  if (textEl.tagName === 'A-TEXT') {
                      textEl.setAttribute('color', 'black'); // Change text color to black
                  }
                  key.addEventListener('mouseleave', function () {
                      key.setAttribute('material', 'color', 'white'); // Change key color to white on mouse leave
                  });
              }
          });
      });
      

      
  
    }
  });
  
  // Attach the component to the scene
  document.querySelector('a-scene').setAttribute('generate-keyboard', '');