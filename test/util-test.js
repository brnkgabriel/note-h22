var expect = require('chai').expect;
var util = require('../src/util');
var quizData = require('./data')

var codedScores = '2018-02-23|87|13|160|12|13.328';
var decodedScores = {
  date: '2018-02-23',
  message: "The Pilgrim's Progress",
  preacher: 'John Bunyan',
  score: '160',
  age: '12',
  aggregate: '13.328'
}

var decodedStudent = {
  email: "brnkgabriel@gmail.com",
  first_name: "Olanrewaju",
  last_name: "Ibironke",
  roles_permissions: {
    roles: "student"
  },
  uid: "2Bs8P3CP1aMHXxQZ4gAJezLuzZG2",
  user_data: {
    birthday: "1990-10-31",
    quiz_status: {
      cTab: "Worship",
      wQAnswered: "0",
      wQGotten: "0",
      wQMissed: "0",
      mQAnswered: "0",
      mQGotten: "0",
      mQMissed: "0",
      sTyped: "0",
      sWordsTyped: "",
      sGotten: "0",
      sMissed: "0",
      tPoints: "0",
      aggregate: "0",
      lastQuizIndex: "0"
    },
    scores: [
      {
        age: "28",
        aggregate: "0",
        date: "2018-11-26",
        message: "Signed Up",
        preacher: "Admin",
        score: "0"
      },
      {
        age: "28",
        aggregate: "0",
        date: "2018-11-25",
        message: "Signed Up",
        preacher: "Admin",
        score: "0"
      }
    ]
  }
}
var encodedStudent = {
  email: "brnkgabriel@gmail.com",
  first_name: "Olanrewaju",
  last_name: "Ibironke",
  roles_permissions: {
    roles: "student"
  },
  uid: "2Bs8P3CP1aMHXxQZ4gAJezLuzZG2",
  user_data: {
    birthday: "1990-10-31",
    scores: "2018-11-26|101|3|0|28|0*2018-11-25|101|3|0|28|0",
    quiz_status: {
      cTab: "Worship",
      wQAnswered: "0",
      wQGotten: "0",
      wQMissed: "0",
      mQAnswered: "0",
      mQGotten: "0",
      mQMissed: "0",
      sTyped: "0",
      sWordsTyped: "",
      sGotten: "0",
      sMissed: "0",
      tPoints: "0",
      aggregate: "0",
      lastQuizIndex: "0"
    }
  }
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

  it('.encodeStudent(decodedStudent) should return encodedStudent', () => {
    expect(util.encodeStudent(decodedStudent).user_data.scores).to.be.eql(encodedStudent.user_data.scores);
    expect(util.encodeStudent(decodedStudent)).to.be.eql(encodedStudent);
  })

  it('.decodeStudent(encodedStudent) should return decodedStudent', () => {
    expect(util.decodeStudent(encodedStudent).user_data.scores).to.be.eql(decodedStudent.user_data.scores);
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

describe('util.getScores', () => {
  it('should return quizData.formatExpectation for quizData.responses', () => {
    expect(util.getScores(quizData.responses, quizData.questions)).to.be.eql(10);
  })
})