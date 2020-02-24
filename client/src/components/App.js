import React, { Component } from 'react'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Container } from 'reactstrap'

import AppNavbar from './AppNavbar'
import ShoppingList from './ShoppingList'
import ItemModal from './ItemModal'

import { loadUser } from '../actions/authAction'

import store from '../store'

class App extends Component
{
  componentDidMount()
  {
    store.dispatch(loadUser())
  }

  render()
  {
    return (
      <Provider store={store}>
        <div>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />            
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App
