"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: '',
    historyId: ''
});
class DeleteTaskHistoryRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || (dv.email));
        this.historyId = (init.historyId || (dv.historyId));
    }
}
exports.default = DeleteTaskHistoryRequest;
//# sourceMappingURL=delete-task-history.js.map