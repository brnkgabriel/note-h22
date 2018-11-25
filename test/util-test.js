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

describe('util', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  })

  it('.decodeScores(codedScores) should return decodedScores', () => {
    expect(util.decodeScores(codedScores)).to.be.eql(decodedScores)
  })

  it('.codeScores(decodedScores) should return codedScores', () => {
    expect(util.codeScores(decodedScores)).to.be.eql(codedScores)
  })
})

describe('util', () => {
  it(`.getBirthdayObject should return { day: 15, month: 10, year: 1990 } for '10/15/1990'`, () => {
    var birthday = '10/15/1990';
    var birthdayObject = {
      day: 15,
      month: 10,
      year: 1990
    };
    expect(util.getBirthdayObject(birthday).day).to.be.eql(birthdayObject.day);
    expect(util.getBirthdayObject(birthday).month).to.be.eql(birthdayObject.month);
    expect(util.getBirthdayObject(birthday).year).to.be.eql(birthdayObject.year);
  })

  it(`.getBirthdayObject should return { day: 15, month: 10, year: 2018 } for '2018-10-15`, () => {
    var birthday = '2018-10-15';
    var birthdayObject = {
      day: 15,
      month: 10,
      year: 2018
    };
    expect(util.getBirthdayObject(birthday).day).to.be.eql(birthdayObject.day);
    expect(util.getBirthdayObject(birthday).month).to.be.eql(birthdayObject.month);
    expect(util.getBirthdayObject(birthday).year).to.be.eql(birthdayObject.year);
  })

  it(`.getAge returns yrDifference-1 if today's < birthday's month and today's day < birthday's day`, () => {
    var birthday = '11/5/1990';
    const today = {
      day: 5,
      month: 4,
      year: 2018
    };

    expect(util.getAge(birthday, today)).to.be.eql(27);
  })

  it(`.getAge returns yrDifference-1 if today's month < birthday's month and today's day is > birthday's day`, () => {
    var birthday = '10/15/1990';
    var today = {
      day: 16,
      month: 8,
      year: 2018
    };
    expect(util.getAge(birthday, today)).to.be.eql(27)
  });

  it(`.getAge returns 28 if birthday is '1990-10-31 and today is 2018-11-25`, () => {
    var birthday = '1990-10-31';
    var today = {
      day: 25,
      month: 11,
      year: 2018
    };
    expect(util.getAge(birthday, today)).to.be.eql(28)
  })
})