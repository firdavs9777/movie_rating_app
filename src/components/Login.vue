<template>
  <v-form v-model="valid" ref="form" lazy-validation>
  <v-text-field
  label="Email"
  v-model="email"
  :rules="emailRules"
  required
  ></v-text-field>
    <v-text-field
  label="Password"
  v-model="password"
  required
  ></v-text-field>
  <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
    <v-btn @click="clear" >Clear</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios';
import bus from '../bus';

export default {
  data: () => ({
     valid: true,
     email: '',
     password: '',
     emailRules: [
            v => !!v || 'Email name is required',
            v => /\S+@\S+\S.\S+/.test(v) || 'Email must be valid'
     ]
   }),
   methods: {
     async submit() {
      if(this.$refs.form.validate()){
        // Add process here
        if(this.$refs.form.validate()){
          return axios({
            method:'post',
            data: {
              email: this.email,
              password: this.password
            },
            url: '/users/login',
            headers: {
              'Content-Type' : 'application/json',
               "Access-Control-Allow-Origin": "*",
            }
          })
          .then ((response) => {
            console.log(response.data.token);
            window.localStorage.setItem('auth',response.data.token);
            this.$swal(
              'Great!',
              'You are ready to start! ',
              'success'
            );
            bus.$emit('refreshUser');
            this.$router.push({ name:'Home' });
          })
          .catch((error)=> {

            const message = error.response.data.message || 'Register first';
            this.$swal('Oh oo!', `${message}`, 'error');
          });
        }
        return true;
      }
     },
     clear() {
      this.$refs.form.reset();
     }
   }
}
</script>
