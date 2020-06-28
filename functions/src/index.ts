import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as moment from 'moment'

import { ITaskHistory, TaskHistory } from './entities/task-history'
import SaveTaskHistoryRequest from './entities/request/save-task-history'
import SaveTaskHistoryResponse from './entities/response/save-task-history'
import SaveTaskRequest from './entities/request/save-task'
import { ITask, Task } from './entities/task'
import SaveTaskResponse from './entities/response/save-task'
import SearchTaskResponse from './entities/response/search-task'
import SearchTaskHistoryResponse from './entities/response/search-task-history'
import { Category } from './entities/Category'
import SearchCategoryResponse from './entities/response/search-category'
import DeleteTaskHistoryRequest from './entities/request/delete-task-history'
import UpdateTaskHistoryRequest from './entities/request/update-task-history'

admin.initializeApp()

const firestore = admin.firestore()

export const searchTask = functions.https.onRequest(async (request, response) => {
  const email = request.body.email

  const tasks: Task[] = []
  try {
    const taskDocs = await firestore.collection('users')
      .doc(email)
      .collection('tasks')
      .get()

    taskDocs.forEach((doc: any) => {
      const task: Task = {
        categoryId: doc.data().categoryId,
        taskId: doc.id,
        taskName: doc.data().taskName,
        taskDetail: doc.data().taskDetail
      }
      tasks.push(task)
    })
    const searchResponse: SearchTaskResponse = {
      tasks
    }
    response.send(searchResponse)
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})

export const searchTaskHistory = functions.https.onRequest(async (request, response) => {
  const email = request.body.email

  try {
    // FIXME
    const startOfToday = moment().startOf('day').add('h', -9)
    const endOfToday = moment().endOf('day').add('h', -9)
    const histories: TaskHistory[] = []

    // get today's taskhistory
    const historiesDocs = await firestore.collection('users')
      .doc(email)
      .collection('taskHistories')
      .orderBy('date', 'asc')
      .startAt(startOfToday.toDate())
      .endAt(endOfToday.toDate())
      .get()

    historiesDocs.forEach((doc: any) => {
      const history: TaskHistory = {
        taskId: doc.data().taskId,
        taskName: doc.data().taskName,
        taskDetail: doc.data().taskDetail,
        historyId: doc.id,
        categoryName: doc.data().categoryName,
        date: doc.data().date.toDate(),
        done: doc.data().done
      }
      histories.push(history)
    })
    const searchResponse: SearchTaskHistoryResponse = {
      taskHistories: histories
    }
    response.send(searchResponse)
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})

export const searchCategory = functions.https.onRequest(async (request, response) => {
  const email = request.body.email

  try {
    const categories: Category[] = []
    const categoryDocs = await firestore.collection('users')
      .doc(email)
      .collection('categories')
      .get()
    categoryDocs.forEach((doc: any) => {
      const c: Category = {
        categoryId: doc.id,
        categoryCode: doc.data().categoryCode,
        categoryName: doc.data().categoryName
      }
      categories.push(c)
    })
    const searchResponse: SearchCategoryResponse = {
      categories
    }
    response.send(searchResponse)
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})

export const saveTaskHistory = functions.https.onRequest(async (request, response) => {
  const saveRequest: SaveTaskHistoryRequest = request.body
  const email = saveRequest.email
  const taskHistory: ITaskHistory = {
    taskId: saveRequest.taskId,
    taskName: saveRequest.taskName,
    taskDetail: saveRequest.taskDetail,
    categoryName: saveRequest.categoryName,
    date: moment(saveRequest.dateStr, 'YYYY-MM-DD').add('h', -9).toDate(),
    done: saveRequest.done
  }

  try {
    const ref = await firestore.collection('users').doc(email).collection('taskHistories').add(taskHistory)
    const saveResponse: SaveTaskHistoryResponse = new SaveTaskHistoryResponse({
      historyId: ref.id
    })
    response.send(saveResponse)
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})

export const saveTask = functions.https.onRequest(async (request, response) => {
  const saveRequest: SaveTaskRequest = request.body
  const email = saveRequest.email
  const task: ITask = {
    taskName: saveRequest.taskName,
    taskDetail: saveRequest.taskDetail,
    categoryId: saveRequest.categoryId
  }

  try {
    const ref = await firestore.collection('users').doc(email).collection('tasks').add(task)
    const saveResponse: SaveTaskResponse = new SaveTaskResponse({
      taskId: ref.id
    })
    response.send(saveResponse)
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})

export const deleteTaskHistory = functions.https.onRequest(async (request, response) => {
  const deleteRequest: DeleteTaskHistoryRequest = request.body
  const email = deleteRequest.email
  const historyId = deleteRequest.historyId

  try {
    await firestore.collection('users').doc(email).collection('taskHistories').doc(historyId).delete()
    response.status(200).send()
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})

export const updateTaskHistory = functions.https.onRequest(async (request, response) => {
  const updateRequest: UpdateTaskHistoryRequest = request.body
  const email = updateRequest.email
  const historyId = updateRequest.historyId
  const done = updateRequest.done

  try {
    await firestore.collection('users').doc(email).collection('taskHistories').doc(historyId).update({ done })
    response.status(200).send()
  } catch (err) {
    console.log(err)
    response.status(500).send(err)
  }
})
