import { DichotomyMethodController } from './dichotomy'

describe('DichotomyMethodController', () => {
  it('Should return error if no func is provided', async () => {
    const sut = new DichotomyMethodController()
    const body = {
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }

    const result = await sut.solver(body)

    expect(result).toEqual(new Error('No func provided'))
  })

  it('Should return error if no interval is provided', async () => {
    const sut = new DichotomyMethodController()
    const body = {
      func: 'e^x + x/2',
      precision: 0.00001,
      maxIterations: 100
    }
    const result = await sut.solver(body)

    expect(result).toEqual(new Error('No interval provided'))
  })

  it('Should return error if no precision is provided', async () => {
    const sut = new DichotomyMethodController()
    const body = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      maxIterations: 100
    }

    const result = await sut.solver(body)

    expect(result).toEqual(new Error('No precision provided'))
  })

  it('Call the dichotomy function if the parameters are correct', async () => {
    const sut = new DichotomyMethodController()
    const body = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const spy = jest.spyOn(sut, 'dichotomy')

    await sut.solver(body)

    expect(spy).toHaveBeenCalled()
  })

  it('Call the generateExcel function if the dichotomy function returns an array', async () => {
    const sut = new DichotomyMethodController()
    const body = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }
    const spy = jest.spyOn(sut, 'generateExcel')

    await sut.solver(body)

    expect(spy).toHaveBeenCalled()
  })

  it('Should return success if the parameters are correct', async () => {
    const sut = new DichotomyMethodController()
    const body = {
      func: 'e^x + x/2',
      interval: [-1, 0],
      precision: 0.00001,
      maxIterations: 100
    }

    const result = await sut.solver(body)

    expect(result).toEqual('success')
  })
})
