<template>
  <div id="faq">
    <div class="section">
      <div class="container">
        <h1 class="is-size-1">{{ page_title }}</h1>
        <hr>
        <div v-for="(faq, index) in faq_items" :key="index">
          <p class="is-size-5">{{ faq.question }}</p>
          <p class="is-size-4">{{ faq.answer }}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'faq',
    data() {
      return {
        page_title: 'FAQ',
        faq_items: []
      }
    },
    methods: {
      getFaqs() {
        butter.content.retrieve(['faq_headline', 'faq_items'])
          .then((res) => {
            console.log(res.data.data)
            this.page_title = res.data.data.faq_headline
            this.faq_items = res.data.data.faq_items
          })
      }
    },
    created() {
      this.getFaqs()
    }
  }
</script>

<style>


</style>
