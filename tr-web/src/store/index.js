import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      letters: null
    },
    breadCrumbs: [],
    siteLanguage: 'fr',
    categories:[],
    brands:[],
    newProduct:null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions:{
    setProduct(context, payload) {
      context.commit("SET_NEW_PRODUCT", payload)
    },
    setCategories(context, payload) {
      context.commit("SET_CATEGORIES", payload)
    },
    setBrands(context, payload) {
      context.commit("SET_BRANDS", payload)
    },
    setBreadCrumb(context, payload) {
      context.commit("SET_BREAD_CRUMBS", payload)
    },
    setSiteLanguage(context, payload) {
      context.commit("SET_LANGUAGE", payload)
    },
  },
  mutations: {
    SET_NEW_PRODUCT(state, payload) {
      state.newProduct = payload
    },
    SET_BRANDS(state, payload) {
      state.brands = payload
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },
    SET_BREAD_CRUMBS(state, payload) {
      state.breadCrumbs = payload
    },
    SET_LANGUAGE(state, payload) {
      state.siteLanguage = payload
    },
    setUser(state, payload) {
      console.log('set user mutation', payload)
      state.user = payload;
      state.user.letters = payload?.name?.split(' ').map(word => word[0].toUpperCase()).join('');
    }
  }
})