import { bus } from './main'
import store from './store/store'; 
// import process from './process-scores'
import birthdate from './birthdate'
// Comment the above when you want to run test
// var process = require('./process-scores');
// var birthdate = require('./birthdate');
var mapData = require('./map-data');
var all = require('./all')

var util = {
  initialQuizState: function (materialId) {
    return all.utilities.initialQuizState(materialId)
  },
  boundaries: function (page, numPages, recordsPerPage) {
    var start, end;
    if (page === numPages) {
      start = (page - 1) * recordsPerPage;
      end = util.bibleTimeline.length - 1;
    } else {
      end = (page * recordsPerPage) - 1;
      start = end - recordsPerPage + 1;
    }
    return { start, end }
  },
  search: function (toFind, collection, keys) { 
    return collection.filter(item => {
      var condition = false; 
      for (var j = 0; j < keys.length; j++) {
        var keyStr = keys[j].split('-')[0];
        var keyType = keys[j].split('-')[1];
        if (keyType === 'array') {
          if (item[keyStr].join(',').toLowerCase().indexOf(toFind.toLowerCase()) !== -1) {
            condition = true;
          }
        } else {
          if (item[keyStr].toLowerCase().indexOf(toFind.toLowerCase()) !== -1) {
            condition = true;
          }
        }
      }
      return condition;
    })
  },
  searched: function (search, collection, []) {
    return collection.filter(time => {
      var condition = false;
      if (
        time.date.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        time.events.join(', ').toLowerCase().indexOf(search.toLowerCase()) !== -1
      ) { condition = true; }
      return condition
    })
  },
  getQuestions: function (nextQuiz, materials) {
    var keys = Object.keys(nextQuiz), questions = [];
    keys.forEach(key => {
      var material = materials.find(mat => mat.uid === nextQuiz[key].materialId)
      questions.push({
        id: nextQuiz[key].materialId, type: key,
        questions: material.questions,
      })
    })
    return questions;
  },
  // getQuizData: function (user_data) {
  //   return {
  //     nextQuiz: user_data.nextQuiz,
  //     state: user_data.state,
  //     scores: user_data.scores
  //   }
  // },
  /**
   * picks the first quiz (index = 0) out of the untaken quiz set
   */
  getQuizID: function (scores, materials) {
    var decodedScores = util.decodeScores(scores, materials), quizzesTaken = [];
    var quiz = {}, untakenType = [];
    decodedScores.forEach(score => {
      Object.keys(score).forEach(key => { 
        if (score[key].id) { quizzesTaken.push(score[key].id); }
      })
    });
    var untakenQuizzes = materials
    .filter(material => !quizzesTaken.includes(material.uid));

    util.quizTypes.forEach(type => {
      untakenType = untakenQuizzes.filter(material => material.type === type)
      quiz[type] = { quizType: type, materialId: untakenType[0].uid }
    })
    return quiz;
  },
  getAggregate: function (scores) {
    var aggregate = 0;
    scores.forEach(score => {
      var material = util.findMaterial(score.materialId)
      score.response.forEach(resp => {
        var questionID = parseInt(resp.split('|')[0]);
        var optionID = parseInt(resp.split('|')[1]);
        var question = material.questions[questionID];
        var selectedOption = question.options[optionID]; 
        aggregate += parseInt(selectedOption.pts) 
      });
    });
    return aggregate;
  },
  findMaterial: function (uid) {
    return util.localStorage().materials.find(material => {
      return uid === material.uid
    })
  },
  // getScores: function (responses, questions) {
  //   return process.getScores(responses, questions)
  // },
  // obtainScore: function (foundQuestion, userAnswer) {
  //   return process.obtainScore(foundQuestion, userAnswer)
  // },
  fetchMaterials: function () { 
    var CheckMaterials = function () {
      if (store.state.materials) {
        bus.$emit('incomingMaterials');
        clearInterval(delayTillArrival)
      }
    }
    var delayTillArrival = setInterval(CheckMaterials, 10);
  },
  getAge: function (birthday, today) {
    return birthdate.getAge(birthday, today)
  },
  compareAndReturnRightAge: function (today, bday) {
    return birthdate.compareAndReturnRightAge(today, bday);
  },
  getBirthdayObject: function (birthday) {
    return birthdate.getBirthdayObject(birthday);
  },
  // decodeScore: function (codedScore, materials) {
  //   return process.decodeScore(codedScore, materials);
  // },
  // encodeScore: function (decodedScores) {
  //   return process.encodeScore(decodedScores)
  // },
  // decodeScores: function (scores, materials){
  //   return process.decodeScores(scores, materials)
  // },
  // encodeScores: function (scores) {
  //   return process.encodeScores(scores)
  // },
  localStorage: function () { 
    var dbuser = JSON.parse(localStorage.getItem('user'))
    var dbMaterials = JSON.parse(localStorage.getItem('materials'))
    // var decodeduser = util.decodeuserData(dbuser, dbMaterials);
    return { user: dbuser, materials: dbMaterials }
  },
  // decodeuserData: function (dbuser, materials) {
  //   var user = dbuser;
  //   var userData = util.getQuizData(user.user_data);
  //   var state = util.decodeScore(userData.state, materials);
  //   var scores = util.decodeScores(userData.scores, materials);
  //   user.user_data.scores = scores
  //   user.user_data.state = state
  //   return user;
  // },
  today: {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  },
  quizTypes: mapData.quizTypes,
  preachers: mapData.preachers,
  messages: mapData.messages,
  bibleTimeline: mapData.bibleTimeline
}
// uncomment below when you want to test
// and comment when you want to use
// module.exports = util;

// comment below when you want to test
// and uncomment when you want to use
export default util;