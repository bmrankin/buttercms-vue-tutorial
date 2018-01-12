<template>
  <div id="app">
    <nav class="navbar is-info">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">
            Home
          </router-link>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/customers">          
            Customers
          </router-link>
          <router-link class="navbar-item" to="/faq">          
            FAQ
          </router-link>
          <router-link class="navbar-item" to="/blog">          
            Blog Posts
          </router-link>
          <router-link class="navbar-item" to="/rss">          
            RSS, Atom &amp; Sitemap
          </router-link>
        </div>  
      </div>
      
    </nav>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }

</script>

<style>


</style>
