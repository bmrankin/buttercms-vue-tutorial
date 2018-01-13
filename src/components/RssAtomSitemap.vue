<template>
  <div id="rss">
    <div v-if="rss">
      <pre>
        {{ rss }}
      </pre>
      <hr>
    </div>
    <div v-if="atom">
      <pre>
        {{ atom }}
      </pre>
      <hr>
    </div>
    <div v-if="sitemap">
      <pre>
        {{ sitemap }}
      </pre>
      <hr>
    </div>
  </div>
</template>

<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'rss-atom-sitemap',
    data() {
      return {
        rss: '',
        atom: '',
        sitemap: ''
      }
    },
    methods: {
      getRss() {
        butter.feed.retrieve('rss').then((res) => {
          console.log(res.data.data)
          this.rss = res.data.data
        })
      },
      getAtom() {
        butter.feed.retrieve('atom').then((res) => {
          console.log(res.data.data)
          this.atom = res.data.data
        })
      },
      getSitemap() {
        butter.feed.retrieve('sitemap').then((res) => {
          console.log(res.data.data)
          this.sitemap = res.data.data
        })
      },
    },
    created() {
      this.getRss()
      this.getAtom()
      this.getSitemap()
    }
  }
</script>
