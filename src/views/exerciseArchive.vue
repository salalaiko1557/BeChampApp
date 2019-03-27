<template>
  <div>
      <div class="main-header">
        <section v-for="(exercise, index) in getExercisesDifficulty" :key="index+'difficulty'" class="black">
          <v-card v-if="exercise_difficulty === exercise.slug && index !== undefined" class="card-item">
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
      </div>
      <v-container class="main-cards">
        <v-layout wrap justify-space-around>
          <aside class="col-5" v-for="(exercises, index) in getExercises" :key="index+'exercises'">
            <div class="card__wr">
              <header>
                <img src="https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/element5Digital499980Unsplash%402x.png?alt=media&token=70d9eb28-aee2-4c02-ad91-572e6c0a2060" alt="item" class="item-bg">
              </header>
              <section class="card-content">
                  <p class="ecercise-name">
                    {{exercises.name}}
                  </p>
                  <span class="exercise-link" @click="goNext(exercises.slug, exercises)">
                    ПОДРОБНЕЕ
                  </span>
              </section>
            </div>
          </aside>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
export default {
   data(){
      return{
          sport_type:               '',
          exercise_type:            '',
          exercise_difficulty:      '',
      }
   },
   computed:{
    getExercises(){
        return this.$store.getters['ModuleExerciseArchive/get'];
    },
    getExercisesDifficulty(){
        return this.$store.getters['ModuleExerciseDifficulty/get'];
    },
   },
   methods: {
      goPrev(){
        this.$router.push({name: 'exercise_difficulty', params: {sport_type: this.sport_type, exercise_type: this.exercise_type}});
        this.$store.dispatch('ModuleExerciseArchive/clear');
      },
      goNext(slug, content){
         this.$router.push({
           name: 'exercise_single',
           params: {
             sport_type: this.sport_type,
             exercise_type: this.exercise_type,
             exercise_difficulty: this.exercise_difficulty,
             exercise_single: slug
           },
         });
      }
   },
   created(){
      this.sport_type = this.$route.params.sport_type;
      this.exercise_type = this.$route.params.exercise_type;
      this.exercise_difficulty = this.$route.params.exercise_difficulty;
      this.$store.dispatch('ModuleExerciseArchive/setByParams',
        [
        this.sport_type,
        this.exercise_type,
        this.exercise_difficulty
        ]
      );
      this.$store.dispatch('ModuleExerciseDifficulty/set');
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
  margin-bottom: 0;
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
.main-cards{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/invalidName.png?alt=media&token=7c15edaf-5ee0-4eb3-8ce2-baabdfe76da5");
  background-size: 100%;
  height: calc(100vh - 220px);
  width: 100%;
}
.col-5{
  max-width: 40%;
}
.item-bg{
  width: 100%;
  object-fit: contain;
}
.card__wr{
  background: rgba(0, 0, 0, 0);
  margin-bottom: 25px;
}
.card-content{
  background-color: rgb(192, 74, 74)
}
.ecercise-name{
  font-weight: 900;
  padding: 40px 0;
  margin: 0;
  color: white;
}
.exercise-link{
  font-size: 12px;
  color: white;
  cursor: pointer;
}
.card-content{
  padding-bottom: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
