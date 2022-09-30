export interface Calculation {
  perfom: (params: Calculation.Params) => Promise<Calculation.Result[]>
}

export namespace Calculation {
  export interface Params {
    func: string
    interval: [number, number]
    precision: number
    maxIterations: number
  }

  export interface Result {
    a: number
    fxa: number
    b: number
    fxb: number
    c: number
    fxc: number
  }
}
