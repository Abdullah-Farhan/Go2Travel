import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Results from './components/Results/Results'


function App() {

  return (
    <>
      <div>
        <Navbar/>
        <Results searchedValue={"United Arab Emirates"} searchedResults={3921}/>
        <Footer />
      </div>
    </>
  )
}

export default App
