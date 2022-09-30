export interface Table {
  a: number
  fxa: number
  b: number
  fxb: number
  c: number
  fxc: number
}

export interface Math {
  calculate: (params: Math.Params) => Promise<Math.Result>
}

export namespace Math {
  export interface Params {
    func: string
    interval: number[]
    precision: number
    maxIterations: number
  }

  export interface Result {
    root: number
    iterations: number
    table: Table[]
  }
}
