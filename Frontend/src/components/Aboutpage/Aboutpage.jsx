import React, { useRef } from "react";
import './Aboutpage.css'
import { LuTrees } from "react-icons/lu";
import { RiShakeHandsLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const Aboutpage = ({data}) => {
    const reference = useRef();

    const play = () => {
        setTimeout(()=>{reference.current?.scrollIntoView({behavior : "smooth"})},100)
    }
    return(
        <>
            <div className="about-main">
                <div className="about-main-content">
                    <h2>WE ARE</h2>
                    <h1>IND INNOVATORS</h1>
                    <p>A NON-PROFIT ORGANIZATION FOCUSED ON GLOBAL REFORESTATION</p>
                    <button className="about-main-content-button" onClick={()=>play()}>GET IN TOUCH</button>
                </div>
            </div>
            <div className="about-vision">
                <div className="about-vision-content">
                    <h1>OUR VISION</h1>
                    <p>We want to make it simple for anyone to help the environment by planting trees. Together we can restore</p>
                    <p>forests, create habitat for biodiversity, and make a positive social impact around the world.</p>
                </div>
            </div>
            <div className="about-count">
                <div className="text-content">
                    <h1>TOGETHER, PLANTING A FOREST</h1>
                    <p>Since 2024, we have planted over 135.5 million trees with 378 partners across 82 countries in North</p>
                    <p> Asia,Africa,Europe and Oceania.</p>
                </div>
            </div>
            <div className="count-content-container">
                <div className="count-card">
                    <div className="count-icon" id="count-icon1"><RiShakeHandsLine/></div>
                    <h1>3+</h1>
                    <p>PLANTING PARTNERS</p>
                </div>
                <div className="count-card">
                    <div className="count-icon" id="count-icon2"><FaUsers/></div>
                    <h1>{data.userCount}+</h1>
                    <p>ACTIVE USERS</p>
                </div>
                <div className="count-card" ref={reference}>
                    <div className="count-icon" id="count-icon3"><LuTrees/></div>
                    <h1>{data.plantCount}+</h1>
                    <p>TREES PLANTED</p>
                </div>
            </div>
            <div className="contact-form">
                <h1 id="GetInTouch" >GET IN TOUCH</h1>
                <form className="form-containerrr">
                    <div className="input-container1">
                        <input type="text" placeholder="Name*"/>
                        <input type="text" placeholder="Email*"/>
                    </div>
                    <div className="input-container2">
                        <input type="text" placeholder="Subject"/>
                        <textarea rows={8} cols={70} placeholder="Write Something"></textarea>
                        <button>SUBMIT</button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default Aboutpage;