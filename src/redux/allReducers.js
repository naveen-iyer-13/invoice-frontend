import { combineReducers } from 'redux'
import details from './eventsReducers'
import data from './eventsReducers'
import dataSet from './dataSetReducers'
// import visibilityFilter from './visibilityFilter'

const eventApp = combineReducers({
  dataSet : dataSet,
  data : data
})

export default eventApp
