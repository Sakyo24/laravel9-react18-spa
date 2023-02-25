import React from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <div>
      <h1>Top</h1>
      <Link to={`todos`}>Todo一覧へ</Link>
    </div>
  );
}

export default Top;