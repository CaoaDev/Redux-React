import React from 'react'
import ReactDOM from 'react-dom/client'
// import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App' // no es buena practica poner el reducer es solo para la practica
import { asyncMiddleware } from './midleware/async'
import { reducer } from './features/todos'


// const store = configureStore({reducer}, applyMiddleware(asyncMiddleware))
const store = createStore(reducer, applyMiddleware(asyncMiddleware))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
