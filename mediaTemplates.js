// mediaTemplates.js

// Template function to generate media query for specific breakpoints and CSS rules
function createMediaQuery(breakpoint, rules) {
  return `@media (max-width: ${breakpoint}px) {\n${rules}\n}`;
}

// Example templates for common properties
const templates = {
  'font-size': (className) => `  ${className} { font-size: 14px; }\n`,
  'display-flex': (className) => `  ${className} { flex-direction: column; }\n`,
  'padding': (className) => `  ${className} { padding: 5px; }\n`,
  'width': (className) => `  ${className} { width: 100%; }\n`,
  // Add more templates as needed for other properties
};
