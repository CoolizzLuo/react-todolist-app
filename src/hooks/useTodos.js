import { useState, useEffect, useMemo } from 'react'
import { v4 } from 'uuid'

const useTodos = (initialValue = [], localStorageKey = 'todos') => {
  const [filterValue, setFilterValue] = useState('All')
  const [todos, setTodos] = useState(() => {
    try {
      const item = window.localStorage.getItem(localStorageKey)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => window.localStorage.setItem(localStorageKey, JSON.stringify(todos)))

  const handleAddTodo = (todoContent) => {
    setTodos([
      {
        id: v4(),
        content: todoContent,
        isDone: false
      },
      ...todos
    ])
  }

  const handleUpdateTodo = (id, newContent) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        content: newContent
      }
    }))
  }

  const handleChangeDoneTodo = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  
  const filterTodos = useMemo(() => {
    const options = {
      All: todo => todo,
      Done: todo => todo.isDone,
      Todo: todo => !todo.isDone
    }
    return todos.filter(options[filterValue])
  }, [filterValue, todos])

  return {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
    handleAddTodo,
    handleUpdateTodo,
    handleChangeDoneTodo,
    handleDeleteTodo,
    filterTodos
  }
}

export default useTodos
