<template>
  <v-app>
    <div>
        <custom-menu :title="'ВИДЫ ЕДИНОБОРСТВ'"></custom-menu>
    </div>
    <div>
      <section v-for="(item, index) in getSports" :key="index+'sport'">
        <v-card v-if="index !== undefined" @click="show(item.slug)" class="card-item">
          <div
            v-for="(photo, index) in item.photos"
            :key="index+'photo'">
            <v-img
              v-if="index === 0"
              height="220px"
              :src="photo.photo"
            >
            </v-img>
          </div>
        </v-card>
      </section>
    </div>
  </v-app>
</template>

<script>
import CustomMenu from '../components/Menu.vue'
  export default {
    components:{
      CustomMenu
    },
    created() {
      this.$store.dispatch('ModuleSportTypes/set');
    },
    computed: {
      getSports(){
        return this.$store.getters['ModuleSportTypes/get'];
      }
    },
    methods: {
      show(slug){
        this.$router.push({name: 'exercise_type', params: {sport_type: slug}});
      }
    }
  }
</script>

<style>
.black{
  color: black;
}
.theme--dark.v-btn {
    z-index: 1;
}
.card-item{
  margin-bottom: 2px;
}
</style>

