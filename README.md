# PostCSS Sparrow Units Filter

A PostCSS Sparrow plugin that helps you **search CSS declarations** by **units**. Avoid the hassle of reinventing the wheel and filter selectors you want again when you create a new PostCSS plugin.

## Made in Hong Kong :free: :free:

This plugin is made with love by a Hong Konger.

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
