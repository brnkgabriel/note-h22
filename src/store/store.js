import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/firebase-init'
import 'firebase/auth';
import { bus } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    students: null,
    materials: null,
    questions: null,
    student: null
  },
  mutations: {
    setStudents(state, payload) {
      state.students = payload
    },
    setMaterials(state, payload) {
      localStorage.setItem('materials', JSON.stringify(payload));
      bus.$emit('incomingMaterials', payload);
      state.materials = payload;
    },
    setQuestions(state, payload) {
      localStorage.setItem('questions', JSON.stringify(payload));
      bus.$emit('incomingQuestions', payload);
      state.questions = payload;
    },
    setStudent(state, payload) {
      localStorage.setItem('student', JSON.stringify(payload));
      state.student = payload;
    },
    removeStudent(state) {
      localStorage.removeItem('student');
      state.student = null;
    }
  },
  actions: {
    getStudents(context) {
      db.collection('users')
        .onSnapshot(snapshot => {
          var dbStudents = [];
          snapshot.forEach(doc => {
            const student = {
              'email': doc.data().email,
              'first_name': doc.data().first_name,
              'last_name': doc.data().last_name,
              'roles_permissions': doc.data().roles_permissions,
              'uid': doc.data().uid,
              'user_data': doc.data().user_data
            }
            dbStudents.push(student);
          })
          context.commit('setStudents', dbStudents);
        })
    },
    getMaterials(context) {
      db.collection('materials')
      .onSnapshot(snapshot => {
        var dbMaterials = [];
        snapshot.forEach(doc => {
          const material = {
            'author': doc.data().author,
            'location': doc.data().location,
            'questions': doc.data().questions,
            'stage': doc.data().stage,
            'title': doc.data().title,
            'type': doc.data().type,
            'uid': doc.data().uid
          }
          dbMaterials.push(material)
        })

        context.commit('setMaterials', dbMaterials);
      })
    },
    getQuestions(context) {
      db.collection('questions')
        .onSnapshot(snapshot => {
          var dbQuestions = [];
          snapshot.forEach(doc => {
            const question = {
              'uid': doc.data().uid,
              'serial': doc.data().serial,
              'stage': doc.data().stage,
              'img': doc.data().img,
              'question': doc.data().question,
              'options': doc.data().options,
              'option': doc.data().option,
              'answer': doc.data().answer,
              'type': doc.data().type
            }
            dbQuestions.push(question);
          })
          context.commit('setQuestions', dbQuestions);
        })
    },
    getStudent(context, payload) {
      db.collection('users')
        .where('uid', '==', payload.uid)
        .onSnapshot(snapshot => {
          var dbStudent = {};
          snapshot.forEach(doc => {
            dbStudent = {
              'email': doc.data().email,
              'first_name': doc.data().first_name,
              'last_name': doc.data().last_name,
              'roles_permissions': doc.data().roles_permissions,
              'uid': doc.data().uid,
              'user_data': doc.data().user_data
            }
          })
          context.commit('setStudent', dbStudent);
        })
    },
    addStudent(context, payload) { 
      db.collection("users")
      .doc(payload.uid).set(payload).then(function () {
        console.log("Document successfully written!");
        context.commit('setStudent', payload);
      });
    },
    updateStudent(context, payload) {
      db.collection("users")
      .doc(payload.uid).update(payload)
      .then(() => console.log('document successfully updated'))
      .catch(err => console.log(err));
      context.commit('setStudent', payload);
    },
    saveMaterial(context, payload) {
      db.collection('materials')
      .doc(payload.uid).update(payload)
      .then(() => console.log('document successfully updated'))
      .catch(err => console.log(err));
    },
    addMaterial(context, payload) {
      db.collection("materials")
      .doc(payload.uid).set(payload).then(function () {
        console.log(payload.title, 'successfully written!')
      })
    },
    storeQuestions(context, payload) {
      localStorage.setItem('questions', JSON.stringify(payload))
      var batch = db.batch();
      for (var i = 0; i < payload.length; i++) {
        var ref = db.collection("questions").doc(payload[i].uid);
        batch.set(ref, payload[i]);
        console.log(payload[i]);
      }
      batch.commit().then(function () {
        console.log('committed')
      })
    }
  },
  getters: {
    getStudent(state) {
      return state.students;
    }
  }
})
