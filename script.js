function parseCSS(cssString) {
  const responsiveProperties = ['width', 'height', 'padding', 'margin', 'font-size'];
  const cssRules = cssString.match(/[^{}]+(?=\s*\{)|\{[^}]*\}/g);
  const parsedStyles = {};

  for (let i = 0; i < cssRules.length; i += 2) {
      const selector = cssRules[i].trim();
      const properties = cssRules[i + 1].replace(/[{}]/g, '').trim().split(';');
      
      parsedStyles[selector] = parsedStyles[selector] || {};

      properties.forEach(propertyLine => {
          const [property, value] = propertyLine.split(':').map(item => item.trim());
          if (responsiveProperties.includes(property)) {
              parsedStyles[selector][property] = value;
          }
      });
  }
  return parsedStyles;
}

function adjustValueForBreakpoint(property, value, breakpoint) {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return value;

  switch (property) {
    case 'width':
    case 'padding':
    case 'margin':
      if (value.includes('%')) {
        return `${Math.max(50, numValue - (breakpoint / 10))}%`; // Adjust as needed
      } else if (value.includes('px')) {
        return `${Math.max(10, numValue - (breakpoint / 20))}px`; // Change minimum value
      }
      break;
    case 'font-size':
      if (value.includes('px')) {
        return `${Math.max(12, numValue - (breakpoint / 50))}px`; // Change minimum value
      }
      break;
  }
  return value;
}


function generateMediaQueries(parsedStyles) {
  const breakpoints = [320, 768, 1024];
  let responsiveCSS = '';

  breakpoints.forEach(bp => {
      let breakpointCSS = `@media (max-width: ${bp}px) {\n`;
      let hasResponsiveStyles = false;

      for (const selector in parsedStyles) {
          let selectorCSS = `  ${selector} {\n`;
          let hasProperties = false;

          for (const property in parsedStyles[selector]) {
              const adjustedValue = adjustValueForBreakpoint(property, parsedStyles[selector][property], bp);
              selectorCSS += `    ${property}: ${adjustedValue};\n`;
              hasProperties = true;
          }

          if (hasProperties) {
              breakpointCSS += selectorCSS + `  }\n`;
              hasResponsiveStyles = true;
          }
      }

      breakpointCSS += `}\n`;
      if (hasResponsiveStyles) responsiveCSS += breakpointCSS;
  });

  return responsiveCSS;
}

function processCSSInput() {
  // Show loading overlay
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingText = document.getElementById('loadingText');
  loadingOverlay.style.display = 'flex';

  const loadingMessages = JSON.parse(loadingText.getAttribute('data-loading'));
  let messageIndex = 0;

  // Function to update the loading text message
  const updateLoadingText = () => {
    loadingText.textContent = loadingMessages[messageIndex];
    messageIndex = (messageIndex + 1) % loadingMessages.length;
  };

  // Update loading text every second
  const loadingInterval = setInterval(updateLoadingText, 1000);

  // Start a timeout for generating output
  setTimeout(() => {
    const cssInput = document.getElementById('css-input').value; // Use the correct ID
    const parsedStyles = parseCSS(cssInput);
    const generatedMediaQueries = generateMediaQueries(parsedStyles);

    // Hide loading overlay and show output
    clearInterval(loadingInterval); // Stop the loading text updates
    loadingOverlay.style.display = 'none';
    document.getElementById('output').textContent = generatedMediaQueries;

    // Clear the input box for the next code
    document.getElementById('css-input').value = '';
  }, 5000); // 5 seconds delay
}

const backgroundTextElements = document.querySelectorAll(".background-text");
const texts = [
    "WRITE RESPONSIVE CSS EASILY",
    "PASTE YOUR CODE AND GET RESPONSIVE CSS"
];
let currentTextIndex = 0;

function updateBackgroundText() {
    // Move to the next text and update the content
    backgroundTextElements[currentTextIndex].textContent = texts[currentTextIndex];

    // Update the index to loop through the texts
    currentTextIndex = (currentTextIndex + 1) % texts.length;
}

// Initially set the text content
updateBackgroundText();

// You can update the text dynamically as per requirements

// Toggle navigation menu on hamburger click
document.getElementById('hamburger-menu').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

