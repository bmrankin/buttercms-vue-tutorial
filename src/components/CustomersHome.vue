<template>
  <div id="customers-home" class="section">
    <div class="container">
      <h1 class="is-size-1">{{ page_title }}</h1>
      <hr>
      <div class="columns is-multiline">
        <!-- Create v-for and apply a key for Vue. Example is using a combination of the slug and index -->
        <div class="column is-one-third" v-for="(page,index) in pages" :key="page.slug + '_' + index">
          <router-link :to="'/customers/' + page.slug">
            <div class="box">
              <article class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <!-- Bind results using a ':' -->
                    <img :src="page.fields.customer_logo" alt="">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <h2 class="title is-5">{{ page.fields.headline }}</h2>
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
  // import ButterCMS from 
  import { butter } from '@/buttercms'
  export default {
    name: 'customers-home',
    data() {
      return {
        page_title: 'Customers',
        // Create array to hold the pages from ButterCMS API
        pages: []
      }
    },
    methods: {
      // Get List of Customer Pages
      getPages() {
        butter.page.list('customer_case_study')
          .then((res) => {
            // console.log(res.data.data) // Check the results in the console
            this.pages = res.data.data
          })
      }
    },
    created() {
      // Fire on page creation
      this.getPages()
    }
  }
</script>

<style>
  
</style>
