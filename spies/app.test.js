import expect from 'expect'

describe('Spies', () => {
  it('should call spies', () => {
    const spy = expect.createSpy()
    spy()
    expect(spy).toHaveBeenCalled()
  })
})