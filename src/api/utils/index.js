import config from "../../config/config";

export default {
    paginateResult: (result) => {
        return {
            items: result.docs,
            _meta: {
                total_count: result.totalDocs,
                page_count: result.totalPages,
                current_page: result.page,
                per_page: result.limit
            }
        };
    },
    paginateParam: (req) => {
        let page;
        let perPage = config.params.perPage;
        let queryPage = parseInt(req.query.page);
        let queryPerPage = parseInt(req.query["per-page"]);

        if (req.query.page && queryPage > 1) {
            page = queryPage;
        } else {
            page = 1;
        }

        if (req.query["per-page"] && queryPerPage > 0) {
            if (queryPerPage > 200) {
                perPage = 200;
            } else {
                perPage = queryPerPage;
            }
        }

        return {
            page,
            limit: perPage
        };
    }
};
