Contributing
============

This repository is the KEEER Vote main repo. This is going to be published on GitHub,
so everything except issues and PRs are going to be in English.

## Notices

- Keep the project structure in dictionary order.
- Follow Git commit message guidlines.

## Project structure

- `dist/` Distributions. Never remove `vote-config.js`.
- `src/` Main source directory
    - `plugins/` Plugins
    - `themes/` Themes
    - `sql/` SQLs for reference
    - `db.js` Database helper
    - `form.js` Form utils
    - `index.js` Entry point
    - `loadPlugins.js` [Not executed] A file to be included in `_bundle`
    - `log.js` Logging utils
    - `main.js` Koa application
    - `plugin.js` Plugin utils
    - `question.js` Question utils
    - `theme.js` Theme utils
- `static/` Static files (e.g. ToC)

## Building

`npm run build`

## webpack-dev-server

`npm run dev`

## ESLint

`npm run lint`