import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Top from './pages/top';
import TodoIndex from './pages/todos/index';
import Header from './components/Header'
import Footer from './components/Footer'

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Top />} />
        <Route path='/todos' element={<TodoIndex />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;