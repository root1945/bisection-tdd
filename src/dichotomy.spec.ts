import { Calculation } from './Calculation'
import { Dichotomy } from './Dichotomy'
import { GenerateExcel } from './GenerateExcel'

const makeCalculationStub = (): Calculation => {
  class CalculationStub implements Calculation {
    async perfom (params: Calculation.Params): Promise<Calculation.Result[]> {
      return await new Promise(resolve => resolve([{
        a: 1,
        fxa: 1,
        b: 1,
        fxb: 1,
        c: 1,
        fxc: 1
      }]))
    }
  }
  return new CalculationStub()
}

const makeGenerateExcelStub = (): GenerateExcel => {
  class GenerateExcelStub implements GenerateExcel {
    async generate (params: GenerateExcel.Params): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new GenerateExcelStub()
}

interface SutTypes {
  sut: Dichotomy
  calculationStub: Calculation
  generateExcelStub: GenerateExcel
}

const makeSut = (): SutTypes => {
  const calculationStub = makeCalculationStub()
  const generateExcelStub = makeGenerateExcelStub()
  const sut = new Dichotomy(calculationStub, generateExcelStub)
  return {
    sut,
    calculationStub,
    generateExcelStub
  }
}

describe('Dichotomy', () => {
  it('Should call Calculation with correct values', async () => {
    const { sut, calculationStub } = makeSut()
    const perfomSpy = jest.spyOn(calculationStub, 'perfom')
    const params: Dichotomy.Params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    await sut.solver(params)
    expect(perfomSpy).toHaveBeenCalledWith({
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    })
  })

  it('Should return failure if Calculation throws', async () => {
    const { sut, calculationStub } = makeSut()
    jest.spyOn(calculationStub, 'perfom').mockImplementationOnce(() => {
      throw new Error()
    })
    const params: Dichotomy.Params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const result = await sut.solver(params)
    expect(result).toEqual({ result: 'failure' })
  })

  it('Should call GenerateExcel with correct values', async () => {
    const { sut, generateExcelStub } = makeSut()
    const generateSpy = jest.spyOn(generateExcelStub, 'generate')
    const params: Dichotomy.Params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    await sut.solver(params)
    expect(generateSpy).toHaveBeenCalledWith({
      table: [{
        a: 1,
        fxa: 1,
        b: 1,
        fxb: 1,
        c: 1,
        fxc: 1
      }]
    })
  })

  it('Should return failure if GenerateExcel throws', async () => {
    const { sut, generateExcelStub } = makeSut()
    jest.spyOn(generateExcelStub, 'generate').mockImplementationOnce(() => {
      throw new Error()
    })
    const params: Dichotomy.Params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const result = await sut.solver(params)
    expect(result).toEqual({ result: 'failure' })
  })

  it('Should return success if everything is ok', async () => {
    const { sut } = makeSut()
    const params: Dichotomy.Params = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const result = await sut.solver(params)
    expect(result).toEqual({ result: 'success' })
  })
})
