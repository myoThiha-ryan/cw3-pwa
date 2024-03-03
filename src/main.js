import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/style.css";
// Start Font-awesome

// import the font awesome core
import { library } from "@fortawesome/fontawesome-svg-core";

// import font awesome icon component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import specific icons
import {
  faShoppingCart,
  faTextHeight,
  faTrash,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

// import specific icons
import { faUniregistry } from "@fortawesome/free-brands-svg-icons";

// add icons to the library
library.add(faShoppingCart, faTextHeight, faUniregistry, faTrash, faSync);

// add font awesome icon component
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// End Font-awesome

new Vue({
  render: (h) => h(App),
}).$mount("#app");

import "bootstrap/dist/js/bootstrap.js";
