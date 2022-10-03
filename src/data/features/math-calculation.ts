import { Calculation } from '@/domain/calculation'
import { GenerateExcel } from '@/data/protocols/generate-excel'
import { Math } from '@/data/protocols/math'

export class MathCalculation implements Calculation {
  constructor (
    private readonly math: Math,
    private readonly generateExcel: GenerateExcel
  ) {}

  async calculate (params: Calculation.Params): Promise<Calculation.Result> {
    const { table, iterations, root } = await this.math.calculate(params)

    if (table.length === 0) {
      return {
        root: 0,
        iterations: 0,
        generatedExcel: 'not values to generate excel'
      }
    }

    const { generatedExcel } = await this.generateExcel.generate({ table })

    return Object.assign({}, { root, iterations, generatedExcel })
  }
}
