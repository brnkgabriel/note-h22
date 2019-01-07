// comment when testing
import { bus } from './main'
import mapData from './map-data';
import store from './store/store'; 
// comment when using
// var mapData = require('./map-data')

var all = {
  utilities: {
    today: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    },
    quizTypes: mapData.quizTypes,
    bibleTimeline: mapData.bibleTimeline,
    initialQuizState: function (materialId) {
      return {
        materialId: materialId,
        index: 0,
        timestamp: +new Date,
        response: []
      }
    },
    findMaterial: function (score, materials) {
      return materials.find(material => {
        return material.uid.toLowerCase() === score.materialId.toLowerCase()
      });
    },
    getQuestionPts: function (score, material) {
      var total = 0;
      score.response.forEach(resp => {
        var questionIdx = parseInt(resp.split('|')[0]);
        var optionIdx = parseInt(resp.split('|')[1]);
        var pts = material.questions[questionIdx].options[optionIdx].pts
        total += parseInt(pts);
      })
      return total;
    },
    totalPts: function (scores, materials) {
      var agg = 0;
      scores.forEach(score => {
        var material = all.utilities.findMaterial(score, materials)
        agg += all.utilities.getQuestionPts(score, material)
      })
      return agg;
    },
    age: function (bdString, today) {
      var birthday = all.utilities.birthday(bdString);
      return all.utilities.compareDates(today, birthday);
    },
    birthday: function (bdString) {
      var delimeter = (bdString.indexOf('/') !== -1) ? '/' : '-';
      var bdayArray = bdString.split(delimeter);
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
    compareDates: function (today, bday) {
      if (today.month < bday.month ||
        (
          today.month == bday.month &&
          today.day < bday.day
        )) { return (today.year - bday.year) - 1; }
      return today.year - bday.year;
    },
    aggregate: function (scores, materials, bdString) {
      var totalPts = all.utilities.totalPts(scores, materials);
      var age = all.utilities.age(bdString, all.utilities.today);
      return parseFloat((totalPts / age).toFixed(3))
    },
    getIdx: function (term, collection, key) {
      return collection.findIndex(item => item[key] === term[key])
    },
    boundaries: function (
      page, numPages, recordsPerPage, collection
    ) {
      var start, end;
      if (page === numPages) {
        start = (page - 1) * recordsPerPage;
        end = collection.length - 1;
      } else {
        end = (page * recordsPerPage) - 1;
        start = end - recordsPerPage + 1;
      }
      return { start, end }
    },
    numPages: function (collection, recordsPerPage) {
      return Math.ceil(collection.length / recordsPerPage);
    },
    changePage: function (collection, page, rPerPage) {
      var numPages = all.utilities.numPages(collection, rPerPage);
      return collection.slice(
        all.utilities
        .boundaries(page, numPages, rPerPage, collection).start,
        all.utilities
        .boundaries(page, numPages, rPerPage, collection).end
      )
    }, 
    gotoPage: function (page, cPage, rPerPage, collection) {
      var numPages = all.utilities.numPages(collection, rPerPage);
      if (page) { page === 'prev' ? cPage-- : cPage++ }
      if (cPage < 1) { cPage = numPages; }
      else if (cPage > numPages) { cPage = 1; } 

      return {
        timeline: all.utilities.changePage(collection, cPage, rPerPage),
        cPage: cPage
      }
    },
    localStorage: function () {
      var dbuser = JSON.parse(localStorage.getItem('user'))
      var dbMaterials = JSON.parse(localStorage.getItem('materials'))
      return { user: dbuser, materials: dbMaterials }
    },
    studAndMat: function () {
      this.user = all.utilities.localStorage().user; 
      this.materials = all.utilities.localStorage().materials;
    },
    toggleModal: function (el, loadedMaterial) {
      if (el.classList.contains('is-visible')) 
      { loadedMaterial = null; }
      el.classList.toggle('is-visible')
    },
    search: function (toFind, collection, keys) {
      var idx = function (toFind, from) {
        return from.toLowerCase().indexOf(toFind.toLowerCase())
      }
      return collection.filter(item => {
        var condition = false; 
        for (var j = 0; j < keys.length; j++) {
          var key = keys[j].split('-')[0], type = keys[j].split('-')[1];
          if (type === 'array') {
            idx(toFind, item[key].join(',')) !== -1 ? condition = true : ''
          } else {
            idx(toFind, item[key]) !== -1 ? condition = true : ''
          }
        }
        return condition;
      })
    },
    fetchMaterials: function () { 
      var CheckMaterials = function () {
        if (store.state.materials) {
          bus.$emit('incomingMaterials');
          clearInterval(delayTillArrival)
        }
      }
      var delayTillArrival = setInterval(CheckMaterials, 10);
    },
  },
  login: {

  },
  signup: {

  },
  profile: {

  },
  quiz: {
    processresponse: function (
      nextQue, optIdx, state, mat, user
    ) {
      var queIdx = all.utilities
      .getIdx(nextQue, mat.questions, 'uid'); 
      state.response.push(queIdx + '|' + optIdx); 
      state.materialId = mat.uid;
      state['index'] = state['index'] + 1;
      state['timestamp'] = +new Date;
      user.state = state;
      
      var scoIdx = all.utilities
      .getIdx(state, user.scores, 'materialId');
      if (scoIdx === -1) { user.scores.push(state) }
      else { user.scores[scoIdx] = state }
    }
  },
  materials: {

  },
  rank: {

  }
}

// comment when testing
export default all;

// comment when using
// module.exports = all;