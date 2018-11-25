var expect = require('chai').expect;
var util = require('../src/util');

var codedScores = '2018-02-23|87|13|160|12|13.328';
var decodedScores = {
  date: '2018-02-23',
  message: "The Pilgrim's Progress",
  preacher: 'John Bunyan',
  score: '160',
  age: '12',
  aggregate: '13.328'
}

describe('util test', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  })

  it('util.decodeScores(codedScores) should return decodedScores', () => {
    expect(util.decodeScores(codedScores)).to.be.eql(decodedScores)
  });

  it('util.codeScores(decodedScores) should return codedScores', () => {
    expect(util.codeScores(decodedScores)).to.be.eql(codedScores)
  })
})