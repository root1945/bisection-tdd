import { compile } from 'mathjs'
import excel from 'exceljs'

interface DichotomyMethodBody {
  func: string
  interval: number[]
  precision: number
  maxIterations: number
}

interface Table {
  a: number
  fxa: number
  b: number
  fxb: number
  c: number
  fxc: number
}

export class DichotomyMethodController {
  async solver (body: any): Promise<string | Error> {
    const requiredFields = ['func', 'interval', 'precision']
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Error(`No ${field} provided`)
      }
    }
    const bodyDichotomy: DichotomyMethodBody = {
      func: body.func,
      interval: body.interval,
      precision: body.precision,
      maxIterations: body?.maxIterations || 100
    }
    const tbl = this.dichotomy(bodyDichotomy)
    await this.generateExcel(tbl)
    return 'success'
  }

  dichotomy (body: DichotomyMethodBody): Table[] {
    const { func, interval, precision, maxIterations } = body
    const compiled = compile(func)
    const table: Table[] = []
    let [a, b] = interval
    let c = (a + b) / 2
    let fxa = compiled.evaluate({ x: a })
    let fxb = compiled.evaluate({ x: b })
    let fxc = compiled.evaluate({ x: c })
    let i = 0
    while (Math.abs(fxc) > precision && i < maxIterations) {
      table.push({ a, fxa, b, fxb, c, fxc })
      if (fxa * fxc < 0) {
        b = c
        fxb = fxc
      } else {
        a = c
        fxa = fxc
      }
      c = (a + b) / 2
      fxc = compiled.evaluate({ x: c })
      i++
    }
    return table
  }

  async generateExcel (table: Table[]): Promise<void> {
    const workbook = new excel.Workbook()
    const worksheet = workbook.addWorksheet('Dichotomy Method')
    worksheet.columns = [
      { header: 'a', key: 'a' },
      { header: 'f(a)', key: 'fxa' },
      { header: 'b', key: 'b' },
      { header: 'f(b)', key: 'fxb' },
      { header: 'c', key: 'c' },
      { header: 'f(c)', key: 'fxc' }
    ]
    worksheet.addRows(table)
    await workbook.xlsx.writeFile('dichotomy.xlsx')
  }
}
