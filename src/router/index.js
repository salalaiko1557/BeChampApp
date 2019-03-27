import Vue from 'vue'
import Router from 'vue-router'
//Components and Pages
import SportType from '@/views/sportType'
import Login from '@/views/login'
import Register from '@/views/register'
import ExerciseType from '@/views/exerciseType'
import ExerciseDifficulty from '@/views/exerciseDifficulty'
import ExerciseArchive from '@/views/exerciseArchive'
import ExerciseSingle from '@/views/exerciseSingle'
import Profile from '@/views/profile'
import EditData from '@/views/editPersonalData'



import firebase from '../firebase'

Vue.use(Router)

const router = new Router({
  routes: [
 //////////
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
///////////
    {
      path: '*',
      redirect: '/login'
    },
//////////
    {
      path: '/',
      name: 'home',
      component: SportType,
      meta: {
        requiresAuth: true
      }
    },
//////////
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editdata',
      name: 'edit_data',
      component: EditData,
      meta: {
        requiresAuth: true
      }
    },
//////////
    {
      path: '/:sport_type',
      name: 'exercise_type',
      component: ExerciseType,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:sport_type/:exercise_type',
      name: 'exercise_difficulty',
      component: ExerciseDifficulty,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:sport_type/:exercise_type/:exercise_difficulty',
      name: 'exercise_archive',
      component: ExerciseArchive,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:sport_type/:exercise_type/:exercise_difficulty/:exercise_single',
      name: 'exercise_single',
      component: ExerciseSingle,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !user) next('login');
  else if(!requiresAuth && user) next('/')
  else next();
});

export default router;
