import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AllSchool from './Pages/AllSchool'
import SchoolDetail from './Pages/SchoolDetail'
import { LocationProvider } from './context/LocationContext'
import { AuthModalProvider } from './context/AuthModalContext'
import LoginModal from './components/LoginModal'
import AllSchools from './Pages/AllSchools'
import AllColleges from './Pages/AllColleges'
import AllOnlineCourses from './Pages/AllOnlineCourses'
import AllAcademicClasses from './Pages/AllAcademicClasses'
import SearchResults from './Pages/SearchResults'
import AbroadEducation from './Pages/AbroadEducation'
import CollegeDetail from './Pages/CollegeDetail'
import Institutes from './Pages/Institutes'
import OnlineCourseDetail from './Pages/OnlineCourseDetail'

const App = () => {
  return (
    <LocationProvider>
      <Router>
        <AuthModalProvider>
          <Nav />
          <LoginModal />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/online-schools" element={<AllSchool/>} />
            <Route path="/allschools" element={<AllSchools/>} />
            <Route path="/junior-colleges" element={<AllColleges/>} />
            <Route path="/online-courses" element={<AllOnlineCourses/>} />
            <Route path="/academic-classes" element={<AllAcademicClasses/>} />
            <Route path="/schools/:id" element={<SchoolDetail/>} />
            <Route path="/colleges/:id" element={<CollegeDetail/>} />
            <Route path="/search" element={<SearchResults/>} />
            <Route path="/abroad-education" element={<AbroadEducation/>} />
            <Route path="/institutes" element={<Institutes/>} />
            <Route path="/online-courses/:id" element={<OnlineCourseDetail/>} />
          </Routes>
        </AuthModalProvider>
        <Footer />
      </Router>
    </LocationProvider>
  )
}

export default App
