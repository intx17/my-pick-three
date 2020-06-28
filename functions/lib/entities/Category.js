"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const defaultValues = () => ({
    categoryId: '',
    categoryCode: NaN,
    categoryName: ''
});
class Category {
    constructor(init = defaultValues()) {
        const dv = defaultValues();
        this.categoryId = (init.categoryId || (dv.categoryId || ''));
        this.categoryCode = (init.categoryCode || dv.categoryCode);
        this.categoryName = (init.categoryName || dv.categoryName);
    }
}
exports.Category = Category;
//# sourceMappingURL=Category.js.map