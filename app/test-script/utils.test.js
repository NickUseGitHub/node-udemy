import {add, square} from '../utils/num'
import expect from 'expect'

const num1 = 3,
      num2 = 4

it('add two number', () => {
  const res = add(num1, num2)
  expect(res).toBeA('number')
})

it('square two number', () => {
  const res = square(num1)
  expect(res).toBeA('number')
})