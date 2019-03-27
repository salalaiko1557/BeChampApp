<template>
<v-app>
  <div class="login__wr">
    <div class="login-content_wr">
      <div class="close-page-btn__wr">
          <v-btn flat icon color="white" :to="{name: 'login'}">
            <v-icon size="40px">close</v-icon>
          </v-btn>
      </div>
      <v-container class="login-content">
        <div class="app-logo__wr">
          <img src="https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/beChampLogotypeW%402x.png?alt=media&token=6bfc6b10-23db-404e-a898-f77649dcab12" alt="logo">
        </div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="login-form__wr"
        >
          <v-text-field
              v-model="name"
              label="Ф.И.О."
              :rules="[name_rules.required]"
              required
              :color="'white'"
              dark
              class="login-input"
            ></v-text-field>
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
          <v-text-field
              v-model="coincidence_password"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required, rules.min, comparePasswords]"
              name="input-10-2"
              label="ПОВТОРИТЕ ПАРОЛЬ"
              hint="Не менее 8 символов"
              counter
              :color="'white'"
              dark
              class="login-input white--text"
              @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
              class="register_btn"
              :disabled="disabled"
              :loading="dialog"
              color="white"
              @click="validate"
              flat
          >
            {{register_text_btn}}
          </v-btn>
        </v-form>
        <p color="white" class="text-center info-text" v-if="show_info_status">{{text_info}}</p>
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
    data(){
      return{
        register_text_btn: 'РЕГИСТРАЦИЯ',
        show_info_status: false,
        text_info: '',
        dialog: false,
        disabled: false,
        name: '',
        valid: true,
        password: '',
        coincidence_password: '',
        show1: false,
        email: '',
        emailRules: [
          v => !!v || 'E-mail обязательный',
          v => /.+@.+/.test(v) || 'E-mail должен быть валидным'
        ],
        rules: {
            required: v => !!v || 'Пароль обязательный',
            min: v => v.length >= 8 || 'Не менее 8 символов',

        },
        name_rules: {
            required: v => !!v || 'Поле обязательно',
        }
      }
    },
    methods: {
      comparePasswords(){
        return this.coincidence_password !== this.password ? 'Пароли не совпадают' : true;
      },
      validate() {
        if (this.$refs.form.validate()) {
          this.dialog = true;
          this.disabled = false;
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(
            function(user){
              this.dialog = false;
              this.disabled = true;
              this.register_text_btn = 'УСПЕШНО';
              this.show_info_status = true;
              this.text_info = 'Регистрация прошла успешно. Войдите в приложения используя Email и пароль';
              this.$store.dispatch('ModuleUserData/create', this.name);
              setInterval(function() {
                   this.$router.replace('/')
                }.bind(this), 1500)
            }.bind(this))
          .catch(
            function(err){
              this.dialog = false;
              this.disabled = true;
              this.register_text_btn = 'ОШИБКА';
              this.show_info_status = true;
              this.text_info = err.message
            }.bind(this));
        }
      },
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
  margin-bottom: 41px;
}
.app-logo__wr>img{
  height: inherit;
  width: inherit;
}
.login__wr{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/bechamp-77777.appspot.com/o/login_bg1.png?alt=media&token=5d45b02c-3eab-4070-9b38-2e971ea8e02b");
  background-color: rgba(0, 0, 0, .7);
  background-size: 100% 100%;
  height: 100vh;
}
.login-content_wr{
  padding: 0 40px;
}
.login-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-form__wr{
  width: 100%;
  margin-bottom: 15px;
}
.input-group__input{
  color: white;
}
.v-input{
  padding: 0;
  margin: 8px 0;
}
.login_btn{
  width: 100%;
  border-radius: 20px;
  margin: 0;
  padding: 0;
}
.max-width{
  width: 100%;
}
.social-login__wr{
  min-height: 60px;
  display: flex;
  justify-content: space-evenly
}
.register_btn{
  background-color: rgba(255, 255, 255, 0.4);
  color: white;
  border: 1px solid white;
  border-radius: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-top: 15px;
}
.all-rights{
  font-size: 11px;
  padding: 0;
  margin: 0;
  height: 11px;
}
.close-page-btn__wr{
  position: absolute;
  top: 20px;
  left: 10px;
  max-width: 40px;
}
.theme--light.v-btn.v-btn--disabled, .theme--light.v-btn.v-btn--disabled .v-btn__loading, .theme--light.v-btn.v-btn--disabled .v-icon {
  color: rgba(255,255,255,1)!important;
}
.info-text{
  font-weight: 700;
  margin-bottom: 10px;
}
</style>
