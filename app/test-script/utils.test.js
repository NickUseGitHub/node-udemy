import {add, asyncMultiple, square} from '../utils/num'
import expect from 'expect'

const num1 = 3,
      num2 = 4

describe('Utils', () => {
  it('add two number', () => {
    const res = add(num1, num2)
    expect(res).toBeA('number')
  })

  it('async multiple two number', done => {
    asyncMultiple(num1, num2, mul => {
      expect(mul).toBe(12).toBeA('number')
      done()
    })
  })

  it('square two number', () => {
    const res = square(num1)
    expect(res).toBeA('number')
  })
})

