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

const filterByUnits = (options) => (decl) =>
  shouldIncludeOrExclude(
    ifUnitHasWildCard(
      R.T,
      R.pipe(
        getUnits,
        convertToPredicateFn,
        R.applyTo(decl)
      )
    ),
    ifUnitHasWildCard(
      R.F,
      R.pipe(
        getUnits,
        convertToPredicateFn,
        R.complement(R.applyTo(decl))
      )
    )
  )(options)

export {
  getValue,
  filterByUnits
}
