import { Table } from './math'

export interface GenerateExcel {
  generate: (params: GenerateExcel.Params) => Promise<GenerateExcel.Result>
}

export namespace GenerateExcel {
  export interface Params {
    table: Table[]
  }

  export interface Result {
    generatedExcel: string
  }
}
