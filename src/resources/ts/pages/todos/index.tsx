import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import FlashMessage from '../../components/FlashMessage';
import { Todo } from '../../models/Todo';

const TodoIndex: React.FC = () => {
  const location = useLocation()
  const [loadStatus, setLoadStatus] = useState<string>('loading')
  const [todos, setTodos] = useState<Todo[]>([])
  const [flashType, setFlashType] = useState<string>('')
  const [flashMessage, setFlashMessage] = useState<string>('')

  const getTodos = async () => {
    const { data, status } = await axios.get('/api/todos');
    if (status === 200) {
      setTodos(data.todos)
      setLoadStatus('success')
    } else {
      setLoadStatus('error')
    }
  }

  const getFlashMessage = () => {
    if (location?.state) {
      setFlashType(location?.state.flash_type)
      setFlashMessage(location?.state.flash_message)
    }
  }

  useEffect(() => {
    getTodos();
    getFlashMessage();
  }, [])

  if (loadStatus === 'loading') {
    return <div className='text-center'>loading...</div>
  } else if (loadStatus === 'error') {
    return <div className='text-center'>エラーが発生しました</div>
  }

  return (
    <>
      <h1 className='page-title'>Todo一覧</h1>
      <FlashMessage type={flashType} message={flashMessage} />
      <div className='table-area'>
        <div className='table-header'>
          <Link to={`/todos/create`} className='btn btn-info btn-default'>新規登録</Link>
        </div>
        <table className='table table-hover'>
          <thead className='table-dark'>
            <tr>
              <th>ID</th>
              <th>タイトル</th>
              <th>登録日時</th>
              <th>詳細</th>
              <th>編集</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            { todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.created_at.toString()}</td>
                <td>
                  <Link to={`/todos/${todo.id}`} className='btn btn-primary btn-default'>詳細</Link>
                </td>
                <td>
                  <Link to={`/todos/${todo.id}/edit`} className='btn btn-success btn-default'>編集</Link>
                </td>
                <td>
                  <button className='btn btn-danger btn-default'>削除</button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TodoIndex;