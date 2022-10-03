import dichotomyFactory from '@/main/factories/dichotomy'

const dichotomy = dichotomyFactory()

dichotomy.calculate({
  func: 'x^2 - 2',
  interval: [0, 2],
  maxIterations: 100,
  precision: 0.0001
}).then(success => {
  console.log(success)
}).catch(error => {
  console.log(error)
})
