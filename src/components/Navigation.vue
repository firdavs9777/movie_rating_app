<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <router-link :to="{ name: 'Home' }" class="side_bar_link">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>Home</v-list-item-content>
        </router-link>
        <router-link :to="{ name: 'Contact' }" class="side_bar_link">
          <v-list-item-action>
            <v-icon>contact_mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>Contact</v-list-item-content>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>BananaTalk</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-items class="hidden-sm-and-down">
        <v-btn v-bind:to="{ name: 'AddMovie' }" v-if="current_user">Add Movie</v-btn>
        <v-btn id="user_email" >
          {{ current_user }}
        </v-btn>
        <v-btn flat v-bind:to="{ name: 'Register' }" v-if="!current_user" id="register_btn">Register</v-btn>
        <v-btn flat v-bind:to="{ name: 'Login' }" v-if="!current_user" id="login_btn">Login</v-btn>
        <v-btn flat v-if="current_user" id="logout_btn">Logout</v-btn>
      </v-app-bar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div id="app">
          <router-view />
        </div>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&Copyright 2022</span>
    </v-footer>
  </v-app>
</template>
<script>
import axios from 'axios';
import bus from '../bus';

export default {
  data: () => ({
    drawer: null,
    current_user: null
  }),
  props: {
    source: String
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    listenToEvents() {
      console.log(bus.$on);
      bus.$on('refreshUser', () => {
        this.fetchUser();
      });
    },
    async fetchUser() {
      return axios({
        method: 'get',
        url: '/api/current_user'
      })
        .then((response) => {
          this.current_user = response.data.current_user;
        })
        .catch(() => {

        });
    },
    logout() {

      return axios({
        method: 'get',
        url: '/api/logout'
      })
        .then((response) => {
          bus.$emit('refreshUser');
          this.$router.push({ name: 'Home' });
        })
        .catch(() => {
        });
    }
  }
  };
</script>
