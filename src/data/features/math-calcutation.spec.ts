import { Math } from '../protocols/math'
import { MathCalculation } from './math-calculation'
import { GenerateExcel } from '../protocols/generate-excel'

interface SutTypes {
  sut: MathCalculation
  mathStub: Math
  generateExcelStub: GenerateExcel
}

const makeGenerateExcelStub = (): GenerateExcel => {
  class GenerateExcelStub implements GenerateExcel {
    async generate (params: GenerateExcel.Params): Promise<GenerateExcel.Result> {
      return await new Promise(resolve => resolve({ generatedExcel: 'success' }))
    }
  }
  return new GenerateExcelStub()
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
  const generateExcelStub = makeGenerateExcelStub()
  const sut = new MathCalculation(mathStub, generateExcelStub)
  return {
    sut,
    mathStub,
    generateExcelStub
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

  it('Should throw if Math throws', async () => {
    const { sut, mathStub } = makeSut()
    jest.spyOn(mathStub, 'calculate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const promise = sut.calculate(params)
    await expect(promise).rejects.toThrow()
  })

  it('Should call GenerateExcel with correct values', async () => {
    const { sut, generateExcelStub } = makeSut()
    const generateExcelSpy = jest.spyOn(generateExcelStub, 'generate')
    const params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    await sut.calculate(params)
    expect(generateExcelSpy).toHaveBeenCalledWith({
      table: [
        { a: 1, fxa: 1, b: 1, fxb: 1, c: 1, fxc: 1 }
      ]
    })
  })

  it('Should not call GenerateExcel if Math returns empty table', async () => {
    const { sut, mathStub, generateExcelStub } = makeSut()
    jest.spyOn(mathStub, 'calculate').mockReturnValueOnce(new Promise(resolve => resolve({
      root: 1,
      iterations: 1,
      table: []
    })))
    const generateExcelSpy = jest.spyOn(generateExcelStub, 'generate')
    const params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const result = await sut.calculate(params)
    expect(generateExcelSpy).not.toHaveBeenCalled()
    expect(result).toEqual({
      root: 0,
      iterations: 0,
      generatedExcel: 'not values to generate excel'
    })
  })
})
