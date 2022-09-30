import { Calculation } from '../../domain/calculation'
import { Math } from '../protocols/math'

export class MathCalculation implements Calculation {
  constructor (private readonly math: Math) {}

  async calculate (params: Calculation.Params): Promise<Calculation.Result> {
    await this.math.calculate(params)
    return await new Promise(resolve => resolve({
      root: 1,
      iterations: 1,
      generatedExcel: 'success'
    }))
  }
}
