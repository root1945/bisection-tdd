import { Math } from '../../data/protocols/math'
import { compile } from 'mathjs'

export class MathAdapter implements Math {
  async calculate (params: Math.Params): Promise<Math.Result> {
    const { func } = params
    compile(func)
    return await new Promise(resolve => resolve({
      iterations: 0,
      root: 0,
      table: []
    }))
  }
}
