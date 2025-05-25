import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer} from 'react-toastify'
const App = () => {
  const url = "http://localhost:4000"

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
<div className="main-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
</div>
<ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default App;
