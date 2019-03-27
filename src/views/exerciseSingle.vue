<template>
  <div>
    <header class="single__page-title">
      <v-icon flat icon color="red" class="prev-page" @click="goPrev()" size="30px">keyboard_arrow_left</v-icon>
      <span>{{get.name}}</span>
      <v-icon flat icon color="red" class="go-favorites" size="30px">favorite_border</v-icon>
    </header>
    <section class="video" v-if="get.video_link">
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      >
      </video-player>
    </section>
    <div class="single__main-content">
      <section v-if="get.description" class="single__description">
        <header class="single__description-title">
          <p>ОПИСАНИЕ</p>
        </header>
        <aside class="single__description-data">
          <p>{{get.description}}</p>
        </aside>
      </section>

      <section v-if="get.sparring" class="single__description">
        <header class="single__description-title">
          <p>НЕОБХОДИМОСТЬ СПАРИНГ ПАРТНЕРА</p>
        </header>
        <aside class="single__description-data">
          <p>{{get.sparring}}</p>
        </aside>
      </section>

      <section v-if="get.duration" class="single__description">
        <header class="single__description-title">
          <p>ВРЕМЯ ВЫПОЛНЕНИЯ</p>
        </header>
        <aside class="single__description-data">
          <p>{{get.duration}} минут</p>
        </aside>
      </section>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'

export default {
  components:{
    videoPlayer
  },
  data(){
    return{
      exercise_slug: '',
      sport_type: '',
      exercise_type: '',
      exercise_difficulty: '',
      playerOptions:{
        muted: false,
        language: 'ru',
        height: 200,
        width: 500,
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        preload: 'none',
        sources:[],
        poster: "https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/beChampLogotypeW%402x.png?alt=media&token=6bfc6b10-23db-404e-a898-f77649dcab12",
      }
    }
  },
  created(){
    this.sport_type = this.$route.params.sport_type;
    this.exercise_type = this.$route.params.exercise_type;
    this.exercise_difficulty = this.$route.params.exercise_difficulty;
    this.exercise_slug = this.$route.params.exercise_single;
    this.$store.dispatch('ModuleExerciseSingle/setBySlug', this.exercise_slug );
  },
  computed: {
    get(){
      return this.$store.getters['ModuleExerciseSingle/get'];
    },
    videos(){
      this.playerOptions.sources.push({
        type: "video/mp4",
        src: this.get.video_link
      })
    }
  },
  methods:{
    goPrev(){
      this.$router.push({name: 'exercise_archive', params: {sport_type: this.sport_type, exercise_type: this.exercise_type, exercise_difficulty: this.exercise_difficulty}});
        this.$store.dispatch('ModuleExerciseSingle/clear');
    }
  }
}
</script>
<style>
.single__page-title{
  color: black;
  font-weight: 900;
  min-height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center
}
.video{
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.single__description{
  color: white;
  padding-bottom: 15px;
}
.single__main-content{
  background-color: rgb(192, 74, 74);
  height: calc(100vh - 248px);
}
.single__description-title{
  font-weight: 900;
  padding: 25px;
}
.single__description-title>p,
.single__description-data>p{
  margin: 0;
}
.single__description-data{
  padding: 0 15px;
}
.video-js .vjs-big-play-button {
  background-color: rgb(192, 74, 74);
  border: 0;
  border-radius: 100px;
  width: 60px;
  height: 60px;
}
.video-player,
.video-player>.video-js{
  width: 100%
}
.vjs-icon-play:before, .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-play-control .vjs-icon-placeholder:before{
  position: relative;
  border: 1px solid white;
  border-radius: 100px;
  padding: 6px;
  top: 2px;
}

</style>
