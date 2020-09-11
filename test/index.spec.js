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
      display: none;
      font-family: san-serif;
    }

    a{
      letter-spacing: 20px;
      line-height: 3;
      color: #be132d;
      border: 2px solid #f5f5f5;
    }`

    const beforeTransformation = postcss
      .parse(css, {
        from: undefined
      })
  })

  afterEach(function () {
    sinon.restore()
  })

  describe('if wildcard is used', function () {
    describe('if inclusion is set to true', function () {
      it('all declarations with unit should be selected', async function () {
        const spy = sinon.spy()

        const options = {
          transformations: [
            {
              selectors: ['*'],
              inclusion: true,
              callbacks: [
                require('../src/index.js').default({
                  units: ['*'],
                  inclusion: true,
                  callbacks: [
                    (v) => {
                      spy()
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

        const declAmount = R.reduce(
          (acc, value) => R.pipe(
            R.prop('nodes'),
            R.prop('length'),
            R.add(acc)
          )(value)
        )(0)(result.root.nodes)

        expect(spy.callCount).to.not.equal(declAmount)
        expect(spy.callCount).to.equal(2) // Only 2 rules with unit
      })
    })
  })
})
