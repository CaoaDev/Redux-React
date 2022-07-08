import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import App from './App'

let store = createStore((state = 0, action) => { // es un reducer!!
  // action = { type: 'tipo de accion', payload: 'cualquier de dato' opcional* }
  console.log({ state, action })
  switch (action.type) {
    case 'sumar': {
      return state + 2
    }
    case 'restar': {
      return state - 1
    }
    case 'set': {
      return action.payload
    }
    default:
      return state
  }
})

console.log( store.getState() )
store.dispatch({ type: 'accion', payload: 2 })
console.log( store.getState() )
store.dispatch({ type: 'sumar' })
console.log( store.getState() )
store.dispatch({ type: 'restar' })
console.log( store.getState() )
store.dispatch({ type: 'set', payload: 15 })
console.log( store.getState() )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
