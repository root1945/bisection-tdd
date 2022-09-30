import { Calculation } from '../domain/calculation'
import { Dichotomy } from './dichotomy'

interface SutTypes {
  sut: Dichotomy
  calculationStub: Calculation
}

const makeCalculationStub = (): Calculation => {
  class CalculationStub implements Calculation {
    async calculate (params: Calculation.Params): Promise<Calculation.Result> {
      return await new Promise(resolve => resolve({ root: 1, iterations: 1, generatedExcel: 'success' }))
    }
  }
  return new CalculationStub()
}

const makeSut = (): SutTypes => {
  const calculationStub = makeCalculationStub()
  const sut = new Dichotomy(calculationStub)
  return {
    sut,
    calculationStub
  }
}

describe('Dichotomy', () => {
  const params = {
    func: 'e^x + x/2',
    interval: [-1, 0],
    precision: 0.00001,
    maxIterations: 100
  }

  it('Should call Calculation with correct values', async () => {
    const { sut, calculationStub } = makeSut()
    const calculationSpy = jest.spyOn(calculationStub, 'calculate')
    await sut.calculate(params)
    expect(calculationSpy).toHaveBeenCalledWith(params)
  })

  it('Should return the same result as Calculation', async () => {
    const { sut } = makeSut()
    const result = await sut.calculate(params)
    expect(result).toEqual({ root: 1, iterations: 1, generatedExcel: 'success' })
  })

  it('Should throw if Calculation throws', async () => {
    const { sut, calculationStub } = makeSut()
    jest.spyOn(calculationStub, 'calculate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.calculate(params)
    await expect(promise).rejects.toThrow()
  })
})
