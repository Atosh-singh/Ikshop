const fs = require("fs").promises;
const path = require('path');

// Helper function to delete a file
const deleteFile = async (filePath) => {
  try {
    // Log the file path to verify it's correct
    console.log("Attempting to delete file:", filePath);

    // Check if file exists before attempting to delete
    try {
      await fs.access(filePath);
    } catch (err) {
      console.error("File does not exist:", filePath);
      return;
    }

    // Delete the file
    await fs.unlink(filePath);
    console.log("File Deleted Successfully!");
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
};

module.exports = { deleteFile };
