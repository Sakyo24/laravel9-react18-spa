import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 className='header-title'>
        <Link to={`/`}>Laravel9 React18 SPA</Link>
      </h1>

      <div className='header-btn-area'>
        <Link to={`/login`} className='btn btn-primary btn-default'>ログイン</Link>
      </div>
    </header>
  );
}

export default Header;