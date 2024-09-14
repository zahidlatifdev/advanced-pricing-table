import React from 'react';

const exportPricingPage = () => {
    const htmlContent = generateHTML();
    const cssContent = generateCSS();

    downloadFile('pricing-page.html', htmlContent);
    downloadFile('pricing-page.css', cssContent);
};

const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

// Capture the current HTML code by getting the body content of the rendered page and removing unwanted buttons
const generateHTML = () => {
    const clonedDocument = document.documentElement.cloneNode(true); // Clone the entire document to manipulate it
    const exportSection = clonedDocument.querySelector('#export'); // Assuming #exportButton is the ID for the expor

    // Remove export and edit buttons if they exist
    if (exportSection) exportSection.remove();

    // Return the modified HTML content
    return clonedDocument.outerHTML;
};

// Capture the current CSS styles applied on the page
const generateCSS = () => {
    let css = '';
    const styleSheets = document.styleSheets;

    for (let i = 0; i < styleSheets.length; i++) {
        const sheet = styleSheets[i];
        try {
            const rules = sheet.cssRules || sheet.rules; // Get the CSS rules

            for (let j = 0; j < rules.length; j++) {
                css += rules[j].cssText + '\n'; // Combine all the CSS rules
            }
        } catch (e) {
            console.warn("Couldn't access some CSS rules due to CORS policy");
        }
    }
    return css;
};

export default exportPricingPage;
