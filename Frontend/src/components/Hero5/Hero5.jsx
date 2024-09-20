import React, { useEffect } from "react";
import "./Hero5.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero5 = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="hero2big">
      <h2>Plant Trees</h2>
      <p className="herpara">We work with amazing reforestation partners around the world that need your support to help get trees in the ground.</p>
      <div className="hero-section">
        <div data-aos="fade-right" className="hero-card" id="individuals">
          <img
            src="https://onetreeplanted.org/cdn/shop/files/individuals_400x.jpg?v=1689773243"
            alt="Individuals"
          />
          <div className="hero-text">
            <h1>INDIVIDUALS</h1>
            <p>
              Become a Tree Ambassador and support our global reforestation
              efforts
            </p>
            <Link to="/Addimage"> <button className='btn'>Get started</button></Link>
          </div>
        </div>
        <div data-aos="fade" className="hero-card" id="business">
          <img
            src="https://onetreeplanted.org/cdn/shop/files/woman_holding_seedling_400x.jpg?v=1701453117"
            alt="Business"
          />
          <div className="hero-text">
            <h1>BUSINESS</h1>
            <p>Increase your Corporate Social Responsibility</p>
            <Link to="/Addimage"> <button className='btn'>Get started</button></Link>
          </div>
        </div>
        <div data-aos="fade-left" className="hero-card" id="schools">
          <img
            src="https://onetreeplanted.org/cdn/shop/files/3_60d14ccf-ef0d-4b3d-b91b-4d8d3a651c57_400x.png?v=1614315088"
            alt="Schools"
          />
          <div className="hero-text">
            <h1>SCHOOLS</h1>
            <p>Bring Environmental Education to classrooms and campuses</p>
            <Link to="/Addimage"> <button className='btn'>Get started</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero5;
