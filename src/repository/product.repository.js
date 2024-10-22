import ProductModel from "../models/product.model";

class ProductRepository {
  async create(product, createdBy) {
    product.createdBy = createdBy;
    return ProductModel.create(product);
  }
  async find(productAttrs, projection, options) {
    const productAttrsCopy = JSON.parse(JSON.stringify(productAttrs));
    options = options || {};
    const finalOptions = {};
    productAttrsCopy.deleted = false;

    if (options.paginationAttrs) {
      if (options.paginationAttrs.limit) {
        finalOptions.limit = options.paginationAttrs.limit;
      }
      if (options.paginationAttrs.offset) {
        finalOptions.skip = options.paginationAttrs.offset;
      }
    }
    if (options?.filters?.category) {
      productAttrsCopy["categories.slug"] = options.filters.category;
    }

    return ProductModel.find(productAttrsCopy, projection, finalOptions)
      .lean()
      .exec();
  }
  async findOne(productAttrs, projection) {
    return ProductModel.findOne(productAttrs, projection).lean().exec();
  }
  async updateOne(productAttrs, objectToUpdate, projection) {
    delete objectToUpdate._id;
    return ProductModel.findOneAndUpdate(
      productAttrs,
      { $set: objectToUpdate },
      { new: true, projection }
    )
      .lean()
      .exec();
  }
  async updateMany(productAttrs, objectToUpdate) {
    return ProductModel.updateMany(productAttrs, { $set: objectToUpdate });
  }
  async deleteOne(productAttrs) {
    return ProductModel.findOneAndUpdate(productAttrs, {
      $set: { active: false, deleted: true, deletedAt: new Date() },
    })
      .lean()
      .exec();
  }
  async count(productAttrs, filters) {
    productAttrs = { ...(productAttrs || {}) };
    filters = filters || {};

    const defaultAttributes = { deleted: false };

    productAttrs = { ...productAttrs, ...defaultAttributes };

    if (Array.isArray(filters.categoryIds) && filters.categoryIds.length) {
      productAttrs["categories._id"] = { $in: filters.categoryIds };
    }

    return ProductModel.countDocuments(productAttrs).lean().exec();
  }
}

export default ProductRepository;
