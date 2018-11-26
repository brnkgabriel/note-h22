
import { bus } from '../../main'
import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../util';

var methods = {
  signup: function (evt) {
    evt.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(credential => {
      var todayFormatted = util.today.year + '-' + util.today.month + '-' + util.today.day;
      var dateAndMessage = todayFormatted + '|'+ (util.messages.length - 1);
      var initialScore = dateAndMessage + '|3|0|' + util.getAge(this.birthday, util.today) + '|0'; 
      var dbStudent = {
        'email': this.email,
        'first_name': this.firstName,
        'last_name': this.lastName,
        'roles_permissions': {
          'roles': 'student'
        },
        'uid': credential.user.uid,
        'user_data': {
          'birthday': this.birthday,
          'scores': initialScore,
          'completedIndex': 0
        }
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