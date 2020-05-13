import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from '../../src/tasks/tasks.service'
import { Task } from '../../src/tasks/task.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

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


describe('TasksService', () => {
  let service: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository
        }
      ],
    }).compile()

    service = module.get<TasksService>(TasksService)
  })
it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
