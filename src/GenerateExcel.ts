export interface GenerateExcel {
  generate: (params: GenerateExcel.Params) => Promise<void>
}

export namespace GenerateExcel {
  export interface Params {
    table: object[]
  }
}
