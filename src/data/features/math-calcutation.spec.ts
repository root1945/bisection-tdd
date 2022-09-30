import { Math } from '../protocols/math'
import { MathCalculation } from './math-calculation'

interface SutTypes {
  sut: MathCalculation
  mathStub: Math
}

const makeMathStub = (): Math => {
  class MathStub implements Math {
    async calculate (params: Math.Params): Promise<Math.Result> {
      return await new Promise(resolve => resolve(
        {
          root: 1,
          iterations: 1,
          table: [
            { a: 1, fxa: 1, b: 1, fxb: 1, c: 1, fxc: 1 }
          ]
        }
      ))
    }
  }
  return new MathStub()
}

const makeSut = (): SutTypes => {
  const mathStub = makeMathStub()
  const sut = new MathCalculation(mathStub)
  return {
    sut,
    mathStub
  }
}

describe('MathCalculation', () => {
  it('Should call Math with correct values', async () => {
    const { sut, mathStub } = makeSut()
    const mathSpy = jest.spyOn(mathStub, 'calculate')
    const params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    await sut.calculate(params)
    expect(mathSpy).toHaveBeenCalledWith(params)
  })
})
