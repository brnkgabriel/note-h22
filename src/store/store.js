import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/firebase-init'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { bus } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    materials: null,
    user: null
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },
    setMaterials(state, payload) {
      localStorage.setItem('materials', JSON.stringify(payload));
      bus.$emit('incomingMaterials');
      state.materials = payload;
    },
    setUser(state, payload) {
      localStorage.setItem('user', JSON.stringify(payload));
      state.user = payload;
    },
    removeUser(state) {
      localStorage.removeItem('user');
      state.user = null;
    }
  },
  actions: {
    getUsers(context) {
      db.collection('users')
        .onSnapshot(snapshot => {
          var dbusers = [];
          snapshot.forEach(doc => {
            const user = {
              'email': doc.data().email,
              'first_name': doc.data().first_name,
              'last_name': doc.data().last_name,
              'roles_permissions': doc.data().roles_permissions,
              'uid': doc.data().uid,
              'birthday': doc.data().birthday,
              'scores': doc.data().scores,
              'state': doc.data().state
            }
            dbusers.push(user);
          })
          context.commit('setUsers', dbusers);
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
              'time': doc.data().time,
              'title': doc.data().title,
              'event': doc.data().event,
              'type': doc.data().type,
              'thumbnail': doc.data().thumbnail,
              'uid': doc.data().uid
            }
            dbMaterials.push(material)
          })

          context.commit('setMaterials', dbMaterials);
        })
    },
    getUser(context, payload) {
      db.collection('users')
        .where('uid', '==', payload.uid)
        .onSnapshot(snapshot => {
          var dbuser = {};
          snapshot.forEach(doc => {
            dbuser = {
              'email': doc.data().email,
              'first_name': doc.data().first_name,
              'last_name': doc.data().last_name,
              'roles_permissions': doc.data().roles_permissions,
              'uid': doc.data().uid,
              'birthday': doc.data().birthday,
              'scores': doc.data().scores,
              'state': doc.data().state
            }
          })
          context.commit('setUser', dbuser);
        })
    },
    addUser(context, payload) {
      db.collection("users")
        .doc(payload.uid).set(payload).then(function () {
          console.log("Document successfully written!");
          context.commit('setUser', payload);
        });
    },
    updateUser(context, payload) {
      db.collection("users")
        .doc(payload.uid).update(payload)
        .then(() => console.log('document successfully updated'))
        .catch(err => console.log(err));
      context.commit('setUser', payload);
    },
    deleteMaterials(context, payload) {
      localStorage.setItem('materials', JSON.stringify(payload))
      var batch = db.batch();
      for (var i = 0; i < payload.length; i++) {
        var ref = db.collection("materials").doc(payload[i]);
        batch.delete(ref);
        console.log(payload[i]);
      }
      batch.commit().then(function () {
        console.log('deleted')
      })
    },
    saveMaterials(context, payload) {
      localStorage.setItem('materials', JSON.stringify(payload))
      var batch = db.batch();
      for (var i = 0; i < payload.length; i++) {
        var ref = db.collection("materials").doc(payload[i].uid);
        batch.set(ref, payload[i]);
        console.log(payload[i]);
      }
      batch.commit().then(function () {
        console.log('committed')
      })
    },
    saveMaterial(context, payload) {
      db.collection('materials')
        .doc(payload.uid).update(payload).then(function () {
          console.log(payload.title, 'successfully updated')
        })
    },
    uploadThumbnail(context, payload) {
      firebase.storage().ref('thumbnails/' + payload.name).put(payload)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL => bus.$emit('thumbnail', downloadURL))
    },
    addMaterial(context, payload) {
      db.collection("materials")
        .doc(payload.uid).set(payload).then(function () {
          console.log(payload.title, 'successfully written!')
        })
    },
  }
})
