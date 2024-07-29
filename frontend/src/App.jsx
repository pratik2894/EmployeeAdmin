import { useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import EmployeeList from './Components/Employeelist/Employeelist';
import EditEmployee from './Components/EditEmployee/EditEmployee';
import CreateEmployee from './Components/CreateEmployee/CreateEmployee';
import Dashboard from './Components/Dashboard/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeProfile from './Components/EmployeeProfile/EmployeProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<EmployeeList />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/" element={<Login />} />
        <Route path="/list/:id" element={<EmployeeProfile/>} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
