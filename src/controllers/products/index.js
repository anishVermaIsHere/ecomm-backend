import BaseController from "../base.controller";
import R from "../../shared/utils/ramda";

class ProductController extends BaseController {
    constructor(productService){
        this.__productService = productService;
    }
    __defaultProductProjection = {
        name:1,
        description:1,
        slug:1,
        categories:1,
        mrp:1,
        sp:1,
        stock:1,
        returnable:1,
        deleted:1,
        images:1,
        
    }
    __defaultQuery = {
        deleted: false
    }

    async find(req, res){
        const paginationAttrs = this.extractPaginationAttrs(req.query);
        const queryFilters = req.query?.filters || {};
        const fieldsToAdd = { 'images.image1':1 };
        const fieldsToOmit = ['stock', 'images'];
        const filters = {};

        const projection = {
            ...R.omit(fieldsToOmit, this.__defaultProductProjection),
            ...fieldsToAdd
        };

        if(queryFilters.categories){
            filter.categories = queryFilters.categories;
        }
        const options = { paginationAttrs, filters };
        const products = await this.__productService.find({ ...this.__defaultQuery }, projection, options);
        return this.successResponse(req, "Products",products, { paginationAttrs });

    }
    
    async findOne(req, res){

        const productSlug = req.params.slug;
        const query = {
            ...this.__defaultQuery,
            slug: productSlug
        };

        const product = await this.__productService.findOne(query, this.__defaultProductProjection);

        this.successResponse(res, "Product", product);
    }

};