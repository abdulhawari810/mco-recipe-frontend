/**
 * Get image path from assets folder
 * @param {string} imageName - Name of the image file (e.g., 'logo.png')
 * @returns {string} - Full path to the image
 */
export const getAssetImage = (imageName) => {
  return new URL(`@/assets/${imageName}`, import.meta.url).href;
};

/**
 * Alternative: Simple path builder for assets
 * @param {string} imageName - Name of the image file
 * @returns {string} - Path to image in assets folder
 */
export const getImagePath = (imageName) => {
  return `@/assets/${imageName}`;
};
