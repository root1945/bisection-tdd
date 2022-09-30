import { Math, Table } from '../../data/protocols/math'
import { compile, abs } from 'mathjs'

export class MathAdapter implements Math {
  async calculate (params: Math.Params): Promise<Math.Result> {
    const { func, interval, maxIterations, precision } = params
    const f = compile(func)
    let a = interval[0]
    let fxa = f.evaluate({ x: a })
    let b = interval[1]
    let fxb = f.evaluate({ x: b })
    let c = (a + b) / 2
    let i = 0
    const table: Table[] = []
    while (i < maxIterations && abs(fxb - fxa) > precision) {
      const fx = f.evaluate({ x: c })
      if (fx * fxb < 0) {
        a = c
        fxa = fx
      } else {
        b = c
        fxb = fx
      }
      c = (a + b) / 2
      i++
      table.push({
        a,
        fxa,
        b,
        fxb,
        c,
        fxc: f.evaluate({ x: c })
      })
    }
    return {
      root: c,
      iterations: i,
      table
    }
  }
}
