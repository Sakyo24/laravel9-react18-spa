import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Todo } from '../../models/Todo';

const TodoEdit: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [loadStatus, setLoadStatus] = useState<string>('loading')
  const [updateStatus, setUpdateStatus] = useState<string>('')
  const [todo, setTodo] = useState<Todo|undefined>()
  const [title, setTitle] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')
  const [detailError, setDetailError] = useState<string>('')

  const getTodo = async () => {
    const { data, status } = await axios.get('/api/todos/' + params.id);
    if (status === 200) {
      setTodo(data.todo)
      setTitle(data.todo.title)
      setDetail(data.todo.detail)
      setLoadStatus('success')
    } else {
      setLoadStatus('error')
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdateStatus('updating')

    await axios.put('/api/todos/' + params.id, {
      title: title,
      detail: detail
    })
    .then((response) => {
      setUpdateStatus('')
      setTitle('')
      setDetail('')
      setTitleError('')
      setDetailError('')
      navigate('/todos/' + params.id, {state: {flash_type: 'success' ,flash_message: 'Todoを更新しました'}})
    })
    .catch((error) => {
      if (error.response.status === 422) {
        setUpdateStatus('')
        setTitleError('')
        setDetailError('')
        let validation_errors = error.response.data.errors
        validation_errors.title ? setTitleError(validation_errors.title[0]) : false
        validation_errors.detail ? setDetailError(validation_errors.detail[0]) : false
      } else {
        setUpdateStatus('error')
      }
    })
  }

  useEffect(() => {
    getTodo()
  }, [])

  if (loadStatus === 'loading') {
    return <div className='text-center'>loading...</div>
  } else if (updateStatus === 'updating') {
    return <div className='text-center'>updating</div>
  } else if (loadStatus === 'error' || updateStatus === 'error') {
    return <div className='text-center'>エラーが発生しました</div>
  }

  return (
    <>
      <h1 className='page-title'>Todo編集</h1>
      <form className='table-area' onSubmit={handleUpdate}>
        <table className='table table-hover'>
          <tbody>
            <tr>
              <th className='table-dark'>ID</th>
              <td>{todo?.id}</td>
            </tr>
            <tr>
              <th className='table-dark'>タイトル</th>
              <td>
                <input
                  type="text"
                  className='form-control'
                  placeholder='タイトル'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className='validation_message'>
                  { titleError ?? '' }
                </div>
              </td>
            </tr>
            <tr>
              <th className='table-dark'>詳細</th>
              <td>
                <textarea
                  className='form-control'
                  placeholder='詳細'
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
                <div className='validation_message'>
                  { detailError ?? '' }
                </div>
              </td>
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
          <button className='btn btn-success btn-default'>更新</button>
        </div>
      </form>
    </>
  )
}

export default TodoEdit;