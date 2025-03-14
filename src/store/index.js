// src/store/index.js
import { createStore } from "vuex";
import { fetchMeowFact } from "@/api/apiService";

export default createStore({
  state: {
    catFact: "Click the button to get a cat fact!",
  },
  mutations: {
    setCatFact(state, fact) {
      state.catFact = fact;
    },
  },
  actions: {
    async loadCatFact({ commit }) {
      const fact = await fetchMeowFact();
      commit("setCatFact", fact);
    },
  },
});
