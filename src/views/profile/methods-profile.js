import util from "../../util";
var methods = {
  updateuser: function(evt) {
    evt.preventDefault();
    this.$store.dispatch("updateUser", util.encodeuser(this.user));
  }
}

export default methods