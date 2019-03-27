import Vue from 'vue'
import Vuex from 'vuex'
import ModuleSportTypes from './sport_types'
import ModuleExerciseTypes from './exercise_types'
import ModuleExerciseDifficulty from './exercise_difficulty'
import ModuleExerciseArchive from './exercise_archive'
import ModuleExerciseSingle from './exercise_single'
import ModuleUserData from './user_data'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    ModuleSportTypes,
    ModuleExerciseTypes,
    ModuleExerciseDifficulty,
    ModuleExerciseArchive,
    ModuleExerciseSingle,
    ModuleUserData
  }
})
