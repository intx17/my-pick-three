"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValues = () => ({
    email: '',
    taskName: '',
    taskDetail: '',
    categoryId: ''
});
class SaveTaskRequest {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.email = (init.email || dv.email);
        this.taskName = (init.taskName || dv.taskName);
        this.taskDetail = (init.taskDetail || dv.taskDetail);
        this.categoryId = (init.categoryId || dv.categoryId);
    }
}
exports.default = SaveTaskRequest;
//# sourceMappingURL=save-task.js.map