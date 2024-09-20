import React, { useEffect } from 'react'
import './Footerinfo.css'
import { FaFacebook,FaLinkedin,FaInstagram} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
      }, []);
    return (
    <div  data-aos="fade" className='footerbox'>
        <h1 className='headingg'>GET CONNECTED WITH US</h1>
        <div  data-aos="fade-down" className="links-social">
            <a href="/" className="linkanch"><FaLinkedin style={{color : "white"}}/></a>
            <a href="/" className="linkanch"><FaFacebook /></a>
            <a href="/" className="linkanch"><BsTwitterX /></a>
            <a href="/" className="linkanch"><FaInstagram /></a>
        </div>
        <hr className="line" />
        <div  className="containerfooter">
            <div  data-aos="fade-right" className="box1 box">
                <h2 className="subheading">Company</h2>
                <a href="/" className="linkanch">About EcoCoin</a>
                <a href="/" className="linkanch">Awards</a>
                <a href="/" className="linkanch">Contact US</a>
            </div>
            <div data-aos="fade-right" className="box2 box">
                <h2 className="subheading">News & Events</h2>
                <a href="/" className="linkanch">News</a>
                <a href="/" className="linkanch">Events</a>
            </div>
            <div data-aos="fade-right" className="box3 box">
                <h2 className="subheading">Customer Stories</h2>
                <a href="/" className="linkanch">Customer Stories</a>
            </div>
            <div data-aos="fade-left" className="box4">
                <form action="" className="footerForm">
                    <input type="email" placeholder='Enter your E-mail Address' className='email-ipt'/>
                    <button className='submit-btn'>SUBMIT</button>
                    <p className="txt">SignUp to receive EcoCoin Marketing mails.You can modify your subscription or unsubscribe at any time <br/><br/>21076 BakeParkway. Suite106. LakeForest. CA92630</p>
                </form>
            </div>
        </div>
        <div className="links2">
        <a href="/" className="link2">Web Policy</a>
        <span>|</span>
        <a href="/" className="link2">Cookies Policy</a>
        </div>
        <div  className="lastline">
            <p>@2024 EcoCoin. All Rights Reserved</p>
        </div>
    </div>
    )
}

export default Footer