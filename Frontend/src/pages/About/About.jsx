import React, { useEffect, useState } from 'react'
import Aboutpage from '../../components/Aboutpage/Aboutpage'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footerinfo'
import { getCounts } from '../../connecting'

const About = () => {
  const [loading , setLoading] = useState(true)
  const [data , setData] = useState()

  useEffect(() => {
    const load = async () => {
      await getCounts()
      .then((res) =>{
        //console.log(res);
        setData(res.message)
        
      })
      .catch((res) => console.log(res)
      )
      setLoading(false);
    }

    load()
  } , [])
  if(!loading)return (
    <div>
      <Navbar/>
      <Aboutpage data={data}/>
      <Footer/>
    </div>
  )
}

export default About