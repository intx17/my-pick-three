"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: ''
});
class SearchCategoryRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || dv.email);
    }
}
exports.default = SearchCategoryRequest;
//# sourceMappingURL=search-category.js.map