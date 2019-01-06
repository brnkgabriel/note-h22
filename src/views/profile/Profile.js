
import beforeRouteEnter from '../../util/beforeRouteEnter'
import util from "../../util"
import methods from './methods-profile'
import { bus } from '../../main'
import all from '../../all'

export default {
  data() {
    return {
      user: {
        email: null,
        first_name: null,
        last_name: null,
        roles_permissions: null,
        uid: null,
        birthday: null,
        scores: [],
        state: {}
      },
    };
  },
  created() {
    all.utilities.studAndMat.call(this);
    util.fetchMaterials()
    bus.$on('incomingMaterials', () => all.utilities.studAndMat.bind(this))
  },
  computed: {
    users: function () {
      return this.$store.state.users;
    },
    totalPts: function () {
      return all.utilities.totalPts(this.user.scores, this.materials)
    },
    age: function () {
      return all.utilities.age(this.user.birthday, all.utilities.today)
    },
    totalAggregate: function () {
      return all.utilities.aggregate(
        this.user.scores, this.materials, this.user.birthday
      );
    }
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};