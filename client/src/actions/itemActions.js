import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import { serverURL } from '../config/Keys'
import axios from 'axios'
import { tokenConfig } from './authAction'
import { returnErrors } from './errorAction'

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
    .catch(err => dispatch(returnErrors(err.res.data, err.res.status)))
}

export const addItem = (item) => (dispatch, getState) =>
{
  axios.post(serverURL + '/api/items', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }))
    .catch(err => dispatch(returnErrors(err.res.data, err.res.status)))
}

export const deleteItem = (id) => (dispatch, getState) =>
{
  axios.delete(serverURL + `/api/items/${id}`, tokenConfig(getState))
    .then(res =>
    {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    })
    .catch(err => dispatch(returnErrors(err.res.data  , err.res.status)))
}

export const setItemsLoading = () =>
{
  return {
    type: ITEMS_LOADING
  }
}
