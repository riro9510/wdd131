
const currentYear = new Date().getFullYear();

const copyrightParagraph = document.querySelector('footer p:first-of-type');
copyrightParagraph.textContent = `© ${currentYear} Ricardo - Mexico.`;

const lastModified = document.lastModified;

const lastModifiedParagraph = document.querySelector('footer p:nth-of-type(2)');
lastModifiedParagraph.textContent = `Last modification: ${lastModified}`;
