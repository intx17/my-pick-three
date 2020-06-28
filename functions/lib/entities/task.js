"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const defaultValues = () => ({
    taskId: '',
    taskName: '',
    taskDetail: '',
    categoryId: ''
});
class Task {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.taskId = (init.taskId || (dv.taskId || ''));
        this.taskName = (init.taskName || dv.taskName);
        this.taskDetail = (init.taskDetail || dv.taskDetail);
        this.categoryId = (init.categoryId || dv.categoryId);
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map