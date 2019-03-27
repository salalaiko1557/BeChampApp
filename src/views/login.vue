<template>
<v-app>
  <div class="login__wr">
    <div class="login-content__wr">
      <v-container class="login-content">
        <div class="app-logo__wr">
          <img src="https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/beChampLogotypeW%402x.png?alt=media&token=6bfc6b10-23db-404e-a898-f77649dcab12" alt="logo">
        </div>
        <div class="pass-reset__wr">
          <v-btn flat small color="white">Забыли пароль?</v-btn>
        </div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="login-form__wr"
        >
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-MAIL"
            required
            :color="'white'"
            dark
            class="login-input"
          ></v-text-field>

          <v-text-field
                v-model="password"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="ПАРОЛЬ"
                hint="Не менее 8 символов"
                counter
                dark
                :color="'white'"
                class="login-input white--text"
                @click:append="show1 = !show1"
              ></v-text-field>

            <v-btn
              :disabled="disabled"
              :loading="dialog"
              color="white"
              class="login_btn"
              @click="validate"
            >
              {{login_text_btn}}
            </v-btn>
          </v-form>
          <p color="white" class="text-center or" v-if="show_info_status">{{text_info}}</p>
          <!-- <p class="text-center or">ИЛИ</p>
          <p class="text-center">ВОЙТИ С ПОМОЩЬЮ</p> -->
          <!-- <div class="social-login__wr">
              <v-btn icon>
                <v-avatar @click="facebookLogin()" color="white" class="soc-icon" size="49px">
                  <img src="https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/facebook-circular-logo.svg?alt=media&token=bd836435-6e01-40cf-b83a-56180ecc3ce1">
                </v-avatar>
              </v-btn>
              <v-btn icon>
                <v-avatar @click="googleLogin()" color="white" class="soc-icon" size="49px">
                  <img src="https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/social-google-plus-circular-button.svg?alt=media&token=12518a4e-b8f4-48f5-91b9-ea0e75ee5ff9">
                </v-avatar>
              </v-btn>
              <v-btn icon>
                <v-avatar size="49px">
                  <img src="../assets/images/login_screen/vk.png">
                </v-avatar>
              </v-btn>
          </div> -->
          <v-btn
            class="register_btn"
            flat
            color="white"
            :to="{name: 'register'}"
          >
            Регистрация
          </v-btn>
          <v-btn
            flat
            color="white"
            class="all-rights"
          >
            ПОЛИТИКА КОНФЕДЕНЦИАЛЬНОСТИ
          </v-btn>
        </v-container>
    </div>
  </div>
 </v-app>
</template>

<script>
import firebase from '../firebase'
  export default {
    // components:{
    //   CustomMenu
    // },
    data: () => ({
        login_text_btn: 'ВОЙТИ',
        show_info_status: false,
        text_info: '',
        dialog: false,
        disabled: false,
      valid: true,
      password: '',
      show1: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail обязательный',
        v => /.+@.+/.test(v) || 'E-mail должен быть валидным'
      ],
       rules: {
          required: value => !!value || 'Пароль обязательный',
          min: v => v.length >= 8 || 'Не менее 8 символов',
      }

    }),
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.dialog = true;
          this.disabled = false;
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(
            function(user){
              this.dialog = false;
              this.disabled = true;
              this.login_text_btn = 'УСПЕШНО';
              this.$store.dispatch('ModuleUserData/set');
                setInterval(function() {
                   this.$router.replace('/')
                }.bind(this), 1500)
            }.bind(this))
          .catch(
            function(err){
              this.dialog = false;
              this.disabled = false;
              this.login_text_btn = 'ОШИБКА';
              this.show_info_status = true;
              this.text_info = err.message
            }.bind(this));
        }
      },
      // googleLogin(){
      //   this.show_info_status = false;
      //   this.text_info = '';
      //   let provider = new firebase.auth.GoogleAuthProvider();
      //   firebase.auth().signInWithRedirect(provider)
      //   .then(function(response){
      //     this.$router.replace('/');
      //     this.$store.dispatch('ModuleUserData/set');
      //   }.bind(this))
      //   .catch(function(error){
      //     this.show_info_status = true;
      //     this.text_info = error.message
      //   }.bind(this));
      // },
      // facebookLogin(){
      //   this.show_info_status = false;
      //   this.text_info = '';
      //   let provider = new firebase.auth.FacebookAuthProvider();
      //   firebase.auth().signInWithRedirect(provider)
      //   .then(function(response){
      //     this.$router.replace('/');
      //   }.bind(this))
      //   .catch(function(error){
      //     this.show_info_status = true;
      //     this.text_info = error.message
      //   }.bind(this));
      // }
    }
  }
</script>
<style scoped>
p{
  margin: 0;
}
.app-logo__wr{
  display: block;
  height: 169px;
  width: 169px;
  margin-bottom: 20px;
}
.app-logo__wr>img{
  height: inherit;
  width: inherit;
}
.login__wr{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/login_bg1.png?alt=media&token=5d45b02c-3eab-4070-9b38-2e971ea8e02b");
  background-color: rgba(0, 0, 0, .7);
  background-size: cover;
  height: 100vh;
}
.login-form__wr{
  width: 100%;
  margin-bottom: 15px;
}
.login-content__wr{
  padding: 0 40px;
}
.login-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pass-reset__wr{
  margin-bottom: 15px;
}
.input-group__input{
  color: white;
}
.v-input{
  padding: 0;
  margin-bottom: 15px;
}
.login_btn{
  width: 100%;
  border-radius: 20px;
  padding: 0;
  margin: 0;
}
.or{
  margin-bottom: 15px;
}
.max-width{
  width: 100%;
}
.social-login__wr{
  margin: 15px 0;
  min-height: 60px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.register_btn{
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  width: 100%;
  margin-bottom: 20px;
}
.soc-icon{
  border: 1px solid #fff;
}
.all-rights{
  font-size: 11px;
  padding: 0;
  margin: 0;
  height: 11px;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat):not(.v-btn--outline) {
    background-color: gray!important;
}
</style>
