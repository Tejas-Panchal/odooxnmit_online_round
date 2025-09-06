import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import Mytask_view from './pages/Mytask_view'
import NewProject from './pages/NewProject'
import NewTask from './pages/NewTask'
import Project_Dashboard from './pages/Project_Dashboard'
import Task_Dashboard from './pages/Task_Dashboard'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/mytask-view' element={<Mytask_view />} />
          <Route path='/new-project' element={<NewProject />} />
          <Route path='/new-task' element={<NewTask />} />
          <Route path='/project-dashboard' element={<Project_Dashboard />} />
          <Route path='/task-dashboard' element={<Task_Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App