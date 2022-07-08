import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThunk, setFilter, setComplete, selecTodos, selecStatus } from './features/todos'

// se comenta el reducer por que lo haremos por medio de combineReducers
// export const reducer = (state = initialState, action) => {
//   return {
//     entities: todoReducer(state.entities, action),
//     filter: filterReducer(state.filter, action)
//   }
// }

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()

  return (
    <li
      style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}
      onClick={() => dispatch(setComplete(todo))}>
      {todo.title}
    </li>
  )
}

const App = () => {
  const [value, setvalue] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector( selecTodos )
  const status = useSelector( selecStatus )

  const submit = e => {
    e.preventDefault()
    if (!value.trim()) {
      return
    }
    const id = Math.random().toString(36)
    const todo = { title: value, complete: false, id}
    dispatch({ type: 'todo/add', payload: todo })
    setvalue('')
  }

  if (status.loading === 'pending') {
    return <p>Cargando...</p>
  }
  if (status.loading === 'rejected') {
    return <p>Error: {status.error}</p>
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setvalue(e.target.value)} />
      </form>
      <button onClick={() => dispatch(setFilter('all'))}>Mostrar todo</button>
      <button onClick={() => dispatch(setFilter('complete'))}>Completados</button>
      <button onClick={() => dispatch(setFilter('incomplete'))}>Incompletos</button>
      <button onClick={() => dispatch(fetchThunk())}>Fetch</button>
      <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  )
}

export default App
