const assert = require('assert')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')

const panelWxml = read('components/housing-match-panel/housing-match-panel.wxml')
const panelJs = read('components/housing-match-panel/housing-match-panel.js')
const indexWxml = read('pages/index/index.wxml')
const indexJs = read('pages/index/index.js')

assert(
  panelWxml.includes('bindtap="onCategoryTap"'),
  'housing-match-panel should bind category taps'
)
assert(
  panelJs.includes("this.triggerEvent('categorytap'"),
  'housing-match-panel should emit categorytap'
)
assert(
  indexWxml.includes('bind:categorytap="onHousingCategoryTap"'),
  'index page should listen for housing category taps'
)
assert(
  indexJs.includes("type === 'lease'") && indexJs.includes('/pages/publish-house/publish-house'),
  'index page should route lease category to publish-house'
)

console.log('housing-match-routing tests passed')
