// utils/paginate.js
/**
 * Generic Pagination Helper for Mongoose
 * @param {Mongoose.Model} model - The Mongoose model to query
 * @param {Object} filter - Mongoose filter object (default: {})
 * @param {Object} options - Pagination options (page, limit, select, populate, sort)
 *    page: number (default 1)
 *    limit: number (default 10)
 *    select: string or object (fields to exclude/include)
 *    populate: string, array, or object (for relationships)
 *    sort: object (sorting order)
 */
const paginate = async (model, filter = {}, options = {}) => {
  // Ensure valid page and limit (at least 1)
  const page = Math.max(parseInt(options.page) || 1, 1);
  const limit = Math.max(parseInt(options.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const query = model.find(filter);

  // Select specific fields if provided
  if (options.select) query.select(options.select);

  // Populate fields if provided (e.g., related documents)
  if (options.populate) query.populate(options.populate);

  // Sort results if provided (e.g., by createdAt)
  query.sort(options.sort || { createdAt: -1 });

  // Execute query and count documents in parallel
  const [data, total] = await Promise.all([
    query.skip(skip).limit(limit).lean(), // lean() returns plain JS objects (faster)
    model.countDocuments(filter)          // Count total documents in the filter
  ]);

  const totalPages = Math.ceil(total / limit); // Calculate total pages

  return {
    success: true,
    page,
    limit,
    totalPages,
    totalRecords: total,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data,
  };
};

module.exports = paginate;
