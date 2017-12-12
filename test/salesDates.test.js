const chai = require('chai')
const expect = chai.expect
const dateLib = require(process.env.PWD + '/lib/date')

describe('Date Lib', () => {
  it('should choose tuesday')
  it('should choose friday')
})

it('should choose tuesday', (done) => {
  // Sales will be called on monday
  const monday = new Date('2017/12/11')
  // Expected date, formatted to : mmdd
  const expectedFrom = '1212' // from Tuesday
  const expectedEnd = '1215' // to Friday

  const actual = dateLib.closestSalesDates(monday)
  expect(actual.from).to.equal(expectedFrom)
  expect(actual.end).to.equal(expectedEnd)

  done()
})

it('should choose friday', (done) => {
  // Sales will be called on monday
  const thursday = new Date('2017/12/14')
  // Expected date, formatted to : mmdd
  const expectedFrom = '1215' // from Friday
  const expectedEnd = '1218' // to Monday

  const actual = dateLib.closestSalesDates(thursday)
  expect(actual.from).to.equal(expectedFrom)
  expect(actual.end).to.equal(expectedEnd)

  done()
})