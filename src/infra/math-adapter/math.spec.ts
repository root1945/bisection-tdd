import { MathAdapter } from './math'
import mathjs from 'mathjs'

jest.mock('mathjs', () => ({
  compile (expression: string): string {
    return 'any_expression'
  }
}))

const makeSut = (): MathAdapter => {
  return new MathAdapter()
}

describe('MathAdapter', () => {
  it('Should call compile with correct expression', async () => {
    const sut = makeSut()
    const compileSpy = jest.spyOn(mathjs, 'compile')
    await sut.calculate({
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    })
    expect(compileSpy).toHaveBeenCalledWith('e^x + x/2')
  })
})
