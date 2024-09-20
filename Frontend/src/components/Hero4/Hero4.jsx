import React, { useEffect } from 'react';
import './Hero4.css';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import AOS from "aos";
import "aos/dist/aos.css";

const Hero4 = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className='imagecomper'>
      <div data-aos="fade-up" className="imageof2side">
        <h1>Trees are the key</h1>
        <p>We believe that saving forests is the best way to fight climate change, protect biodiversity, and uplift local communities. Yet, deforestation puts our planet at risk, with 40 football fields lost every minute… every minute!</p>
        <br />
        <br />
        <p>We’re working to change this. As a global nonprofit, Stand For Trees empowers local communities to safeguard their forests. Thanks to the support of people like you, we have already preserved millions of acres of vital ecosystems.</p>
      </div>
      <div data-aos="fade-up" className="compartimg">
        <ReactCompareSlider
          itemOne={
            <div className="compare-image-container compare-image--before">
              <ReactCompareSliderImage className="compare-image-left" src="https://assets.technologynetworks.com/production/dynamic/images/content/378128/act-now-to-save-tropical-forests-from-climate-change-die-offs-researchers-warn-378128-960x540.jpg?cb=12436685" alt="Before Image" />
              <div className="compare-text-left">Stop Deforestation</div>
            </div>
          }
          itemTwo={
            <div className="compare-image-container compare-image--after">
              <ReactCompareSliderImage className="compare-image-right" src="https://media.istockphoto.com/id/172362987/photo/sad-image-showing-the-increase-in-deforestation.jpg?s=612x612&w=0&k=20&c=k0PnkZJsvKNV-z-E7nPVPx_T1nhHjbT0CM2oFq1HGBU=" alt="After Image" />
              <div className="compare-text-right">Before its too late</div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Hero4;
