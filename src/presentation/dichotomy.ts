import { Calculation } from '@/domain/calculation'

export class Dichotomy {
  constructor (private readonly calculation: Calculation) {}

  async calculate (params: Dichotomy.Params): Promise<Dichotomy.Result> {
    const result = await this.calculation.calculate(params)
    return result
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
