const { Category } = require("../../models/Category");
const slugify = require("slugify");
const findByIdOrSlug = require("../../utils/findByIdOrSlug");

// 1️⃣ Add Category
const addCategory = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;

    // Generate the slug
    const slug = slugify(name, { lower: true, strict: true });

    const insObj = {
      name,
      slug
    };

    if (parentCategory) {
      insObj.parentCategory = parentCategory;
    }

    const category = new Category(insObj);
    const categoryData = await category.save();

    return res.status(200).json({
      success: true,
      message: "Category Added!",
      data: categoryData
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// 2️⃣ Get Category (All categories, nested or by ID/Slug)
const getCategory = async (req, res) => {
  try {
    const { identifier } = req.params; // ID or Slug

    if (identifier) {
      // If an identifier (ID or slug) is provided, fetch category by that identifier
      const category = await findByIdOrSlug(Category, identifier);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category fetched successfully!",
        data: category,
      });
    }

    // If no identifier is provided, fetch all categories (nested)
    const categories = await Category.find({});
    if (!categories || categories.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No categories found",
        data: []
      });
    }

    // Infinite Nested Categories (Custom logic to create nested categories)
    const nestedCat = nestedCategories(categories);

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully!",
      data: nestedCat
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// 3️⃣ Get Category by Name and Fetch all Child Categories inside it
const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params; // Category name

    // Search for the category by name (case-insensitive)
    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") } // Case-insensitive search
    }).populate('parentCategory');  // Populate parent category for the parent category

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Now get all child categories under the found category (nested)
    const children = await Category.find({ parentCategory: category._id }).populate('parentCategory');  // Populating parentCategory for children

    return res.status(200).json({
      success: true,
      message: `Category '${name}' and its child categories fetched successfully!`,
      data: {
        category,
        children // Return child categories
      }
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


// 4️⃣ Update Category (by ID or Slug)
const updateCategory = async (req, res) => {
  try {
    const { identifier } = req.params; // ID or Slug
    const { name, parentCategory } = req.body;

    // Find the category by ID or Slug
    const category = await findByIdOrSlug(Category, identifier);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Update the category fields
    category.name = name || category.name;
    category.slug = slugify(name, { lower: true, strict: true }) || category.slug;
    if (parentCategory) {
      category.parentCategory = parentCategory;
    }

    const updatedCategory = await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      data: updatedCategory
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// 5️⃣ Delete Category (by ID or Slug)
const deleteCategory = async (req, res) => {
  try {
    const { identifier } = req.params; // ID or Slug

    // Find the category by ID or Slug
    const category = await findByIdOrSlug(Category, identifier);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // Check if category has sub-categories
    const subCategory = await Category.findOne({ parentCategory: category._id });
    if (subCategory) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with sub-categories. Please delete sub-categories first."
      });
    }

    // Delete the category
    await Category.deleteOne({ _id: category._id });

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully!"
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// Helper to create infinite nested categories
const nestedCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cat => cat.parentCategory == null); // Root categories
  } else {
    category = categories.filter(cat => String(cat.parentCategory) == String(parentId)); // Subcategories
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentCategory: cate.parentCategory || null,
      children: nestedCategories(categories, cate._id) // Recursively fetch children
    });
  }

  return categoryList;
};

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByName // Export the updated function
};
