<template>
  <div>
    <div>
      <section v-for="(sport_type, index) in getSports" :key="index+'sport'" class="black">
        <v-card v-if="sport_type.slug === sport_type_slug" class="card-item-title">
          <v-icon flat icon color="white" class="prev-page" @click="goPrev()" size="30px">keyboard_arrow_left</v-icon>
          <v-icon flat icon color="white" class="info-btn" size="30px">info</v-icon>
          <div
            v-for="(photo, index) in sport_type.photos"
            :key="index+'photo'"
            >
            <v-img
              v-if="index === 0"
              height="220px"
              :src="photo.photo"
            >
            </v-img>
          </div>
        </v-card>
      </section>
      <div class="create-trainn">
        <span>СОЗДАТЬ ТРЕНИРОВКУ</span>
      </div>
      <section class="items" v-for="(item, num) in getExercises" :key="num">
        <v-icon flat icon color="white" class="next-page" @click="goNext(item.slug)" size="30px">keyboard_arrow_right</v-icon>
        <v-card v-if="num !== undefined" class="card-item">
          <div
            v-for="(photo, number) in item.photos"
            :key="number">
            <v-img
              v-if="number === 0"
              height="189px"
              :src="photo.photo"
            >
            </v-img>
          </div>
        </v-card>
      </section>
    </div>
  </div>
</template>

<script>
import CustomMenu from '../components/Menu.vue'
  export default {
    data(){
      return{
        sport_type_slug: '',
      }
    },
    computed: {
      getSports(){
        return this.$store.getters['ModuleSportTypes/get'];
      },
      getExercises(){
        return this.$store.getters['ModuleExerciseTypes/get'];
      }
    },
    created(){
     this.sport_type_slug = this.$route.params.sport_type;
     this.$store.dispatch('ModuleSportTypes/set');
     this.$store.dispatch('ModuleExerciseTypes/set');
    },
    methods: {
      goPrev(){
        this.$router.push({name: 'home'})
      },
      goNext(exercise_slug){
        this.$router.push({
          name: 'exercise_difficulty',
          params:{
            sport_type:    this.sport_type_slug,
            exercise_type: exercise_slug
          }
        })
      }
    }
  }
</script>

<style scoped>
.black{
  color: black;
}
.card-item-title{
  margin-bottom: 0;
}
.card-item{
  margin-bottom: 3px;
}
.items{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.prev-page{
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 6px 8px;
}
.info-btn{
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  margin: 6px 8px;
}
.create-trainn{
  background-color: rgb(192, 74, 74);
  height: 40px;
  margin-bottom: 2px;
  line-height: 3;
}
.next-page{
  position: absolute;
  z-index: 1;
  right: 0;
}
</style>
