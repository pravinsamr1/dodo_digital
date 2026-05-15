import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AllSchool from './Pages/AllSchool'
import SchoolDetail from './Pages/SchoolDetail'
import { LocationProvider } from './context/LocationContext'

const App = () => {
  return (
    <LocationProvider>
      <Router>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/allschools" element={<AllSchool/>} />
          <Route path="/schools/:id" element={<SchoolDetail/>} />
        </Routes>
      </Router>
      <Footer/>
    </LocationProvider>
  )
}

export default App
