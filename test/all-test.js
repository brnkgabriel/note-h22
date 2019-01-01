
var expect = require('chai').expect;
var all = require('../src/all');
var data = require('./data')

describe('all test', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  })
})

describe('all.quiz', () => {
  it('all.quiz.aggregate(scores) should return an integer', () => {
    var aggregate = all.utilities.aggregate(data.scores);
    expect(isNaN(aggregate)).to.be.false
  })
})