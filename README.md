# PostCSS Sparrow Units Filter

[![Known Vulnerabilities](https://snyk.io/test/github/winston0410/postcss-sparrow-units-filter/badge.svg?targetFile=package.json)](https://snyk.io/test/github/winston0410/postcss-sparrow-units-filter?targetFile=package.json) [![Maintainability](https://api.codeclimate.com/v1/badges/7598a43da13cbf471577/maintainability)](https://codeclimate.com/github/winston0410/postcss-sparrow-units-filter/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/7598a43da13cbf471577/test_coverage)](https://codeclimate.com/github/winston0410/postcss-sparrow-units-filter/test_coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/b1aed991addf4edbaff9fca984269803)](https://www.codacy.com/manual/winston0410/postcss-sparrow-units-filter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=winston0410/postcss-sparrow-units-filter&amp;utm_campaign=Badge_Grade)

A PostCSS Sparrow plugin that helps you **search CSS declarations** by **units**.

This plugin is designed to be used with [PostCSS Sparrow](https://www.npmjs.com/package/postcss-sparrow), which helps you filter CSS declarations by **selectors**.  By using these two plugins together, you can **easily get the declarations you need**.

## Made in Hong Kong :free: :free:

This plugin is made with love by a Hong Konger.

## Installation

This plugin require you to use [PostCSS Sparrow](https://www.npmjs.com/package/postcss-sparrow) for matching with selectors you want.

Download both `postcss-sparrow` and this plugin through NPM.

```shell

npm i postcss-sparrow postcss-sparrow-units-filter

```

Then import this plugin as the callback for [PostCSS Sparrow](https://www.npmjs.com/package/postcss-sparrow).

```javascript
//postcss.config.js
module.exports = {
  plugins: [
    //Other plugins...

    require('postcss-sparrow')({
      transformations: [
        {
          selectors: ['*'],
          inclusion: true,
          callbacks: [
            require('postcss-sparrow-units-filter')(
              {
                units: [],
                inclusion: true,
                callbacks: [
                  //Do transformation here with your own callback functions
                  (decl) => {
                    decl.remove()
                  }
                ]
              }
            )
          ]
        }
      ]
    })
  ]
}
```

## API Reference

### `options.units` : Array

An array of units that you want to match with. Use `*` as wildcard and select all units.

### `options.inclusion` : Boolean

True for including and False for excluding selectors listed in `options.units`.

### `options.callbacks` : Array

An array of callbacks that you use to transform the selected declarations.  The selected declaration will be passed in as an argument.
