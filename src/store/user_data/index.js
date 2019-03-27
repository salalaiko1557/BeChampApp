import Vue from 'vue'
import firebase from '../../firebase'
Vue.use(firebase)

export default {
  namespaced: true,
  state:{
    user:{},
  },

  getters:{
    get(state){
      return state.user;
    }
  },

  mutations:{
    set(state, payload){
      state.user = payload;
    }
  },

  actions:{
    set(context, id){
      firebase.database().ref('tables/users/items')
          .orderByChild("uid")
          .equalTo(id)
          .on('value', function(snapshot){
            context.commit('set', snapshot.val());
          });

    },
    create(context, name){
      //console.log('THIS');
      let user_name = name ? name : '';
      let user_email = firebase.auth().currentUser.email;
      let user_uid = firebase.auth().currentUser.uid;
      let user_db_id = firebase.database().ref('tables/users').child('items').push().key;
      firebase.database().ref('/tables/users/items/' + user_db_id).set({
        birthday: "Дата рождения",
        city: "Город",
        country: "Страна",
        email: user_email,
        favorites: '',
        gender: "Пол",
        name: user_name,
        photo: 'default',
        sport: "Вид спорта",
        tall: "Рост",
        telephone: '',
        uid : user_uid,
        weight: "Вес"
      }, function(error){
        if (error){
          console.log(error.message)
        }else{
          console.log('ALL RIGHT')
        }
      });
    }
  }
}
//getter
//return this.$store.getters['other/getOthers'];
//action
//this.$store.dispatch('other/setOthersFromFirebaseToStore', val)
