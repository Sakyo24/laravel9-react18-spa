import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoCreate: React.FC = () => {
  const navigate = useNavigate()
  const [saveStatus, setSaveStatus] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')
  const [detailError, setDetailError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaveStatus('saving')

    await axios.post('/api/todos', {
      title: title,
      detail: detail
    })
    .then((response) => {
      setSaveStatus('')
      setTitle('')
      setDetail('')
      setTitleError('')
      setDetailError('')
      navigate('/todos', {state: {flash_type: 'success' ,flash_message: 'Todoを登録しました'}})
    })
    .catch((error) => {
      if (error.response.status === 422) {
        setSaveStatus('')
        setTitleError('')
        setDetailError('')
        let validation_errors = error.response.data.errors
        validation_errors.title ? setTitleError(validation_errors.title[0]) : false
        validation_errors.detail ? setDetailError(validation_errors.detail[0]) : false
      } else {
        setSaveStatus('error')
      }
    })
  }

  if (saveStatus === 'saving') {
    return <div className='text-center'>saving...</div>
  } else if (saveStatus === 'error') {
    return <div className='text-center'>エラーが発生しました</div>
  }

  return (
    <>
      <h1 className='page-title'>Todo新規登録</h1>
      <form className='table-area' onSubmit={handleSubmit}>
        <table className='table table-hover'>
          <tbody>
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
          </tbody>
        </table>
        <div className='table-footer'>
          <Link to={`/todos`} className='btn btn-primary btn-default'>一覧</Link>
          <button className='btn btn-info btn-default'>新規登録</button>
        </div>
      </form>
    </>
  );
}

export default TodoCreate;