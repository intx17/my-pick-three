import { Test, TestingModule } from '@nestjs/testing'
import { TasksController } from '../../src/tasks/tasks.controller'
import { TasksService } from '../../src/tasks/tasks.service'
import { FindTaskResponseDto } from '../../src/tasks/dto/response/find-task.dto.response'
import { FindTaskRequestDto } from '../../src/tasks/dto/request/find-task.dto.request'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Task } from '../../src/tasks/task.entity'

const mockRepository = jest.fn(() => ({
  findOne: jest.fn<Promise<Task>, []>(() => {
    return new Promise(resolve => {
      resolve({
        id: 1,
        name: 'task1'
      })
    })
  })
}))

describe('Tasks Controller', () => {
  let tasksController: TasksController
  let tasksService: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository
        }
      ]
    }).compile()
    
    tasksController = module.get<TasksController>(TasksController)
    tasksService = module.get<TasksService>(TasksService)
  })

  it('should be defined', () => {
      expect(tasksController).toBeDefined()
    })

  describe('find', () => {
    it('should return a task', async () => {
      const result: FindTaskResponseDto = {
        task: {
          id: 1,
          name: 'task1'
        }
      }
      jest.spyOn(tasksService, 'find').mockResolvedValue(result)

      const request: FindTaskRequestDto = {
        id: 1
      }
      expect(await tasksController.find(request)).toBe(result)
    })
  })
})