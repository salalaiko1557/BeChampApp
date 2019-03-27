import Vue from 'vue'
import firebase from '../../firebase'
Vue.use(firebase)

export default {
  namespaced: true,
  state:{
    exercise_type: {},
  },

  getters:{
    get(state){
      return state.exercise_type;
    },
  },

  mutations:{
    set(state, payload){
      state.exercise_type = payload;
    }
  },

  actions:{
    set(context){
      firebase.database().ref('tables/exercise_type/items').on('value', function(snapshot){
        context.commit('set', snapshot.val());
      })
    },
  }
}
//getter
//return this.$store.getters['other/getOthers'];
//action
//this.$store.dispatch('other/setOthersFromFirebaseToStore', val)
