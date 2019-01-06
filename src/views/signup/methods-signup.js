
import { bus } from '../../main'
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../util';

var methods = {
  signup: function (evt) {
    evt.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(credential => {
      var today = util.today.year + '-' + util.today.month + '-' + util.today.day;
      var dbuser = {
        'email': this.email,
        'first_name': this.firstName,
        'last_name': this.lastName,
        'roles_permissions': {
          'roles': 'user'
        },
        'uid': credential.user.uid,
        'birthday': this.birthday,
        'scores': [], 
        'state': { 
          materialId: '',
          index: 0,
          response: []
        }
      }
      this.$store.dispatch('addUser', dbuser);
      this.delayToCompleteProcessing = setInterval(this.checkuser, 10);
    }).catch(err => console.log(err));
  },
  checkuser: function () {
    if (this.$store.state.user) {
      bus.$emit('isLoggedIn', this.$store.state.user);
      this.$router.push("/profile");
      clearInterval(this.delayToCompleteProcessing);
    }
  }
}

export default methods;