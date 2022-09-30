import { Calculation } from '../domain/Calculation'

export class Dichotomy {
  constructor (private readonly calculation: Calculation) {}

  async calculate (params: Dichotomy.Params): Promise<Dichotomy.Result> {
    await this.calculation.calculate(params)
    return await new Promise(resolve => resolve({ root: 0, iterations: 0, generatedExcel: '' }))
  }
}

export namespace Dichotomy {
  export interface Params {
    func: string
    interval: number[]
    precision: number
    maxIterations: number
  }

  export interface Result {
    root: number
    iterations: number
    generatedExcel: string
  }
}
