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
      <main>
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/todos' element={<TodoIndex />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;