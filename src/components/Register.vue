<template>
<v-form v-model="valid" ref="form" lazy-validation>
<v-text-field
label="Name"
v-model="name"
required
></v-text-field>
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
<v-text-field
label="Confirm Password"
v-model="confirm_password"
required
></v-text-field>
<v-btn @click="submit" :disabled="!valid">Submit</v-btn>
<v-btn @click="clear">Clear</v-btn>
</v-form>
</template>
<script>

import axios from 'axios';

export default {
  data: () => ({
     valid: true,
     name: '',
     email: '',
     password: '',
     confirm_password: '',
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
              name: this.name,
              password: this.password,
              email: this.email,
            },
            url: '/users/register',
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then (() => {
            this.$swal(
              'Great!',
              'You have successfully registered! ',
              'success'
            );
            this.$router.push({ name:'Login' });
          })
          .catch((error)=> {
            const message = error.response.data.message;
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
