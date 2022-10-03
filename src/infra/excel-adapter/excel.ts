import { GenerateExcel } from '@/data/protocols/generate-excel'
import exceljs from 'exceljs'

export class ExcelAdapter implements GenerateExcel {
  async generate (params: GenerateExcel.Params): Promise<GenerateExcel.Result> {
    const { table } = params
    const workbook = new exceljs.Workbook()
    const worksheet = workbook.addWorksheet('Dichotomy Method')
    worksheet.columns = [
      { header: 'xa', key: 'a', width: 10 },
      { header: 'f(xa)', key: 'fxa', width: 10 },
      { header: 'xb', key: 'b', width: 10 },
      { header: 'f(xb)', key: 'fxb', width: 10 },
      { header: 'xc', key: 'c', width: 10 },
      { header: 'f(xc)', key: 'fxc', width: 10 }
    ]
    worksheet.addRows(table)
    await workbook.xlsx.writeFile('dichotomy.xlsx')
    return {
      generatedExcel: 'success'
    }
  }
}
