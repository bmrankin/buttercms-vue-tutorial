<template>
  <div class="hello">
    <div class="section">
      <div class="container">
        <figure>
          <img src="../assets/logo.png" alt="Vue logo">
        </figure>
        <figure>
          <img src="../assets/buttercms.jpg" alt="ButterCMS logo">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { butter } from '@/buttercms'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    fetchHeadline(){
      butter.content.retrieve(['homepage_headline'])
        .then((res) => {
          console.log('Headline from ButterCMS')
          console.log(res)
        })
    },
    fetchPosts(){
      butter.post.list({page: 1, page_size: 10})
        .then((res) => {
          console.log('Content from ButterCMS')
          console.log(res)
        })
    }
    
  },
  created() {
    this.fetchHeadline()
    this.fetchPosts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
