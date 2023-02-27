import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Top from './pages/top';
import TodoIndex from './pages/todos/index';
import TodoCreate from './pages/todos/create';
import TodoShow from './pages/todos/show';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/todos' element={<TodoIndex />} />
          <Route path='/todos/create' element={<TodoCreate />} />
          <Route path='/todos/:id' element={<TodoShow />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;