import { Repository } from 'typeorm'

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
}))