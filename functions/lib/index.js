"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskHistory = exports.deleteTaskHistory = exports.saveTask = exports.saveTaskHistory = exports.searchCategory = exports.searchTaskHistory = exports.searchTask = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment");
const save_task_history_1 = require("./entities/response/save-task-history");
const save_task_1 = require("./entities/response/save-task");
admin.initializeApp();
const firestore = admin.firestore();
exports.searchTask = functions.https.onRequest(async (request, response) => {
    const email = request.body.email;
    const tasks = [];
    try {
        const taskDocs = await firestore.collection('users')
            .doc(email)
            .collection('tasks')
            .get();
        taskDocs.forEach((doc) => {
            const task = {
                categoryId: doc.data().categoryId,
                taskId: doc.id,
                taskName: doc.data().taskName,
                taskDetail: doc.data().taskDetail
            };
            tasks.push(task);
        });
        const searchResponse = {
            tasks
        };
        response.send(searchResponse);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
exports.searchTaskHistory = functions.https.onRequest(async (request, response) => {
    const email = request.body.email;
    try {
        // FIXME
        const startOfToday = moment().startOf('day').add('h', -9);
        const endOfToday = moment().endOf('day').add('h', -9);
        const histories = [];
        // get today's taskhistory
        const historiesDocs = await firestore.collection('users')
            .doc(email)
            .collection('taskHistories')
            .orderBy('date', 'asc')
            .startAt(startOfToday.toDate())
            .endAt(endOfToday.toDate())
            .get();
        historiesDocs.forEach((doc) => {
            const history = {
                taskId: doc.data().taskId,
                taskName: doc.data().taskName,
                taskDetail: doc.data().taskDetail,
                historyId: doc.id,
                categoryName: doc.data().categoryName,
                date: doc.data().date.toDate(),
                done: doc.data().done
            };
            histories.push(history);
        });
        const searchResponse = {
            taskHistories: histories
        };
        response.send(searchResponse);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
exports.searchCategory = functions.https.onRequest(async (request, response) => {
    const email = request.body.email;
    try {
        const categories = [];
        const categoryDocs = await firestore.collection('users')
            .doc(email)
            .collection('categories')
            .get();
        categoryDocs.forEach((doc) => {
            const c = {
                categoryId: doc.id,
                categoryCode: doc.data().categoryCode,
                categoryName: doc.data().categoryName
            };
            categories.push(c);
        });
        const searchResponse = {
            categories
        };
        response.send(searchResponse);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
exports.saveTaskHistory = functions.https.onRequest(async (request, response) => {
    const saveRequest = request.body;
    const email = saveRequest.email;
    const taskHistory = {
        taskId: saveRequest.taskId,
        taskName: saveRequest.taskName,
        taskDetail: saveRequest.taskDetail,
        categoryName: saveRequest.categoryName,
        date: moment(saveRequest.dateStr, 'YYYY-MM-DD').add('h', -9).toDate(),
        done: saveRequest.done
    };
    try {
        const ref = await firestore.collection('users').doc(email).collection('taskHistories').add(taskHistory);
        const saveResponse = new save_task_history_1.default({
            historyId: ref.id
        });
        response.send(saveResponse);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
exports.saveTask = functions.https.onRequest(async (request, response) => {
    const saveRequest = request.body;
    const email = saveRequest.email;
    const task = {
        taskName: saveRequest.taskName,
        taskDetail: saveRequest.taskDetail,
        categoryId: saveRequest.categoryId
    };
    try {
        const ref = await firestore.collection('users').doc(email).collection('tasks').add(task);
        const saveResponse = new save_task_1.default({
            taskId: ref.id
        });
        response.send(saveResponse);
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
exports.deleteTaskHistory = functions.https.onRequest(async (request, response) => {
    const deleteRequest = request.body;
    const email = deleteRequest.email;
    const historyId = deleteRequest.historyId;
    try {
        await firestore.collection('users').doc(email).collection('taskHistories').doc(historyId).delete();
        response.status(200).send();
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
exports.updateTaskHistory = functions.https.onRequest(async (request, response) => {
    const updateRequest = request.body;
    const email = updateRequest.email;
    const historyId = updateRequest.historyId;
    const done = updateRequest.done;
    try {
        await firestore.collection('users').doc(email).collection('taskHistories').doc(historyId).update({ done });
        response.status(200).send();
    }
    catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});
//# sourceMappingURL=index.js.map