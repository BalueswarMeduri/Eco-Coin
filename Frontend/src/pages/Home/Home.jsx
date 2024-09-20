import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Hero3 from '../../components/Hero3/Hero3'
import Hero4 from '../../components/Hero4/Hero4'
import Hero5 from '../../components/Hero5/Hero5'
import Accordion from '../../components/FAQ/Faq'
import Footer from '../../components/Footer/Footerinfo'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Hero4/>
      <Hero5/>
      <Hero3/>
      <Accordion/>
      <Footer/>
    </div>
  )
}

export default Home