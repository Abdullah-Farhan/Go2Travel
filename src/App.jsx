import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'

function App() {

  return (
    <>
      <div>
        <Navbar/>
        <Home />
        <Footer />
      </div>
    </>
  )
}

export default App
