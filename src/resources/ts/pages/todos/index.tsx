import React from 'react';
import { Link } from 'react-router-dom';

const TodoIndex = () => {
  return (
    <div>
      <h1>Todo一覧</h1>
      <Link to={`/`}>Topへ</Link>
    </div>
  );
}

export default TodoIndex;