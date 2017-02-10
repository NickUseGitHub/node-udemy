import {add, square} from '../utils/num'

const num1 = 3,
      num2 = 4

it('should add two number', () => {
  const res = add(num1, num2)
  console.log(`test add result -- ${res}`)

  if (typeof res !== 'number') {
    throw new Error(`result(${res}) not a number`)
  }
})

it('should square two number', () => {
  const res = square(num1)
  console.log(`test square result -- ${res}`)

  if (typeof res !== 'number') {
    throw new Error(`result(${res}) not a number`)
  }
})