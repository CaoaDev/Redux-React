import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

const initialState = {
  entities: [],
  filter: 'all', //complete // incomplete
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'todo/add': {
      return {
        ...state,
        entities: state.entities.concat({ ...action.payload })
      }
    }
     case 'todo/complete': {
      const newTodos = state.entities.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
      return {
        ...state,
        entities: newTodos
      }
    }
    case 'filter/set': {
      return {
        ...state,
        filter: action.payload
      }
    }
  }
  return state
}

const SelecTodos = state => {
  const { entities, filter } = state

  if (filter === 'complete') {
    return entities.filter(todo => todo.complete)
  }
  if (filter === 'incomplete') {
    return entities.filter(todo => !todo.complete)
  }
  return entities
}

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()

  return (
    <li
      style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}
      onClick={() => dispatch({ type: 'todo/complete', payload: todo })}>
      {todo.title}
    </li>
  )
}

const App = () => {
  const [value, setvalue] = useState('')
  const dispatch = useDispatch()
  const Todos = useSelector( SelecTodos )
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

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setvalue(e.target.value)} />
      </form>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'all' })}>Mostrar todos</button>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'complete' })}>Completados</button>
      <button onClick={() => dispatch({ type: 'filter/set', payload: 'incomplete' })}>Incompletos</button>
      <ul>
        {Todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </ul>
    </div>
  )
}

export default App
