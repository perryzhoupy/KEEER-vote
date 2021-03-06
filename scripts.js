const fs = require('fs-extra')
const path = require('path')

const script = process.argv[2]
if (!script) {
  console.log('Usage: node ./scripts <script>')
  process.exit(1)
}

const fns = {
  clean () {
    fs.removeSync('dist/js')
    fs.removeSync('dist/css')
    fs.removeSync('dist.tgz')
    fs.removeSync('dist/compat.json')
    fs.removeSync('dist/build.json')
    fs.removeSync('lib')

    try {
      const htmlFiles = fs.readdirSync('dist').filter(f => f.endsWith('.html'))
      for (const f of htmlFiles) fs.removeSync(`dist/${f}`)
      // eslint-disable-next-line no-empty
    } catch (e) {}
  },

  'clean:cache' () {
    fs.removeSync('.webpack-cache')
  },

  async pack () {
    const tar = require('tar')
    try {
      const htmlFiles = fs.readdirSync('dist').filter(f => f.endsWith('.html')).map(f => `dist/${f}`)
      const files = process.env.PUBLIC_PATH ? [ ...htmlFiles, 'dist/build.json', 'lib' ] : [ 'dist/js', 'dist/css', 'lib', ...htmlFiles ]
      await tar.c({ gzip: true, file: 'dist.tgz' }, files)
    } catch (e) {
      console.log(`Failed creating pack: ${e}`)
      process.exit(-1)
    }
  },

  'kas-mock' () {
    const Koa = require('koa')
    const Router = require('koa-router')
    const app = new Koa()
    const router = new Router()
    app.use(router.routes()).use(router.allowedMethods())
    router.post('/api/auth/query_information', ctx => {
      console.log('query-information')
      ctx.set('Access-Control-Allow-Origin', '*')
      // I have no idea why KAS responses are so ugly
      ctx.body = {
        status: 0,
        result: {
          status: 0,
          result: {
            avatar: 'https://keeer.net/img/logo/dark-square.jpg',
            nickname: 'KEEER',
            keeer_id: 'keeer',
          },
        },
      }
    })
    router.post('/api/auth/examine_token', ctx => ctx.body = {
      status: 0,
      result: { status: 0 },
    })
    app.listen(8081)
    console.log('Listening on http://localhost:8081/')
  },

  async 'build:html' () {
    const ejs = require('ejs')
    const { messages } = require('./locale')
    const languages = Object.keys(messages)
    let lang
    const $t = m => {
      const slices = m.split('.')
      let message = messages[lang]
      for (const s of slices) message = message[s] || m
      return message
    }
    const ejsEntries = [ 'index', 'set-id', '404', '500' ]
    const data = { $t }
    const opts = {
      root: './ejs',
      rmWhitespace: true,
      async: true,
    }
    for (const entry of ejsEntries) {
      for (lang of languages) {
        fs.writeFileSync(`./dist/${lang}-${entry}.html`, await ejs.renderFile(`./ejs/${entry}.ejs`, data, opts))
      }
    }
  },

  'build:compat' () {
    require('./src/bootstrap')(true)
    const plugins = require('./src/plugin').plugins
    const themes = require('./src/theme').themes
    const Form = require('./src/form').Form
    const form = new Form({ pages: [] })
    const requiredPlugins = plugins.filter(p => p.config.required)
    const nonRequiredPlugins = plugins.filter(p => !p.config.required)
    const objectsToDfs = [ ...nonRequiredPlugins, ...themes ]
    const table = {}
    const sort = ([ theme, ...plugin ]) => ([ theme, ...plugin.sort((a, b) => plugins.indexOf(a) - plugins.indexOf(b)) ])
    const stringify = ([ theme, ...plugin ]) => ([ `theme:${theme.config.code}`, ...plugin.map(o => o.config.code) ].join('/'))
    const dfs = (base = [ themes.find(t => t.config.default), ...requiredPlugins ]) => {
      base = sort(base)
      const stringBase = stringify(base)
      console.log('[dfs]', stringBase)
      const [ baseTheme, ...basePlugins ] = base
      for (const object of objectsToDfs) {
        form.options.plugins = basePlugins
        form.options.theme = baseTheme.config.code
        if (!table[stringBase]) table[stringBase] = []
        if (table[stringBase].includes(object)) continue
        const contains = base.includes(object)
        if (!contains && form.isApplicable(object)) {
          table[stringBase].push(object)
          if (object.is === 'theme') {
            dfs([ object, ...basePlugins ])
          } else if (object.is === 'plugin') {
            dfs([ ...base, object ])
          }
        }
        if (contains && object.is === 'plugin' && !form.isRequired(object)) {
          table[stringBase].push(object)
          dfs([ baseTheme, ...basePlugins.filter(p => p !== object) ])
        }
      }
    }
    dfs()
    for (const k in table) table[k] = table[k].map(o => o.is === 'theme' ? `theme:${o.config.code}` : o.config.code).join('/')
    require('fs-extra').ensureDirSync('dist')
    require('fs').writeFileSync('dist/compat.json', JSON.stringify(table))
  },

  async 'build:meta' () {
    await fs.ensureDir('dist')
    await fs.writeFile('dist/build.json', JSON.stringify({
      js: await fs.readdir('dist/js'),
      css: await fs.readdir('dist/css'),
    }))
  },

  async 'deploy-oss' () {
    const oss = require('ali-oss')
    const cfg = {
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      region: process.env.REGION,
      bucket: process.env.BUCKET,
    }
    if (Object.values(cfg).some(x => typeof x !== 'string')) throw new Error('Invalid config')
    const store = new oss(cfg)
    const deploy = async (localPath, remotePath) => {
      for (const file of await fs.readdir(localPath)) {
        await store.put(path.join(remotePath, file), path.join(localPath, file), {
          headers: { 'Cache-Control': 'public, max-age=31536000' },
        })
      }
    }
    await deploy(path.resolve(__dirname, 'dist/js'), 'js')
    await deploy(path.resolve(__dirname, 'dist/css'), 'css')
  },
}

if (!(script in fns)) {
  console.log(`Script ${script} not found. All scripts:`)
  console.log(Object.keys(fns).join(', '))
  process.exit(1)
}

;(async () => {
  try { await fns[script]() } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
