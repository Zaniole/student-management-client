import { useEffect, useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Attendance from './Components/Attendance'
import Student from './Components/Student'
import Class from './Components/Class'
import AddClass from './Components/Add/AddClass'
import AddStudent from './Components/Add/AddStudent'
import AddAbsent from './Components/Add/AddAbsent'
import AbsentDetail from './Components/AbsentDetail'
import StudentDetail from './Components/Student/StudentDetail'
import ClassDetail from './Components/Class/ClassDetail'
import PrivateRoutes from './Components/PrivateRoutes'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard/home' element={<Home />}></Route>
              <Route path='/dashboard/attendance' element={<Attendance />}></Route>
              <Route path='/dashboard/student' element={<Student />}></Route>
              <Route path='/dashboard/class' element={<Class />}></Route>
              <Route path='/dashboard/classDetail/:id/:className' element={<ClassDetail />}></Route>
              <Route path='/dashboard/addClass' element={<AddClass />}></Route>
              <Route path='/dashboard/addStudent' element={<AddStudent />}></Route>
              <Route path='/dashboard/addAbsent' element={<AddAbsent />}></Route>
              <Route path='/dashboard/absentDetail/:id' element={<AbsentDetail />}></Route>
              <Route path='/dashboard/studentDetail/:id' element={<StudentDetail />}></Route>
            </Route>
          </Route>
          <Route path='/' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
