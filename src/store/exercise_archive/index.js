import Vue from 'vue'
import firebase from '../../firebase'
Vue.use(firebase)

export default {
  namespaced: true,
  state:{
    exercises_archive: {},
  },

  getters:{
    get(state){
      return state.exercises_archive;
    },
  },

  mutations:{
    set(state, payload){
      state.exercises_archive = payload;
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
        context.commit('set', []);
      })
    },
    setByParams(context, args){
      let sport_type;
      let exercise_type;
      let exercise_difficulty;
      let items_arr = [];
      args.forEach(function(element, index, array) {
        if(index === 0){
          sport_type = element;
        };
        if(index === 1){
          exercise_type = element;
        };
        if(index === 2){
          exercise_difficulty = element;
        }
      });
        firebase.database().ref('tables/exercise/items')
          .orderByChild("sports_name")
          .equalTo(sport_type)
          .on('value', function(snapshot){
          snapshot.forEach(function(childSnapshot) {
            if(childSnapshot.val().difficulty_name === exercise_difficulty
               && childSnapshot.val().type_name === exercise_type
            ){
              items_arr.push(childSnapshot.val())
            }
          });
        });
        context.commit('set', items_arr);
    }
  }
}
//getter
//return this.$store.getters['other/getOthers'];
//action
//this.$store.dispatch('other/setOthersFromFirebaseToStore', val)
