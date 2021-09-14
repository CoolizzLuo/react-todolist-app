import styled from 'styled-components'
import useInput from '../hooks/useInput'


const TodoItemWrapper = styled.li`
  margin: 0 -3rem 4px;
  padding: 1.1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`

const TodoItemContent = styled.div`
  max-width: 65%;
  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    word-break: break-all;
    &.done {
      opacity: 0.4;
      text-decoration: line-through;
    }
  }
  input {
    max-width: 90%;
    font-size: 1.1rem;
    padding: 0.1rem;
  }
`

const TodoItemAction = styled.div`
  display: flex;
  align-items: center;
  button {
    outline: none;
    border: none;
    background: transparent;
    margin: 0 0.5rem;
    color: #fff;
    font-size: 1.5rem;
    margin-top: -0.4rem;
    cursor: pointer;
    &:first-child {
      transform: translateY(2%) scale(1.05);
    }
    &:last-child {
      transform: translateY(-1%) scale(1.05);
    }
    &:hover {
      transform: scale(1.2);
    }
  }
`

const TodoItem = ({ todo, editing, setEditing, updateTodo, changeDoneTodo, deleteTodo }) => {
  const isEditing = editing === todo.id

  const TodoEditing = () => {
    const { value, setValue, handleChange } = useInput(todo.content)

    const update = () => {
      if (!value.trim()) return alert('must be have input value')
      if (!window.confirm('sure update todo ?')) return
      updateTodo(todo.id, value)
      setValue('')
      setEditing(null)
    }
    const handleCancel = () => window.confirm('sure give editing ?') && setEditing(null)

    const handleInputKeyUp = (e) => {
      if (e.key === 'Enter') return update()
      if (e.key === 'Escape') return handleCancel()
    }

    return (
      <>
        <TodoItemContent>
          <input type="text" value={ value } onChange={ handleChange } onKeyUp={ handleInputKeyUp } />
        </TodoItemContent>
        <TodoItemAction>
          <button onClick={ update }><i className="fa fa-check"></i></button>
          <button onClick={ handleCancel }><i className="fa fa-close"></i></button>
        </TodoItemAction>
      </>
    )
  }

  const TodoShowing = () => {
    const handleSetEdit = () => ((!editing) || (!isEditing && window.confirm('give up editing ?'))) && setEditing(todo.id)
    const handleChangeDone = () => changeDoneTodo(todo.id)
    const handleDeleteTodo = () => (window.confirm(`sure delete this todo: ${todo.content}`) && deleteTodo(todo.id))

    return (
      <>
        <TodoItemContent>
          <h3 className={ todo.isDone ? 'done' : ''}>{ todo.content }</h3>
        </TodoItemContent>
        <TodoItemAction>
          <button onClick={ handleSetEdit }><i className="fa fa-edit"></i></button>
          <button onClick={ handleChangeDone }>
            {todo.isDone ? <i className="fa fa-check-square"></i> : <i className="fa fa-square"></i>}
          </button>
          <button onClick={ handleDeleteTodo }><i className="fa fa-trash"></i></button>
        </TodoItemAction>
      </>
    )
  }

  return(
    <TodoItemWrapper>
      { isEditing ? <TodoEditing/> : <TodoShowing/> }
    </TodoItemWrapper>
  )
}

export default TodoItem