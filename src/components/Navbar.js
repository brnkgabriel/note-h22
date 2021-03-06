import firebase from "firebase/app";
import "firebase/auth";
import { bus } from "../main";
// import NavMenu from '../nav-menu'

export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      user: null
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.isLoggedIn = !!localStorage.getItem("user");
    bus.$on("isLoggedIn", user => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  },
  // mounted() {
  //   new NavMenu();
  // },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("removeUser");
          this.isLoggedIn = false;
          this.$router.push("/login");
        });
    }
  }
};