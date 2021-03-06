/** @module plugin */
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { themes } from './theme'
import { isDev } from './is-dev'

/** Class representing a plugin. */
class Plugin {
  /**
   * Creates a plugin object.
   * @param {Object} config The configuration JSON object
   */
  constructor (config, attachTo) {
    this.is = 'plugin'
    this.config = config
    this.attachTo = attachTo || (() => {})
  }
}

// load plugins
let pluginDirs, plugins // eslint-disable-line import/no-mutable-exports
try {
  pluginDirs = fs.readdirSync(path.resolve(__dirname, 'plugins'))
} catch (e) {
  throw new Error(`Error reading plugin directories: ${e}`)
}
const { js, css } = require('../dist/build.json')

try {
  const pluginConfigs = pluginDirs.map(dir => {
    const pluginConfigBuffer = fs.readFileSync(path.resolve(__dirname, 'plugins', dir, 'plugin.yml'))
    return YAML.parse(pluginConfigBuffer.toString())
  })
  const injectionKeys = [ ...new Set(
    [ ...themes.map(t => t.config), ...pluginConfigs ]
      .flatMap(p => (p.provides || {}).injections || [])) ]
  plugins = pluginConfigs.map((plugin, i) => {
    plugin.uses = plugin.uses || {}
    plugin.uses.inject = plugin.uses.inject || {}
    plugin.inject = {}
    for (const k of injectionKeys) {
      const injections = plugin.uses.inject[k] || {}
      plugin.inject[k] = {}
      if (injections.js) {
        plugin.inject[k].jsPath = isDev ? injections.js + '.js' : js.find(f => f.startsWith(injections.js) && f.endsWith('.js'))
      }
      if (injections.css) {
        plugin.inject[k].cssPath = isDev ? injections.css + '.css' : css.find(f => f.startsWith(injections.css) && f.endsWith('.css'))
      }
    }
    let attachTo
    if (plugin.uses.inject.server) {
      attachTo = require(
        path.resolve(
          __dirname,
          'plugins',
          pluginDirs[i],
          plugin.uses.inject.server,
        )
      )
      if (typeof attachTo !== 'function') attachTo = attachTo.default
      if (typeof attachTo !== 'function') throw new TypeError(`plugin '${plugin.code}' has a non-function attachTo`)
    }
    return new Plugin(plugin, attachTo)
  })
} catch (e) {
  throw new Error(`Error parsing plugins: ${e.stack}`)
}

export default plugins
export {
  pluginDirs,
  plugins,
}
