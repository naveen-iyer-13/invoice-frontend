const updatingData = (state = [], action) => {
  switch (action.type) {
    case 'GET_DATA':
      return (
        action.dataSet
      )
    default:
      return state
  }
}

export default updatingData
