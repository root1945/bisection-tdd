import { Calculation } from './Calculation'
import { GenerateExcel } from './GenerateExcel'

export class Dichotomy {
  constructor (
    private readonly calculation: Calculation,
    private readonly generateExcel: GenerateExcel
  ) {}

  async solver (params: Dichotomy.Params): Promise<Dichotomy.Result> {
    try {
      const result = await this.calculation.perfom(params)
      await this.generateExcel.generate({ table: result })
      return { result: 'success' }
    } catch {
      return { result: 'failure' }
    }
  }
}

export namespace Dichotomy {
  export interface Params {
    func: string
    interval: [number, number]
    precision: number
    maxIterations: number
  }

  export interface Result {
    result: 'success' | 'failure'
  }
}
