
class BaseController {
    extractPaginationAttrs(query){
        const page = query.page || 1;
        const limit = query.limit || 10;
        const offset = (page - 1) * limit;

        return { page, limit, offset };
    }

    successResponse(res, message, data, otherInfo = undefined){
        return res.json({ data, status: "Success", message, otherInfo, statusCode: 200 });
    }

    unauthorizedResponse(res, message, data, otherInfo = undefined){
        return res.status(401).json({ data, status: "Error", message, otherInfo, statusCode: 401 });
    }
}

export default BaseController;