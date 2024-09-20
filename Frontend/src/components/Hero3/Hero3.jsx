import React, { useEffect } from 'react'
import './Hero3.css'
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Hero3 = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
      }, []);
    return (
        <>
            <div  data-aos="fade" className="hero3-container">
                <div className="hero3-container-box">
                    <h1>REFORESTATION</h1>
                    <h4>Planting trees around the world</h4>
                    <div className="hero3-buttons">
                        <button id='btn1'> <a href="https://www.savatree.com/whytrees.html" target="_blank">Why Trees?</a></button>
                        <button id='btn2'><Link to="/Addimage">Plant A Tree</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero3