export interface Calculation {
  calculate: (params: Calculation.Params) => Promise<Calculation.Result>
}

export namespace Calculation {
  export interface Params {
    func: string
    interval: number[]
    precision: number
    maxIterations: number
  }

  export interface Result {
    root: number
    iterations: number
    generatedExcel: string
  }
}
