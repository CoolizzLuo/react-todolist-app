import { useState } from 'react'
import styled from 'styled-components'
import TodoInput from './TodoInput'
import TodoFilterButton from './TodoFilterButton'
import TodoItem from './TodoItem'
import useTodos from '../hooks/useTodos'

const TodoItemList = styled.ul`
  margin: 3rem 0 1.5rem;
`

const TodoLen = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`

const initialTodo = [
  { id: 'c6411e9a-ac4b-4368-855c-9ca633961355', content: 'demo todo', isDone: false },
  { id: '4f43e6d4-7f55-5c7a-bd13-644917c3c821', content: 'demo working', isDone: true },
  { id: 'a3915a55-da1c-46a4-bf4f-9cb6e8172f56', content: 'demo cooking', isDone: false }
]

const TodoApp = () => {
  const [editing, setEditing] = useState(null); 
  const {
    filterValue,
    setFilterValue,
    handleAddTodo,
    handleUpdateTodo,
    handleChangeDoneTodo,
    handleDeleteTodo,
    filterTodos
  } = useTodos(initialTodo)

  const handleInputAdd = (value) => editing ? alert('please complete your editing') : handleAddTodo(value)

  return (
    <>
      <TodoInput addTodo={ handleInputAdd } />
      <TodoFilterButton filterValue={ filterValue } setFilter={ setFilterValue } />
      <TodoItemList>
        {
          filterTodos.map((todo) => <TodoItem 
            key= { todo.id }
            todo={ todo } 
            editing= { editing } 
            setEditing={ setEditing }
            updateTodo={ handleUpdateTodo } 
            changeDoneTodo={ handleChangeDoneTodo } 
            deleteTodo={ handleDeleteTodo } />
          )
        }
      </TodoItemList>
      <TodoLen>total: { filterTodos.length }</TodoLen>
    </>
  )
}

export default TodoApp;