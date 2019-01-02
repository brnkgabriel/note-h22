
var expect = require('chai').expect;
var all = require('../src/all');
var data = require('./data');
var mapdata = require('../src/map-data');

describe('all test', () => {
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  })
})

describe('all.utilities', () => {
  var totalPts;
  beforeEach(() => {
    totalPts = all.utilities.totalPts(data.scores, data.materials);
  })

  it('all.utilities.totalPts(scores, materials) should return an integer', () => {
    expect(isNaN(totalPts)).to.be.false
  });

  it('all.utilities.totalPts(scores, materials) should return the sum of points', () => {
    expect(totalPts).to.be.eql(-30)
  });

  it('all.utilities.birthday should return { day: 15, month: 10, year: 1990 } for "10/15/1990"', () => {
    var bdString = '10/15/1990';
    var expected = { day: 15, month: 10, year: 1990 };

    expect(all.utilities.birthday(bdString).day).to.be.eql(expected.day);
    expect(all.utilities.birthday(bdString).month).to.be.eql(expected.month);
    expect(all.utilities.birthday(bdString).year).to.be.eql(expected.year)
  });

  it('all.utilities.birthday should return { day: 15, month: 10, year: 2018 } for "2018-10-15"', () => {
    var bdString = '2018-10-15';
    var expected = { day: 15, month: 10, year: 2018 };

    expect(all.utilities.birthday(bdString).day).to.be.eql(expected.day);
    expect(all.utilities.birthday(bdString).month).to.be.eql(expected.month);
    expect(all.utilities.birthday(bdString).year).to.be.eql(expected.year);
  });

  it('all.utilities.age should return 27 for bd="11/5/1990" and today={ day: 5, month: 4, 2018 }', () => {
    var bdString = '11/5/1990';
    var today = { day: 5, month: 4, year: 2018 }
    expect(all.utilities.age(bdString, today)).to.be.eql(27)
  });

  it('all.utilities.age should return 27 for bd="10/15/1990" and today={ day: 16, month: 8, year: 2018 }', () => {
    var bdString = '10/15/1990';
    var today = { day: 16, month: 8, year: 2018 };
    expect(all.utilities.age(bdString, today)).to.be.eql(27)
  });

  it('all.utilities.age should return 28 for bd="1990-10-31" and today={ day: 25, month: 11, year: 2018 }', () => {
    var bdString = '1990-10-31';
    var today = { day: 25, month: 11, year: 2018 };
    expect(all.utilities.age(bdString, today)).to.be.eql(28)
  });
  
  it('all.utilities.aggregate(scores, materials, bdString) should return the points divided by age', () => {
    bdString = '10/31/1990';
    expected = -1.071;
    expect(all.utilities.aggregate(data.scores, data.materials, bdString)).to.be.eql(expected);
  }); 

  it('all.utilities.boundaries returns {start: 0, end: 14} for page=1,numPages=15, ', () => {
    var recordsPerPage = 15, page = 1;
    var numPages = all.utilities.numPages(mapdata.bibleTimeline, recordsPerPage);
    var expected = { start: 0, end: 14 };
    expect(all.utilities.boundaries(page, numPages,recordsPerPage, mapdata.bibleTimeline)).to.be.eql(expected);
  })
})