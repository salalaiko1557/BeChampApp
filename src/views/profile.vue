<template>
<div>
  <div>
    <custom-menu :title="'ПРОФИЛЬ'"></custom-menu>
  </div>
  <div class="profile__wr">
    <div class="notify">
      <v-icon color="white" size="50" flat icon>notification_important</v-icon>
    </div>
    <section class="user-info">
      <div v-if="user" class="avatar__wr">
        <span class="level">2</span>
        <img v-if="user.photo !== 'default' " :src="user.photo" alt="avatar">
        <img v-if="user.photo === 'default' " src="https://picsum.photos/94/94?random" alt="avatar">
      </div>
      <v-container>
      <p class="text-center username" color="white" v-if="user">{{user.name}}</p>
      <span v-if="user">{{user.sport}}</span>
      <span>|</span>
      <span>20 лет</span>
      <div class="user-level">
        <v-progress-linear
          color="success"
          height="9"
          class="progress-bar"
          :value="progress"
        ></v-progress-linear>
        <span class="progress-value">{{progress}} %</span>
      </div>
      <div class="user-personal__wr">
        <div class="user-personal">
          <span>РОСТ: </span>
          <span v-if="user">{{user.tall}} см</span>
        </div>
        <div class="user-personal">
          <span>ВЕС: </span>
          <span v-if="user">{{user.weight}} кг</span>
        </div>
      </div>
      <section class="navs">
        <div class="navs-data">
          <v-list-tile
            v-for="item in navs"
            :key="item.title"
            class=""
          >
          <v-list-tile-action class="nav-icons">
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <router-link class="nav-item white--text" :to="item.route">
            {{ item.title }}
          </router-link>
          </v-list-tile>
        </div>
      </section>

      </v-container>
    </section>
  </div>

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
      progress: 66,
      navs: [
          { title: 'ДАННЫЕ', icon: 'format_align_left', route: 'editdata' },
          { title: 'ИЗБРАННОЕ', icon: 'favorite_border', route: 'favorites'},
          // { title: 'МОИ ТРЕНИРОВКИ', icon: 'home', route: 'my_trainnings' },
          // { title: 'ПАРТНЕРЫ', icon: 'home', route: 'partners' },
          // { title: 'ТАРИФЫ', icon: 'home', route: 'tarifs' },
          // { title: 'НАСТРОЙКИ', icon: 'home', route: 'settings' },
          // { title: 'О ПРИЛОЖЕНИИ', icon: 'home', route: 'about_app' },
          // { title: 'НАШИ ТРЕНЕРА', icon: 'home', route: 'tainning_teachs' },
          // { title: 'ОЦЕНИТЬ НАС', icon: 'home', route: 'rate_us' },
          // { title: 'ПОДЕЛИТЬСЯ', icon: 'home', route: 'share' },
        ]
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
.profile__wr{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/profile_bg%402x.png?alt=media&token=aa363d1f-97d0-41bc-a6a7-81df7d5488ba");
  background-color: rgba(0, 0, 0, .7);
  background-size: 100% 100%;
  height: 100vh;
}
.notify{
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 17px;
  padding-top: 20px;
}
.level{
  position: absolute;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/level%403x.png?alt=media&token=65493db5-d24c-4fd0-89a6-7bb80280671e");
  background-size: contain;
  width: 30px;
  height: 30px;
  padding-top: 6px;
  z-index: 1;
  right: 50%;
  left: 50%;
}
.avatar__wr{
  margin-bottom: 20px;
}
.username{
  font-size: 17px;
  width: 100%;
  margin-bottom: 10px;
}
.user-level{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 15px;
}
.progress-bar{
  width: 70%;
}
.progress-value{
  font-size: 16px;
}
.user-personal__wr{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 50px;
}
.navs{
  display: flex;
  justify-content: center;
  width: 100%;
}
.navs-data {
  width: min-content;
  width: fit-content;
  width: max-content;
}
.nav-buttons{
  display: flex;
  justify-content: center;
}
.nav-icons{
  min-width: 40px;
}
</style>

