import Vue from 'vue'
import firebase from '../../firebase'
Vue.use(firebase)

export default {
  namespaced: true,
  state:{
    exercise_single: {},
  },

  getters:{
    get(state){
      return state.exercise_single;
    },
  },

  mutations:{
    set(state, payload){
      state.exercise_single = payload;
    }
  },

  actions:{
    set(context){
      firebase.database().ref('tables/exercise/items').on('value', function(snapshot){
        context.commit('set', snapshot.val());
      })
    },
    clear(context){
      firebase.database().ref('tables/exercise/items').on('value', function(snapshot){
        context.commit('set', {});
      })
    },
    setBySlug(context, slug){
        firebase.database().ref('tables/exercise/items')
          .orderByChild("slug")
          .equalTo(slug)
          .once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot) {
            context.commit('set', childSnapshot.val());
          });
        });

    }
  }
}
//getter
//return this.$store.getters['other/getOthers'];
//action
//this.$store.dispatch('other/setOthersFromFirebaseToStore', val)
