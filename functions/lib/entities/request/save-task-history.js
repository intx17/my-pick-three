"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: '',
    taskId: '',
    taskName: '',
    taskDetail: '',
    categoryName: '',
    dateStr: '',
    done: false
});
class SaveTaskHistoryRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || (dv.email));
        this.taskId = (init.taskId || (dv.taskId));
        this.taskName = (init.taskName || dv.taskName);
        this.taskDetail = (init.taskDetail || dv.taskDetail);
        this.categoryName = (init.categoryName || dv.categoryName);
        this.dateStr = (init.dateStr || dv.dateStr);
        this.done = (init.done || dv.done);
    }
}
exports.default = SaveTaskHistoryRequest;
//# sourceMappingURL=save-task-history.js.map