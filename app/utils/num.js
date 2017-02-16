export function add(a, b) {
  return a + b
}

export function asyncMultiple(a, b, callback) {
  setTimeout(()=>{
    callback(a*b)
  }, 1000)
}

export function square(num) {
  return Math.pow(num, 2)
}