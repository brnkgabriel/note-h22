import { bus } from './main'
import store from './store/store'; 
// Comment the above when you want to run test
var mapData = require('./map-data');

var util = {
  questionTypes: mapData.questionTypes,
  fetchQuestions: function () {
    var CheckQuestions = function () {
      if (store.state.questions) {
        bus.$emit('incomingQuestions', JSON.parse(localStorage.getItem('questions')));
        clearInterval(delayTillArrival);
      }
    }
    var delayTillArrival = setInterval(CheckQuestions, 10);
  },
  getAge: function (birthday, today) {
    var bday = util.getBirthdayObject(birthday);
    return util.compareAndReturnRightAge(today, bday);
  },
  compareAndReturnRightAge: function (today, bday) {
    if (today.month < bday.month ||
      (
        today.month == bday.month &&
        today.day < bday.day
      )) { return (today.year - bday.year) - 1; }
    return today.year - bday.year;
  },
  getBirthdayObject: function (birthday) {
    var delimeter = (birthday.indexOf('/') !== -1) ? '/' : '-';
    var bdayArray = birthday.split(delimeter);
    if (delimeter === '-') {
      return {
        day: parseInt(bdayArray[2]),
        month: parseInt(bdayArray[1]),
        year: parseInt(bdayArray[0])
      }
    }
    return {
      day: parseInt(bdayArray[1]),
      month: parseInt(bdayArray[0]),
      year: parseInt(bdayArray[2])
    }
  },
  decodeScores: function (codedScores) {
    var codedArray = codedScores.split('|');
    var extractedMsg = util.messages[parseInt(codedArray[1])]
    return {
      date: codedArray[0],
      message: extractedMsg.split('|')[0],
      preacher: util.preachers[parseInt(codedArray[2])],
      score: codedArray[3],
      age: codedArray[4],
      aggregate: codedArray[5]
    }
  },
  codeScores: function (decodedScores) {
    var messageIndex = util.messages
      .findIndex(message => decodedScores.message.toLowerCase() === message.split('|')[0].toLowerCase());
    var preacherIndex = util.preachers
      .findIndex(preacher => decodedScores.preacher.toLowerCase() === preacher.toLowerCase());
    var encodedScores = decodedScores.date + '|'
      + messageIndex + '|'
      + preacherIndex + '|'
      + decodedScores.score + '|'
      + decodedScores.age + '|'
      + decodedScores.aggregate;
    return encodedScores
  },
  decodeStudent: function (student) {
    var decodedStudent = student;
    var scores = [], decodedScores = [];
    scores = decodedStudent.user_data.scores.split("*");
    scores.forEach(score => decodedScores.push(util.decodeScores(score)));
    decodedStudent.user_data.scores = decodedScores;
    return decodedStudent;
  },
  encodeStudent: function (student) {
    var encodedStudent = student;
    var scores = [], codedScores = [], encodedScores = '';
    scores = encodedStudent.user_data.scores;
    scores.forEach(score => {
      codedScores.push(util.codeScores(score));
    })
    encodedScores = codedScores.join('*')
    return {
      email: encodedStudent.email,
      first_name: encodedStudent.first_name,
      last_name: encodedStudent.last_name,
      roles_permissions: {
        roles: encodedStudent.roles_permissions.roles
      },
      uid: encodedStudent.uid,
      user_data: {
        birthday: encodedStudent.user_data.birthday,
        scores: encodedScores,
        quiz_status: student.user_data.quiz_status
      },
    }
  },
  today: {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  },
  preachers: mapData.preachers,
  messages: mapData.messages
}
// uncomment below when you want to test
// and comment when you want to use
// module.exports = util;

// comment below when you want to test
// and uncomment when you want to use
export default util;