"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: ''
});
class SearchTaskHistoryRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || dv.email);
    }
}
exports.default = SearchTaskHistoryRequest;
//# sourceMappingURL=search-task-history.js.map