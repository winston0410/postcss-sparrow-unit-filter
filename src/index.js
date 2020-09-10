import * as R from 'ramda'

import {
  filterByUnits,
  getValue
} from './utilities/helper.js'

export default (options) => (decl) => R.when(
  R.pipe(
    getValue,
    filterByUnits(options)
  ),
  R.juxt(options.callbacks)
)(decl)
