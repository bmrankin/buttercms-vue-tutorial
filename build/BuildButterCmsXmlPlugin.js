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
