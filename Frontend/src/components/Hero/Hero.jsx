import React, { useEffect } from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
import back from "../../assets/back.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
      }, []);
  return (
    <div>
        <div data-aos="fade-up" className='bigforfullhero'>
            <div  className="herofull">
                <div className="leftside">
                    <h1 className='heading'>EcoCoin</h1>
                    <h1 className="game">A Gamified Platform for Sustainable Living</h1>
                    <Link to="/Addimage">
                        <button className="btn">Get started</button>
                    </Link>
                </div>
                <div className="rightside">
                        {/* <img src="https://thinkamentor.com/gullatheme/html/natureplant/assets/img/home-1/banner/bannerightimg.png" alt="" /> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero