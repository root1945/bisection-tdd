import { DichotomyMethodController } from './dichotomy'

const dichotomyMethodController = new DichotomyMethodController()
const body = {
  func: 'e^x + x/2',
  interval: [-1, 0],
  precision: 0.00001,
  maxIterations: 100
}
const result = dichotomyMethodController.solver(body)
console.log(result)
