import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import { serverURL } from '../../config/Keys'
import axios from 'axios'

export const getItems = () => dispatch =>
{
  dispatch(setItemsLoading())

  axios({
    method: 'get',
    url: serverURL + '/api/items',
  })
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      }))
    .catch(err => console.log(err))
}

export const addItem = (item) => dispatch =>
{
  axios({
    method: 'post',
    url: serverURL + '/api/items',
    headers: {
      'Context-type': 'application/json'
    },
    data: item
  })
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
}

export const deleteItem = (id) => dispatch =>
{
  axios({
    method: 'delete',
    url: serverURL + `/api/items/${id}`
  })
    .then(res =>
    {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    })
}

export const setItemsLoading = () =>
{
  return {
    type: ITEMS_LOADING
  }
}
