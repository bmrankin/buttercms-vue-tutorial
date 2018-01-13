<template>
  <div id="blog-home" class="section">
    <div class="container">
      <h1 class="is-size-1">{{ page_title }}</h1>
      <hr>
      <div class="columns is-multiline">
        <!-- Create v-for and apply a key for Vue. Example is using a combination of the slug and index -->
        <div class="column is-one-third" v-for="(post,index) in posts" :key="post.slug + '_' + index">
          <router-link :to="'/blog/' + post.slug">
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <!-- Bind results using a ':' -->
                    <!-- Use a v-if/else if their is a featured_image -->
                    <img v-if="post.featured_image" :src="post.featured_image" alt="">
                    <img v-else src="http://via.placeholder.com/250x250" alt="">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <h2 class="title is-5">{{ post.title }}</h2>
                    <p>{{ post.summary }}</p>
                  </div>
                </div>
              </article>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'blog-home',
    data() {
      return {
        page_title: 'Blog',
        posts: [],
        categories: []
      }
    },
    methods: {
      getPosts() {
        butter.post.list({
          page: 1,
          page_size: 10
        }).then((res) => {
          // console.log(res.data)
          this.posts = res.data.data
        })
      },
      getCategories() {
        butter.category.list()
          .then((res) => {
            console.log('List of Categories:')
            console.log(res.data.data)
          })
      },
      getPostsByCategory() {
        butter.category.retrieve('example-category', {
            include: 'recent_posts'
          })
          .then((res) => {
            console.log('Posts with specific category:')
            console.log(res)
          })
      }
    },
    created() {
      this.getPosts()
      this.getCategories()
      this.getPostsByCategory()
    }
  }
</script>

<style>
  
</style>