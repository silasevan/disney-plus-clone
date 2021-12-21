import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Header from './components/Header';
import Home from './components/Home'
import Detail from './components/Detail';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/login'caseSensitive={false} element={<Login />}></Route>
          <Route path='/detail/:id'caseSensitive={false} element={<Detail />}>
          </Route>
          <Route path='/'caseSensitive={false} element={<Home />}>
          </Route>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
