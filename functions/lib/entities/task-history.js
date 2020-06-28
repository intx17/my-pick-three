"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHistory = void 0;
const defaultValues = () => ({
    taskId: '',
    historyId: undefined,
    taskName: '',
    taskDetail: '',
    categoryName: '',
    date: new Date(),
    done: false
});
class TaskHistory {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.historyId = (init.historyId || (dv.historyId || ''));
        this.taskId = (init.taskId || (dv.taskId));
        this.taskName = (init.taskName || dv.taskName);
        this.taskDetail = (init.taskDetail || dv.taskDetail);
        this.categoryName = (init.categoryName || dv.categoryName);
        this.date = (init.date || dv.date);
        this.done = (init.done || dv.done);
    }
}
exports.TaskHistory = TaskHistory;
//# sourceMappingURL=task-history.js.map