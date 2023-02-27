import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import FlashMessage from '../../components/FlashMessage';
import { Todo } from '../../models/Todo';

const TodoShow: React.FC = () => {
  const location = useLocation()
  const params = useParams()
  const [loadStatus, setLoadStatus] = useState<string>('loading')
  const [todo, setTodo] = useState<Todo|undefined>()
  const [flashType, setFlashType] = useState<string>('')
  const [flashMessage, setFlashMessage] = useState<string>('')

  const getTodo = async () => {
    const { data, status } = await axios.get('/api/todos/' + params.id);
    if (status === 200) {
      setTodo(data.todo)
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
    getTodo()
    getFlashMessage()
  }, [])

  if (loadStatus === 'loading') {
    return <div className='text-center'>loading...</div>
  } else if (loadStatus === 'error') {
    return <div className='text-center'>エラーが発生しました</div>
  }

  return (
    <>
      <h1 className='page-title'>Todo詳細</h1>
      <FlashMessage type={flashType} message={flashMessage} />
      <div className='table-area'>
        <table className='table table-hover'>
          <tbody>
            <tr>
              <th className='table-dark'>ID</th>
              <td>{todo?.id}</td>
            </tr>
            <tr>
              <th className='table-dark'>タイトル</th>
              <td>{todo?.title}</td>
            </tr>
            <tr>
              <th className='table-dark'>詳細</th>
              <td>{todo?.detail}</td>
            </tr>
            <tr>
              <th className='table-dark'>登録日時</th>
              <td>{todo?.created_at.toString()}</td>
            </tr>
            <tr>
              <th className='table-dark'>最終更新日時</th>
              <td>{todo?.updated_at.toString()}</td>
            </tr>
          </tbody>
        </table>
        <div className='table-footer'>
          <Link to={`/todos`} className='btn btn-primary btn-default'>一覧</Link>
          <Link to={`/todos/${todo?.id}/edit`} className='btn btn-success btn-default'>編集</Link>
        </div>
      </div>
    </>
  )
}

export default TodoShow;