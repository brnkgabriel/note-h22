
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
  var el;
  beforeEach(() => {
    totalPts = all.utilities.totalPts(data.scores, data.materials);
    el = {
      class: '',
      classList: {
        contains: function (cl) {
          return el.class.indexOf(cl) === -1
        },
        toggle: function (cl) {
          var classList = el.class.split(' '); 
          var classIdx = -1;
          for (var i = 0; i < classList.length; i++) {
            if (cl === classList[i]) {
              classIdx = i;
              break;
            }
          }
          if (classIdx === -1) {
            el.class = el.class + ' ' + cl
          } else {
            var splitClass = el.class.split(' ' + cl);
            el.class = splitClass[0] + splitClass[1]
          }
        }
      }
    }
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

  it('all.utilities.toggleModal(el) should add class is-visible to el', () => {
    all.utilities.toggleModal(el);
    expect(el.class).to.contain('is-visible')
  });

  it('all.utilities.toggleModal(el) should remove class is-visible', () => {
    all.utilities.toggleModal(el)
    all.utilities.toggleModal(el)
    expect(el.class).not.to.contain('is-visible')
  })

  it('all.utilities.search should return 7 items for Jesus search', () => {
    var toFind = 'Jesus';
    var matchedItems = all.utilities
    .search(
      toFind, mapdata.bibleTimeline,
      ['date-string', 'events-array']
    )
    expect(matchedItems.length).to.be.eql(7)
  })

  it('all.utilities.search should return 21 items for David search', () => {
    var toFind = 'David';
    var matchedItems = all.utilities
    .search(
      toFind, mapdata.bibleTimeline,
      ['date-string', 'events-array']
    )
    expect(matchedItems.length).to.be.eql(21)
  })
})