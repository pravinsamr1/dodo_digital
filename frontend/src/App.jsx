import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AllSchool from './Pages/AllSchool'

const App = () => {
  return (
    <div> 

      <Router>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/allschools" element={<AllSchool/>} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App