import {
  getUnits
} from './partial-functions/unit.js'

import {
  hasWildCard
} from './partial-functions/wildcard.js'

import {
  getValue
} from './partial-functions/value.js'

import * as R from 'ramda'

const shouldIncludeOrExclude = R.ifElse(
  R.propEq('inclusion', true)
)

const ifUnitHasWildCard = R.ifElse(
  R.pipe(
    getUnits,
    hasWildCard
  )
)

const convertToRegex = (unit) => new RegExp(`${unit}$`)

const convertToPredicateFn = R.pipe(
  R.map(convertToRegex),
  R.map(R.test),
  R.anyPass
)

const unitList = [
  'px', 'fr', '%', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'ch'
]

const getAllUnits = R.always(unitList)

const filterByUnits = (options) => (decl) =>
  R.pipe(
    ifUnitHasWildCard(
      getAllUnits,
      getUnits
    ),
    convertToPredicateFn,
    (predicate) => shouldIncludeOrExclude(
      () => R.applyTo(decl)(predicate),
      () => R.complement(R.applyTo(decl))(predicate)
    )(options)
  )(options)

export {
  getValue,
  filterByUnits
}
