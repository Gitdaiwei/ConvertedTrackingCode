/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/shopcart/index';
import moduling from '../components/header';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: () => ({
    uii: '',
    fenter: true,
    paymentBounced: false,
    withFacebook: { reveal: false, popUp: false },
  }),
  modules: {
    cart,
    moduling,
  },
  mutations: {
    set(state, val) {
      state.uii = val;
    },
    amend(state, val) {
      state.fenter = val
    },
    rcondition(state, val) {
      state.withFacebook.reveal = val
    },
    pcondition(state, val) {
      state.withFacebook.popUp = val
    },
    opaymentBounced(state, val) {
      state.paymentBounced = val
    },
  },
  // strict: process.env.NODE_ENV !== 'production',
});

export default store;
