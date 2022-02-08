import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'


const store = createStore(
  notificationReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))