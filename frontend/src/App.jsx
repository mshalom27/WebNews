import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import  Home from './pages/Home'
import  SignInForm from './auth/forms/SignInForm'
import SignUpForm  from './auth/forms/SignUpForm'
import  NewsArticles  from './pages/NewsArticles'
import  AdminDashboard from './pages/AdminDashboard'
import Header from './components/shared/Header'

const App = () => {
  return (
   <BrowserRouter>
       <Header/>

   <Routes>
    <Route path='/sign-in' element={<SignInForm />} />
    <Route path='/sign-up' element={<SignUpForm />} />

    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/news-articles' element={<NewsArticles />} />
    <Route path='/admin-dashboard' element={<AdminDashboard />} />

   </Routes>
   </BrowserRouter>

  )
}

export default App