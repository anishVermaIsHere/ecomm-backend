
class ProductService {
    constructor(productRepository){
        this.__productRepository = productRepository;
    }

    async create(product, createdBy){
        product.createdBy = createdBy;
        return this.__productRepository.create(product, createdBy);
    }
    async find(productProps, projection, options){
        return this.__productRepository.find(productProps, projection, options);
    }
    async findOne(productProps, projection){
        return this.__productRepository.findOne(productProps, projection);
    }
    async updateOne(productProps, fieldsToUpdate, projection){
        return this.__productRepository.updateOne(productProps, fieldsToUpdate, projection);
    }
    async updateMany(productAttrs, fieldsToUpdate){
        return this.__productRepository.updateMany(productAttrs, fieldsToUpdate);
    }
    async deleteOne(productAttrs){
        return this.__productRepository.deleteOne(productAttrs);
    }
};

export default ProductService;