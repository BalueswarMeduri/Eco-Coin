import React from 'react'
import CarbonFootprintCalculator from '../../components/Carbon/Carboninfo'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footerinfo'

const Carbon = () => {
  return (
    <div>
      <Navbar/>
      <CarbonFootprintCalculator/>
      <Footer/>
    </div>
  )
}

export default Carbon