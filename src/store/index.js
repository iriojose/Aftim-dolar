import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasas:{}
	},
	mutations: {
		SET_TASAS(state,val){
			state.tasas = val;
		},
	},
	actions: {
		setTasas({commit},val){
			commit('SET_TASAS',val);
		},
	},
});
