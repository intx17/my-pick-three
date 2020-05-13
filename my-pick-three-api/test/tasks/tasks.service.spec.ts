import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from '../../src/tasks/tasks.service'
import { Task } from '../../src/tasks/task.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { repositoryMockFactory, MockType } from '../../test/mock-factory'
import { Repository } from 'typeorm'
import { FindTaskResponseDto } from '../../src/tasks/dto/response/find-task.dto.response'
import { FindTaskRequestDto } from '../../src/tasks/dto/request/find-task.dto.request'
import { SaveTaskRequestDto } from '../../src/tasks/dto/request/save-task.dto.request'
import { SaveTaskResponseDto } from '../../src/tasks/dto/response/save-task.dto.response'

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
      expect(await service.find(request)).toMatchObject(expected)
      // check arg
      expect(mockRepository.findOne).toHaveBeenCalledWith({id: task.id})
    })

    it('should return empty response', async () => {
      mockRepository.findOne.mockReturnValue(task)

      const request: FindTaskRequestDto = {
        id: null
      }

      const expected: FindTaskResponseDto = new FindTaskResponseDto()
      expect(await service.find(request)).toMatchObject(expected)
    })
  })

  describe('save', () => {
    it('should return success response', async () => {
      mockRepository.save.mockImplementation(task => {
        const innerTask = new Task()
        innerTask.id = 1
        innerTask.name = task.name
        return innerTask
      })

      const request: SaveTaskRequestDto = {
        name: 'saved1'
      }

      const expected: SaveTaskResponseDto = {
        task: {
          id: 1,
          name: 'saved1'
        }
      }
      console.log(expected)
      expect(await service.save(request)).toMatchObject(expected)
      // check arg
      expect(mockRepository.save).toHaveBeenCalledWith({name: 'saved1'})
    })

    it('should return empty response', async () => {
      mockRepository.save.mockImplementation(task => {
        task.id = 1
        return task
      })

      const request: SaveTaskRequestDto = {
        name: null
      }

      const expected: SaveTaskResponseDto = new SaveTaskResponseDto()
      expect(await service.save(request)).toMatchObject(expected)
    })
  })
})
