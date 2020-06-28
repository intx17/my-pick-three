"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: ''
});
class SearchTaskRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || dv.email);
    }
}
exports.default = SearchTaskRequest;
//# sourceMappingURL=search-task.js.map