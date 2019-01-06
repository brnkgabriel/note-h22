import { bus } from '../../main'
import firebase from "firebase/app";
import "firebase/auth";

var methods = {
  login: function(evt) {
    evt.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(credential => {
      this.$store.dispatch("getUser", { uid: credential.user.uid });
      this.delayToCompleteProcessing = setInterval(this.checkuser, 10);
    }).catch(err => console.log(err));
  },
  checkuser: function() {
    if (this.$store.state.user) {
      bus.$emit('isLoggedIn', this.$store.state.user);
      this.$router.push("/profile");
      clearInterval(this.delayToCompleteProcessing);
    }
  }
}

export default methods