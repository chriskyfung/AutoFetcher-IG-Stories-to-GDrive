/**
 * Returns an object containing the path, file name, and file extension
 *   of a given URL.
 * @param {string} url - The URL to extract file details from.
 * @return {Object} An object containing the path, file name, and file
 *   extension of the URL.
 */
const getFileDetails = (url) => {
  const path = url.split('.com')[1].split(/[?#]/)[0];
  const fileName = path.split('/').pop();
  const fileExtension = fileName.split('.').pop();
  return { path: path, fileName: fileName, fileExtension: fileExtension };
};

export { getFileDetails };
