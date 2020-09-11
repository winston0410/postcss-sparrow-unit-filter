import * as R from 'ramda'

const getUnits = R.prop('units')

const unitList = [
  'px', 'fr', '%', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'ch'
]

const getAllUnits = R.always(unitList)

export {
  getUnits,
  getAllUnits
}
