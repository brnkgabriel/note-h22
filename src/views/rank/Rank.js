
import beforeRouteEnter from '../../util/beforeRouteEnter'
export default {
  computed: {
    users: function () {
      return this.$store.state.users;
    }
  },
  beforeRouteEnter: beforeRouteEnter
};