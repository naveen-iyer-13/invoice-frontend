import axios from 'axios'
export const getDetails = (dataSet) => {
  return {
    type: 'GET_DATA',
    dataSet: dataSet
  }
}

export const setDetails = (data) => {
  return {
    type: 'SET_DATA',
    data: data
  }
}

export const setData = (data) => {
  return (dispatch) =>{
    dispatch(setDetails(data))
  }
}

export const getData = () => {
  return (dispatch) =>{
    axios('https://fathomless-everglades-46245.herokuapp.com/invoices').then((res) => {
      dispatch(getDetails(res.data))
    })
  }

}

// export const refetchData = () => {
//   return (dispatch) => setInterval(dispatch(getData()), 100)
// }
