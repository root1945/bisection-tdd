import { MathCalculation } from '@/data/features/math-calculation'
import { MathAdapter } from '@/infra/math-adapter/math'
import { Dichotomy } from '@/presentation/dichotomy'
import { ExcelAdapter } from '@/infra/excel-adapter/excel'

const dichotomyFactory = (): Dichotomy => {
  const math = new MathAdapter()
  const excel = new ExcelAdapter()
  const calculation = new MathCalculation(math, excel)
  return new Dichotomy(calculation)
}

export default dichotomyFactory
