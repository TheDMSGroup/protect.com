/**
 * Paginates an array by returning a subset of items for a specific page
 * @param {Array} array - The array to paginate
 * @param {number} page_number - The page number (1-based index)
 * @param {number} page_size - The number of items per page
 * @returns {Array} A new array containing the items for the specified page
 * @example
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const page1 = paginate(items, 1, 3); // Returns [1, 2, 3]
 * const page2 = paginate(items, 2, 3); // Returns [4, 5, 6]
 */
export const paginate = (array, start, end) => {
  return array.slice(start, end);
};
