<template>
  <div class="section" id="customer-page">
    <div class="container center">
      <figure class="image is-128x128">
        <img :src="page.fields.customer_logo">
      </figure>
      <h1 class="is-size-2">{{ page.fields.headline }}</h1>
      <h3 class="is-size-3">Testimonials</h3>
      <div class="content" v-html="page.fields.testimonial"></div>
      <div class="content" v-html="page.fields.body"></div>
    </div>
  </div>
</template>

<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'customer-page',
    data() {
      return {
        slug: this.$route.params.slug,
        page: {
          slug: '',
          fields: {}
        }
      }
    },
    methods: {
      getPage() {
        butter.page.retrieve('customer_case_study', this.slug)
          .then((res) => {
            console.log(res.data.data)
            this.page = res.data.data
          }).catch((res) => {
            console.log(res)
          })
      }
    },
    created() {
      this.getPage()
    }
  }
</script>

<style>
  
</style>
