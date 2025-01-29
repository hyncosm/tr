import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import moment from "moment";
import VueI18n from 'vue-i18n';
import i18n from './plugins/i18n';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import _, { result } from "lodash";
import "./assets/css/style.css";


import Icn from "./components/Icn.vue";
import EmptyState from "./components/emptyState.vue";
import PopUp from "./components/PopUp.vue";
import loadingSpinner from './components/loadingSpinner.vue';
import SwitchCheck from "./components/SwitchCheck.vue";

Vue.component("Icn", Icn);
Vue.component("SwitchCheck", SwitchCheck);
Vue.component("EmptyState", EmptyState);
Vue.component("loadingSpinner", loadingSpinner);
Vue.component("PopUp", PopUp);


Vue.use(VueToast);
Vue.use(DatePicker);
Vue.use(VueI18n);

Vue.config.productionTip = false
import axios from "./plugins/axios.js";
import './assets/tailwind.css'
Vue.prototype.$http = axios;

Vue.filter("date", function (date, format = "YYYY-MM-DD H:mm") {
  return date ? moment(date).format(format) : "__";
});

Vue.filter("commandStatus", function (text) {
  if (text == "PENDING") return "En cours";
  if (text == "CONFIRMED") return "Confirmée";
  if (text == "SHIPPED") return "Expédié";
  if (text == "CANCELED") return "Annuler";
  else return text;
});

Vue.filter("category", function (text) {
  if (text == "Cosmetics") return "Cosmétique";
  if (text == "Jewelry") return "Bijouterie";
  if (text == "Clothing") return "Couture";
  else return text;
});

Vue.filter("gender", function (text) {
  if (text == "male") return "Homme";
  if (text == "female") return "Femme";
  else return text;
});

Object.defineProperty(Vue.prototype, "$_", { value: _ });
Object.defineProperty(Vue.prototype, "$moment", { value: moment });


async function init() {
  store.dispatch('setSiteLanguage', localStorage.getItem('language'));
  let baseURL =  location.hostname.includes('local') ? "http://localhost:3330/api" : "https://cosmhync-1.onrender.com/api";

  try {
    if (localStorage.getItem('x-auth-token')) {
      const resp = await axios.get(`${baseURL}/user/` + localStorage.getItem('uid'));
      if (resp.data) {
        switch (resp.data.role) {
          case "ADMIN":
            if (resp.data.role == "admin" && !window.location.pathname.startsWith("/admin"))
              window.open("/admin/dashboard", "_self");
            break;
          case "CLIENT":
            if (!window.location.pathname.startsWith("/"))
              window.open("/", "_self");
            break;
          default:
            break;
        }
        store.commit('setUser', resp.data);
      }
    }
  } catch (error) { console.log(error, '-----> Error init /api/users/me <-----'); }
  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}
init()
// new Vue({
//   router,
//   store,
//   render: h => h(App),
// }).$mount('#app')