<template>
  <div>
    <div>
      <section v-for="(exercise, index) in getExercises" :key="index+'exercise'" class="black">
        <v-card v-if="exercise.slug === exercise_type_slug" class="card-item">
          <v-icon flat icon color="white" class="prev-page" @click="goPrev()" size="30px">keyboard_arrow_left</v-icon>
          <v-icon flat icon color="white" class="info-btn" size="30px">info</v-icon>
          <div
            v-for="(photo, num) in exercise.photos"
            :key="num+'photo'"
            >
            <v-img
              v-if="num === 1"
              height="220px"
              :src="photo.photo"
            >
            </v-img>
          </div>
        </v-card>
      </section>
      <section class="items" v-for="(item, num) in getDifficulty" :key="num+'difficulty'">
        <v-icon flat icon color="white" class="next-page" @click="goNext(item.slug)" size="30px">keyboard_arrow_right</v-icon>
        <v-card v-if="num !== undefined" class="card-item">
          <div
            v-for="(photo, number) in item.photos"
            :key="number+'photo'">
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
        sport_type_slug:    '',
        exercise_type_slug: '',
      }
    },
    computed: {
      getDifficulty(){
        return this.$store.getters['ModuleExerciseDifficulty/get'];
      },
      getExercises(){
        return this.$store.getters['ModuleExerciseTypes/get'];
      }
    },
    created(){
     this.sport_type_slug = this.$route.params.sport_type;
     this.exercise_type_slug = this.$route.params.exercise_type;
     this.$store.dispatch('ModuleExerciseDifficulty/set');
     this.$store.dispatch('ModuleExerciseTypes/set');
    },
    methods: {
      goPrev(){
       this.$router.push({name: 'exercise_type', params: {sport_type: this.sport_type_slug}})
      },
      goNext(defficulty_slug){
        this.$router.push({
          name: 'exercise_archive',
          params:{
            sport_type:    this.sport_type_slug,
            exercise_type: this.exercise_type_slug,
            exercise_difficulty: defficulty_slug
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
.next-page{
  position: absolute;
  z-index: 1;
  right: 0;
}
</style>
