<template>
<v-layout row wrap>
  <v-flex xs4  class="pa-md-2" v-for="movie in movies" :key="movie._id">
   <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline" >
      <v-btn  v-bind:to="`/movies/${movie._id}`">{{ movie.name }}</v-btn>
      </div>
      <span class="grey--text"> {{ movie.release_year}} | {{ movie.genre }}</span>
      </div>
    </v-card-title>
    <v-card-text class="text-h6 font-weight-light ">
         {{ movie.description }}
    </v-card-text>
       <v-card-actions>
    <v-btn block color="accent" >Rate this movie</v-btn>
<v-spacer></v-spacer>
  </v-card-actions>
   </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      movies: [],
      current_user: '',
      msg: 'Hello, there! How are you, today?'
    };
  },
  mounted(){
     this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/movies',
        headers: {
       Authorization: `JWT ${token}`,
      'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.movies = response.data.movies;
        this.current_user = response.data.current_user;
        console.log(this.movies);
      })
      .catch(()=> {

      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

