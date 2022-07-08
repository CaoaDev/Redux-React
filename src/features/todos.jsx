import { combineReducers } from "@reduxjs/toolkit";
import { mac, mat, asyncMac, makeFetchInReducer, makeSetReducer, reducerReducers, makeCrudReducer } from './utils'

const asyncTodos = mat('todos')

const [setPending, setFullFilled, setError] = asyncMac(asyncTodos)

// export const setPending = mac('todos/pending')
// export const setFullFilled = mac('todos/fullfilled', 'payload')
// export const setError = mac('todo/error', 'error')
export const setComplete = mac('todo/complete', 'payload')
export const setFilter = mac('filter/set', 'payload')

export const fetchThunk = () => async dispatch => {
  dispatch(setPending())
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    const todos = data.slice(0, 10)
    dispatch(setFullFilled(todos))
  } catch (e) {
    dispatch(setError())
  }
}

export const filterReducer = makeSetReducer(['filter/set'])

export const fetchIngReducer = makeFetchInReducer(asyncTodos)

const fullfilledReducer = makeSetReducer(['todos/fullfilled'])

const crudReducer = makeCrudReducer([
  'todo/add',
  'todo/complete'
])

export const todosReducers = reducerReducers(crudReducer, fullfilledReducer)

export const reducer = combineReducers({
  todos: combineReducers({
    entities: todosReducers,
    status: fetchIngReducer,
  }),
  filter: filterReducer,
})

export const selecTodos = state => {
  const { todos: { entities }, filter } = state

  if (filter === 'complete') {
    return entities.filter(todo => todo.complete)
  }
  if (filter === 'incomplete') {
    return entities.filter(todo => !todo.complete)
  }
  return entities
}

export const selecStatus = state => state.todos.status
