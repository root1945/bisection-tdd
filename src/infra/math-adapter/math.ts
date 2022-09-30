import { Math } from '../../data/protocols/math'
import { compile, EvalFunction } from 'mathjs'

export class MathAdapter implements Math {
  private f: EvalFunction

  async calculate (params: Math.Params): Promise<Math.Result> {
    const { func } = params
    this.f = compile(func)
    return await new Promise(resolve => resolve({
      iterations: 0,
      root: 0,
      table: []
    }))
  }

  getF (): EvalFunction {
    return this.f
  }
}
