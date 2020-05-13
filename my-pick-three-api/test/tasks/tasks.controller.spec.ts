import { Test, TestingModule } from '@nestjs/testing'
import { TasksController } from '../../src/tasks/tasks.controller'
import { TasksService } from '../../src/tasks/tasks.service'
import { FindTaskResponseDto } from '../../src/tasks/dto/response/find-task.dto.response'
import { FindTaskRequestDto } from '../../src/tasks/dto/request/find-task.dto.request'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Task } from '../../src/tasks/task.entity'
import { repositoryMockFactory } from '../../test/mock-factory'
import { SaveTaskRequestDto } from '../../src/tasks/dto/request/save-task.dto.request'

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
          useFactory: repositoryMockFactory
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
      // mock service
      jest.spyOn(tasksService, 'find').mockResolvedValue(result)

      const request: FindTaskRequestDto = {
        id: 1
      }
      expect(await tasksController.find(request)).toBe(result)

      // check arguments
      expect(tasksService.find).toHaveBeenCalledWith(request)
    })

    describe('save', () => {
      it('should return a task', async () => {
        const result: FindTaskResponseDto = {
          task: {
            id: 1,
            name: 'savedTask1'
          }
        }
        // mock service
        jest.spyOn(tasksService, 'save').mockResolvedValue(result)
  
        const request: SaveTaskRequestDto = {
          name: 'savedTask1'
        }
        expect(await tasksController.save(request)).toBe(result)
  
        // check arguments
        expect(tasksService.save).toHaveBeenCalledWith(request)
      })
    })
  })
})