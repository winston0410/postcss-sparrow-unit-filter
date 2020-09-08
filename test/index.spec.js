const postcss = require('postcss')
const sparrow = require('postcss-sparrow')
// const S = require('sanctuary')
const R = require('ramda')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect

describe('postcss-sparrow-unit-filter', function () {
  let css, beforeDeclCount

  beforeEach(function () {
    css = `
    body{
      padding: 5rem;
    }

    a{
      letter-spacing: 20px;
    }`

    const beforeTransformation = postcss
      .parse(css, {
        from: undefined
      })
  })

  describe('if letter-spacing is found', function () {
    it('text-indent with identical value should be appended', async function () {
      const options = {
        transformations: [
          {
            selectors: ['*'],
            inclusion: true,
            callbacks: [
              require('../src/index.js').default({
                units: ['px'],
                inclusion: false,
                callbacks: [
                  (v) => {
                    console.log(v)
                  }
                ]
              })
            ]
          }
        ]
      }

      const result = await postcss([
        sparrow(options)
      ])
        .process(css, {
          from: undefined
        })
    })
  })
})
