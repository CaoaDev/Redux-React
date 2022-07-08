import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import App from './App'

let store = createStore((state = {lala:1}, action) => { // es un reducer!!
  // action = { type: 'tipo de accion', payload: 'cualquier de dato' opcional* }
  console.log({ state, action })
  switch (action.type) {
    case 'accion': {
      return action.payload
    }
  }
  return state
})

store.dispatch({ type: 'accion', payload: 2 })
store.dispatch({ type: 'accion2', payload: 4 })
console.log( store.getState() )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
