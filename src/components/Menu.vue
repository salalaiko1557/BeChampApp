<template>
  <v-layout>
    <v-btn
      flat
      icon
      color="red"
      dark
      @click.stop="drawer = !drawer"
    >
      <v-icon>dehaze</v-icon>
    </v-btn>
    <span class="page-title">
      {{title}}
    </span>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      dark
      class="main-menu__wr"
    >
      <div class="menu-items__wr">
        <v-icon @click="drawer = !drawer" color="red" size="30" flat icon class="close-menu-btn">reply</v-icon>
        <v-text-field
          prepend-inner-icon="search"
          solo
          clearable
          placeholder="ПОИСК"
        ></v-text-field>
        <p class="text-center" v-if="getUserData">{{getUserData.name}}</p>
        <span class="text-center sport-type" v-if="getUserData">{{getUserData.sport}}</span>
        <section class="user-statistic__wr">
          <div class="traine">
            <span class="traine-title">ТРЕНИРОВКИ</span>
            <span class="traine-value">10</span>
          </div>

           <v-progress-circular
              :rotate="360"
              :size="100"
              :width="15"
              :value="value"
              color="green"
            >
              <div v-if="getUserData" class="avatar__wr">
                <img v-if="getUserData.photo !== 'default' " :src="getUserData.photo" alt="avatar">
                <img v-if="getUserData.photo === 'default' " src="https://picsum.photos/94/94?random" alt="avatar">
              </div>
            </v-progress-circular>
          <div class="traine">
            <span class="traine-title">УРОВЕНЬ</span>
            <span class="traine-value">2</span>
          </div>
        </section>


      </div>
        <v-list-tile
          v-for="item in navs"
          :key="item.title"
          :class="[item.route === 'tarifs' ? 'menu-spacer' : '']"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
            <router-link class="nav-item white--text" :to="item.route">
              {{ item.title }}
            </router-link>
            <div ></div>
        </v-list-tile>
        <v-list-tile class="exit-btn">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
            <router-link class="nav-item white--text" to="" @click="goExit()">
              ВЫХОД
            </router-link>
            <div ></div>
        </v-list-tile>


    </v-navigation-drawer>
  </v-layout>
</template>


<script>
import firebase from '../firebase'
  export default {
    data () {
      return {
        search: '',
        drawer: null,
        value: 90,
        navs: [
          { title: 'ГЛАВНАЯ', icon: 'home', route: '/' },
          { title: 'ПРОФИЛЬ', icon: 'person', route: 'profile'},
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
    props:[
        'title'
    ],
    methods:{
      goExit(){
        firebase.auth().signOut()
        .then(() => {
          setInterval(function() {
              this.$router.replace('/login')
          }.bind(this), 1000)
        })
      },
    },
    computed: {
      getUserData(){
        let userdata = Object.values(this.$store.getters['ModuleUserData/get']);
        return userdata[0];
      },
    },
    created(){
      let user = firebase.auth().currentUser;
      this.$store.dispatch('ModuleUserData/set', user.uid);
    },
  }
</script>

<style>
p{
  margin: 0;
}
.main-menu__wr{
  background-image: url("../assets/images/menu/menu_bg.png");
  background-size: cover;
  background-position-x: center;
  background-color: rgba(0, 0, 0, .2);
}
.nav-item{
  text-decoration: none;
  color: black;
}
.menu-items__wr{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.v-text-field.v-text-field--enclosed .v-text-field__details, .v-text-field.v-text-field--enclosed>.v-input__control>.v-input__slot {
    padding: 0;
    width: 200px;
    border-radius: 55px;
    line-height: 1;
    min-height: 25px;

}
.sport-type{
  font-size: 10px;
  margin-bottom: 10px;
}
input[type="text"]{
  display: block;
  text-align: center;
}
.v-input__prepend-inner,
.v-input__append-inner{
  padding: 0 10px;
}
.theme--dark.v-text-field--solo>.v-input__control>.v-input__slot{
  background-color: rgba(255, 255, 255, .2)
}
.v-text-field.v-text-field--enclosed {
    margin: 0;
    padding: 0;
    max-height: 35px;
}
.traine{
  display: flex;
  flex-direction: column;
}
.traine-title{
  font-size: 7px;
}
.traine-value{
  font-size: 20px;
}
.user-statistic__wr{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.v-list__tile{
  height: 40px;
}
.menu-spacer{
  margin-bottom: 40px;
  width: 100%;
  height: 40px;
}
.v-progress-circular{
  margin: 1rem
}
img{
  width: 85px;
  height: 85px;
  border-radius: 100px;
  position: relative;
  top: 3px;
}
.page-title{
  color: black;
  line-height: 3;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
}
.exit-btn{
  margin-top: 20px;
  /* display: flex;
  flex-direction: row; */
}
.exit-icon{
  margin-right: 34px;
}
.close-menu-btn{
  position: absolute;
  right: 0;
  top: 0;
}
</style>
