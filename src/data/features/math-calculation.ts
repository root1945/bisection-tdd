import { Calculation } from '../../domain/calculation'
import { GenerateExcel } from '../protocols/generate-excel'
import { Math } from '../protocols/math'

export class MathCalculation implements Calculation {
  constructor (
    private readonly math: Math,
    private readonly generateExcel: GenerateExcel
  ) {}

  async calculate (params: Calculation.Params): Promise<Calculation.Result> {
    const { table } = await this.math.calculate(params)

    if (table.length === 0) {
      return {
        root: 0,
        iterations: 0,
        generatedExcel: 'not values to generate excel'
      }
    }

    await this.generateExcel.generate({ table })

    return await new Promise(resolve => resolve({
      root: 1,
      iterations: 1,
      generatedExcel: 'success'
    }))
  }
}
