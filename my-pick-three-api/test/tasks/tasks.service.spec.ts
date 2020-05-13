import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from '../../src/tasks/tasks.service'
import { Task } from '../../src/tasks/task.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { repositoryMockFactory, MockType } from '../../test/mock-factory'
import { Repository } from 'typeorm'
import { FindTaskResponseDto } from '../../src/tasks/dto/response/find-task.dto.response'
import { FindTaskRequestDto } from '../../src/tasks/dto/request/find-task.dto.request'

describe('TasksService', () => {
  let service: TasksService
  let mockRepository: MockType<Repository<Task>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: repositoryMockFactory
        }
      ],
    }).compile()

    service = module.get<TasksService>(TasksService)
    mockRepository = module.get(getRepositoryToken(Task))

  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('find', () => {
    const task: Task = {
      id: 1,
      name: 'name1'
    }

    it('should return success response', async () => {
      mockRepository.findOne.mockReturnValue(task)

      const request: FindTaskRequestDto = {
        id: 1
      }

      const expected: FindTaskResponseDto = {
        task: task
      }
      expect(await service.find(request)).toStrictEqual(expected)
      // check arg
      expect(mockRepository.findOne).toHaveBeenCalledWith({id: task.id})
    })

    it('should return empty response', async () => {
      mockRepository.findOne.mockReturnValue(task)

      const request: FindTaskRequestDto = {
        id: null
      }

      const expected: FindTaskResponseDto = new FindTaskResponseDto()
      expect(await service.find(request)).toStrictEqual(expected)
    })
  })
})
