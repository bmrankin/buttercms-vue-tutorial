# Setup
## Install

Setup a new Vue Project
`vue init webpack buttercms-project`

```
? Project name buttercms-project
? Project description A Vue.js project
? Author Your Name <you@email.com>
? Vue build (Use arrow keys)
❯ Runtime + Compiler: recommended for most users
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) (Use arrow keys)
❯ Yes, use NPM
```
Install ButterCMS
`npm i -S buttercms`
The source code is [available on Github](https://github.com/bmrankin/buttercms-project)

## Quickstart
Open the project in your code editor of choice.

We create a file called `buttercms.js` in our src directory. This allows us to have our API Token in one place and not accidentally alter it.

```
import Butter from 'buttercms';
const butter = Butter('your_api_token');
```

We'll import this file into any component we want to use ButterCMS.

For a Quickstart go to ../components/HelloWorld.vue and import `buttercms.js` after `<script>`

```
import { butter } from '@/buttercms'
```

Next create a method to call the ButterCMS API

```
methods: {
  fetchPosts() {
    butter.post.list({
        page: 1,
        page_size: 10
      })
      .then((res) => {
        console.log('Content from ButterCMS')
        console.log(res)
      })
  }
}
```

Now call this method when the component is loaded by adding it to the `created` lifecycle hook after the methods object:
```
methods: {
...
},
created() {
  this.fetchPosts()
}
```

This API request fetches our blog posts. Your account comes with one example post which you'll see in the response.

Next, create another method to retrieve the Homepage Headline Content Field:

```
fetchHeadline() {
  butter.content.retrieve(['homepage_headline'])
    .then((res) => {
      console.log('Headline from ButterCMS')
      console.log(res)
    })
},
```

Add this method to the `created` lifecycle hook.

```
created() {
  this.fetchHeadline()
  this.fetchPosts()
}
```

This API request fetches homepage headline content. You can setup your own custom content fields to manage any content kind of content you need.

# Pages
## Integrate your app

With our page defined, the ButterCMS API will return it in JSON format like this:
```
{
    "data": {
        "slug": "acme-co",
        "fields": {
            "facebook_open_graph_title": "Acme Co loves ButterCMS",
            "seo_title": "Acme Co Customer Case Study",
            "headline": "Acme Co saved 200% on Anvil costs with ButterCMS",
            "testimonial": "<p>We've been able to make anvils faster than ever before! - <em>Chief Anvil Maker</em></p>\r\n<p><img src=\"https://cdn.buttercms.com/NiA3IIP3Ssurz5eNJ15a\" alt=\"\" caption=\"false\" width=\"249\" height=\"249\" /></p>",
            "customer_logo": "https://cdn.buttercms.com/c8oSTGcwQDC5I58km5WV",
        }
    }
}
```

This guide uses the [Vue.js](https://vuejs.org/) framework and the [vue-cli](https://github.com/vuejs/vue-cli) webpack template to take advantage of vue-router already being setup. We are using [Bulma CDN](https://cdnjs.com/libraries/bulma) added to `index.html` for some quick styling, but feel free to style as you like.

Let's get to the code.

### Create new project
```
vue init webpack buttercms-project
cd buttercms-project
npm i
npm i -S buttercms
npm run dev
```
>*vue-cli now has an option to run npm install for you. If you selected "Yes, use NPM" when initializing the project skip `npm i`*

### Open your code editor and create a file called `buttercms.js` in your src directory.
`src/buttercms.js`
```
import Butter from 'buttercms';
const butter = Butter('your_api_token');
```

### Update the routes in your app
`router/index.js:`

```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CustomersHome from '@/components/CustomersHome'
import CustomerPage from '@/components/CustomerPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/customers/',
      name: 'customers-home',
      component: CustomersHome
    },
    {
      path: '/customers/:slug',
      name: 'customer-page',
      component: CustomerPage
    }
  ]
})
```


### Setup the Customers Page to list all our customers.
`components/CustomersHome.vue`

#### Create method to get all customer pages
1. import ButterCMS
2. Create `getPages()`
3. Fire `getPages()` on page create

```
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
```

#### Display the results 
```
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
```

> Quick syntax note:
>  Vue.js provides special shorthands for two of the most often used directives in templates, `v-bind` and `v-on`. The code presented in this tutorial will use the shorthand. 
>  [Learn more](https://vuejs.org/v2/guide/syntax.html#Shorthands)

### Setup the Customer Page to view single page
`components/CustomerPage.vue`

#### Create method to get single page
1. Import ButterCMS
2. Create `getPage()`
3. Fire `getPage()` on page created

```
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
```

#### Display the result
```
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
```

We can know navigate to the Customer Page via the list of all Customer Pages or directly via url.

# Content Fields
## Integrate with your app
### Create FAQ Vue Component

`components/FAQ.vue`

### Setup the route to your FAQ's page

`router/index.js`:

```
import Vue from 'vue'
import Router from 'vue-router'
...
import FAQ from '@/components/FAQ'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    ...
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    }
  ]
})
```

#### Create the method to get the FAQ's

```
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
```

#### Display the result

```
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
```

That's it! The values entered in the Butter dashboard will immediately update the content in our app.

Notice that we predefined `page_title` as 'FAQ' and then updated it with the API call to 'Frequently Asked Questions'.

# Blog Engine

To display posts we create a simple `/blog` route in our app and fetch blog posts from the Butter API, as well as a `/blog/:slug` route to handle individual posts. 

See our API reference for additional options such as filtering by category or author. The response also includes some metadata we'll use for pagination.

### Update the routes in our app

`router/index.js:`

```
import Vue from 'vue'
import Router from 'vue-router'
...
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    ...
    {
      path: '/blog/',
      name: 'blog-home',
      component: BlogHome
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPost
    }
  ]
})
```

### Setup the Blog page to list all our posts.

`components/BlogHome.vue`

#### Create method to get all posts
1. import ButterCMS
2. Create `getPosts()`
3. Fire `getPosts()` on page create

```
<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'blog-home',
    data() {
      return {
        page_title: 'Blog',
        posts: []
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
      }
    },
    created() {
      this.getPosts()
    }
  }
</script>
```

#### Display the result
```
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
```

### Setup the Blog Post page to list a single post.
`components/BlogPost.vue`

#### Create method to get all posts
1. import ButterCMS
2. Create `getPost()`
3. Fire `getPost()` on page create

```
<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'blog-post',
    data() {
      return {
        post: {}
      }
    },
    methods: {
      getPost() {
        butter.post.retrieve(this.$route.params.slug)
          .then((res) => {
            // console.log(res.data)
            this.post = res.data
          }).catch((res) => {
            console.log(res)
          })
      }
    },
    created() {
      this.getPost()
    }
  }
</script>
```

#### Display the results
```
<template>
  <div class="section" id="blog-post">
    <div class="container center">
      <div class="has-text-centered">
        <router-link v-if="post.meta.previous_post" :to="/blog/ + post.meta.previous_post.slug" class="button">
          < {{ post.meta.previous_post.title }} </router-link>
            <router-link v-if="post.meta.next_post" :to="/blog/ + post.meta.next_post.slug" class="button">
              {{ post.meta.next_post.title }} >
            </router-link>
      </div>
      <hr>
      <h1 class="is-size-2">{{ post.data.title }}</h1>
      <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>
      <div class="content" v-html="post.data.body"></div>
    </div>
  </div>
</template>
```

Now our app is pulling all blog posts and we can navigate to individual posts.

However, our next/previous post buttons are not working.

One thing to note when using routes with params is that when the user navigates from /blog/foo to /blog/bar, the same component instance will be reused. Since both routes render the same component, this is more efficient than destroying the old instance and then creating a new one. However, this also means that the lifecycle hooks of the component will not be called.

Visit the Vue.js docs to [learn more about Dynamic Route Matching](https://router.vuejs.org/en/essentials/dynamic-matching.html#reacting-to-params-changes)

To fix this we need to simply watch the $route object and call `getPost()` when the route changes.

Updated `script` section in `components/BlogPost.vue`:

```
<script>
  import { butter } from '@/buttercms'
  export default {
    name: 'blog-post',
    data() {
      return {
        post: {}
      }
    },
    methods: {
      getPost() {
        butter.post.retrieve(this.$route.params.slug)
          .then((res) => {
            // console.log(res.data)
            this.post = res.data
          }).catch((res) => {
            console.log(res)
          })
      }
    },
    watch: {
      $route(to, from) {
        this.getPost()
      }
    },
    created() {
      this.getPost()
    }
  }
</script>
```

Now our app has a working blog that can be updated easily in the ButterCMS dashboard.

### Categories, Tags, and Authors

Use Butter's APIs for categories, tags, and authors to feature and filter content on your blog:

#### List all categories and get posts by category
Call these methods on the `created()` lifecycle hook
```
methods: {
  ...
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
  ...
  this.getCategories()
  this.getPostsByCategory()
}
```

### RSS, Atom, and Sitemap

Butter generates RSS, Atom, and sitemap XML markup. To use these on your blog, return the generated XML from the Butter API with the proper content type headers.

Create a file to see an example of what we get back from the API.

`components/RssAtomSitemap.vue`

```
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
```

#### Update your routes
`router/index.js`

```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
...
import RssAtomSitemap from '@/components/RssAtomSitemap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    ...
    {
      path: '/rss',
      name: 'rss',
      component: RssAtomSitemap
    },
  ]
})
```

Navigate to `localhost:8080/rss`

We can see ButterCMS passes back the entire xml need to create a feed or sitemap. However, this demo page will not work for our subscribers. We need to create xml files they can link to in their RSS readers.

This can be a challenge for a static deployed site built using Vue that has dynamic content.

Fortunately ButterCMS has [Webhooks](https://buttercms.com/docs/api/#webhooks) that we can utilizing to POST change notifications.

#### Setup to create feeds and sitemap
Setup up a listener webhook on your hosting that will trigger a rebuild or redeploy of your static site when it receives a POST request.

Setup a POST Webhook in the ButterCMS dashboard with the Event "Blog Post Create, Update, or Delete" and paste the listener url into Target URL field.

![ButterCMS Webhooks](https://raw.githubusercontent.com/bmrankin/buttercms-vue-tutorial/master/ButterCMS-Webhooks.png "ButterCMS Webhooks")


#### Create a basic webpack plugin
We are using a plugin as part of our webpack build that to create the XML files and save them in the `/dist` folder.

>Learn more about [writing plugins for webpack](https://webpack.js.org/contribute/writing-a-plugin/)

Add the plugin to the webpack base config file by requiring it at the top of the file and then adding/updating the plugins array after the output object.

`build/webpack.base.conf.js`

```
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var BuildButterCmsXmlPlugin = require('./BuildButterCmsXmlPlugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    new BuildButterCmsXmlPlugin()
  ],
  resolve: {
  ...
```

Create the plugin file in the build directory

`build/BuildButterCmsXmlPlugin.js`

```
let fs = require('fs')
let path = require('path')
let Butter = require('buttercms')

function BuildButterCmsXmlPlugin() {}

BuildButterCmsXmlPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', () => {
    const butter = Butter('your_api_token')

    function getRss() {
      var rss
      butter.feed.retrieve('rss').then((res) => {
        rss = res.data.data
        fs.writeFileSync(
          path.resolve('dist/rss.xml'),
          rss
        )
      })
    }

    function getAtom() {
      var atom
      butter.feed.retrieve('atom').then((res) => {
        atom = res.data.data
        fs.writeFileSync(
          path.resolve('dist/atom.xml'),
          atom
        )
      })
    }

    function getSitemap() {
      var sitemap
      butter.feed.retrieve('sitemap').then((res) => {
        sitemap = res.data.data
        fs.writeFileSync(
          path.resolve('dist/sitemap.xml'),
          sitemap
        )
      })
    }
    getRss()
    getAtom()
    getSitemap()
  })
}

module.exports = BuildButterCmsXmlPlugin
```

Now whenever we run `npm run dev` or `npm run build` we should see our feeds and sitemap XML's created in our `/dist` folder.

This means also that whenever the webhook makes a POST request to our host anytime we create, update or delete a post, our site is redeployed with updated feeds and sitemap.
