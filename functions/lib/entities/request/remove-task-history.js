"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: '',
    historyId: '',
    done: false
});
class RemoveTaskHistoryRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || (dv.email));
        this.historyId = (init.historyId || (dv.historyId));
        this.done = (init.done || (dv.done));
    }
}
exports.default = RemoveTaskHistoryRequest;
//# sourceMappingURL=remove-task-history.js.map