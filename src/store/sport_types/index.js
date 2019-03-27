import Vue from 'vue'
import firebase from '../../firebase'
Vue.use(firebase)

export default {
  namespaced: true,
  state:{
    sports:{},
  },

  getters:{
    get(state){
      return state.sports;
    }
  },

  mutations:{
    set(state, payload){
      state.sports = payload;
    }
  },

  actions:{
    set(context){
      firebase.database().ref('tables/sports/items').on('value', function(snapshot){
          context.commit('set', snapshot.val());
      })
    }
  }
}
//getter
//return this.$store.getters['other/getOthers'];
//action
//this.$store.dispatch('other/setOthersFromFirebaseToStore', val)
