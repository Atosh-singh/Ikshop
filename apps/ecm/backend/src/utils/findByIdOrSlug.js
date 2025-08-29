// utils/findByIdOrSlug.js

const findByIdOrSlug = async (Model, identifier) => {
  try {
    let doc;

    // Check if identifier is a valid Mongo ObjectId (24 characters long)
    if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
      doc = await Model.findById(identifier);
    }

    // If not found by id, search by slug
    if (!doc) {
      doc = await Model.findOne({ slug: identifier });
    }

    // If still no result, return null (or can throw an error if needed)
    return doc;
  } catch (err) {
    throw new Error("Error finding document by id or slug");
  }
};

module.exports = findByIdOrSlug;
