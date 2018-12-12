import { bus } from './main'
import store from './store/store'; 
// Comment the above when you want to run test
var mapData = require('./map-data');

var util = {
  processQuizType: function (type, response) {
    var processedType = '|' + response[type]['id'];
    response[type]['missed'].forEach(item => {
      processedType += ';' + item;
    });
    processedType += ';' + response[type]['stopped'];
    return processedType;
  },
  getScores: function (responses, questions) {
    var scores = 0; 
    for (var i = 0; i < responses.length; i++) {
      var response = responses[i].split('|');
      var foundQuestion = questions
      .find(question => question.uid === response[0])

      if (foundQuestion) {
        scores += util.obtainScore(foundQuestion, response[1]); 
        break;
      }
    }
    return scores;
  },
  obtainScore: function (foundQuestion, studentAnswer) {
    var score = foundQuestion.options
    .find(option => option.key === studentAnswer);

    if (score !== undefined) { return parseInt(score.pts); }
    else { return 0; }
  },
  fetchMaterials: function () { 
    var CheckMaterials = function () {
      if (store.state.materials) {
        bus.$emit('incomingMaterials', JSON.parse(localStorage.getItem('materials')));
        clearInterval(delayTillArrival)
      }
    }
    var delayTillArrival = setInterval(CheckMaterials, 10);
  },
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
  expandResponse: function (response, materials) {
    var splittedResponse = response.split('|');
    var dateAndQuizNo = splittedResponse[0].split('@');
    var quizzes = splittedResponse
    .filter(response => response !== splittedResponse[0]);
    var expandedResponse = {
      date: dateAndQuizNo[0],
      quizNo: dateAndQuizNo[1]
    }
    util.addQuizzes(quizzes, expandedResponse, materials);
    return expandedResponse
  },
  addQuizzes: function (quizzes, expandedResponse, materials) {
    for (var i = 0; i < quizzes.length; i++) {
      var splitted = quizzes[i].split(';');
      var id = splitted[0];
      var stopped = splitted[splitted.length - 1];
      var missed = [];
      for (var j = 1; j < splitted.length-1; j++) {
        missed.push(splitted[j]);
      }
      // made use of destructuring below
      expandedResponse[util.getType(id, materials)] = {
        id, stopped, missed
      }
    }
  },
  getType: function (id, materials) {
    var foundMaterial = materials.find(mat => mat.uid === id);
    return foundMaterial.type;
  },
  compressResponse: function (response) {
    var compressedResponse = response['date'] + '@' + response['quizNo'];
    util.quizTypes.forEach(type => {
      if (response[type]) {
        compressedResponse += util.processQuizType(type, response);
      }
    })
    return compressedResponse;
  },
  decodeScore: function (codedScore, materials) {
    return util.expandResponse(codedScore, materials);
  },
  encodeScore: function (decodedScore) {
    return util.compressResponse(decodedScore);
  },
  decodeScores: function (scores, materials) {
    var encodedScores = scores.split('*'), decodedScores = []
    for (var i = 0; i < encodedScores.length; i++) {
      decodedScores.push(util.decodeScore(encodedScores[i], materials))
    }
    return decodedScores;
  },
  decodeScoreAndScores: function (dbStudent, materials) {
    var student = dbStudent;
    student.user_data.scores = util.decodeScores(student.user_data.scores, materials)
    student.user_data.quiz_status = util.decodeScore(student.user_data.quiz_status, materials)
    return student;
  },
  encodeScores: function (scores) {
    var encodedScores = [];
    for (var i = 0; i < scores.length; i++) {
      encodedScores.push(util.encodeScore(scores[i]))
    }
    return encodedScores.join('*')
  },
  today: {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  },
  quizTypes: mapData.quizTypes,
  preachers: mapData.preachers,
  messages: mapData.messages
}
// uncomment below when you want to test
// and comment when you want to use
// module.exports = util;

// comment below when you want to test
// and uncomment when you want to use
export default util;