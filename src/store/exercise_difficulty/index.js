import Vue from 'vue'
import firebase from '../../firebase'
Vue.use(firebase)

export default {
  namespaced: true,
  state:{
    exercise_difficulty: {},
  },

  getters:{
    get(state){
      return state.exercise_difficulty;
    },
  },

  mutations:{
    set(state, payload){
      state.exercise_difficulty = payload;
    }
  },

  actions:{
    set(context){
      firebase.database().ref('tables/exercise_difficulty/items').on('value', function(snapshot){
        context.commit('set', snapshot.val());
      })
    },
  }
}
//getter
//return this.$store.getters['other/getOthers'];
//action
//this.$store.dispatch('other/setOthersFromFirebaseToStore', val)
