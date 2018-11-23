
import { bus } from '../../main'
import firebase from 'firebase/app';
import 'firebase/auth';

var methods = {
  signup: function (evt) {
    evt.preventDefault();
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password)
    .then(credential => { 
      var dbStudent = {
        'email': this.email,
        'first_name': this.firstName,
        'last_name': this.lastName,
        'roles_permissions': {
          'roles': 'user'
        },
        'uid': credential.user.uid,
        'user_data': {}
      }
      this.$store.dispatch('addStudent', dbStudent);
      this.delayToCompleteProcessing = setInterval(this.checkStudent, 10);
    }).catch(err => console.log(err));
  },
  checkStudent: function () {
    if (this.$store.state.student) {
      bus.$emit('isLoggedIn', true);
      this.$router.push("/profile");
      clearInterval(this.delayToCompleteProcessing);
    }
  }
}

export default methods;