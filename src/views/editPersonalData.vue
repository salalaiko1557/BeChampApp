<template>
  <div>
    <header class="single__page-title">
      <v-icon flat icon color="red" class="prev-page" @click="goPrev()" size="30px">keyboard_arrow_left</v-icon>
      <span>ДАННЫЕ</span>
    </header>
    <section class="user-data__wr">
      <div v-if="user" class="avatar__wr">
        <img v-if="user.photo !== 'default' " :src="user.photo" alt="avatar">
        <img v-if="user.photo === 'default' " src="https://picsum.photos/94/94?random" alt="avatar">
      </div>
    </section>
  </div>
</template>

<script>
import CustomMenu from '../components/Menu.vue'
import firebase from '../firebase'

export default {
  components: {
    CustomMenu
  },
  data(){
    return{
      user: {},
    }
  },
  created(){
    let user = firebase.auth().currentUser;
    this.$store.dispatch('ModuleUserData/set', user.uid);
    this.getUserData();
  },
  methods: {
    getUserData(){
      let userdata = Object.values(this.$store.getters['ModuleUserData/get']);
      this.user = userdata[0];
    },
  },

}
</script>
<style scoped>
.single__page-title{
  color: black;
  font-weight: 900;
  min-height: 42px;
  display: flex;
  justify-content: center;
  align-items: center
}
.prev-page{
  position: absolute;
  left: 5px;
}
.user-data__wr{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/profile_bg%402x.png?alt=media&token=aa363d1f-97d0-41bc-a6a7-81df7d5488ba");
  background-color: rgba(0, 0, 0, .7);
  background-size: 100% 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.avatar__wr{
  margin-bottom: 20px;
}
</style>
