import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from "../../components/Navbar/Navbar";
import "./Profileinfo.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { uploadedImages } from "../../connecting";

// Sample data for the chart
const sampleData = [
  { date: '2024-09-01', activity: 5 },
  { date: '2024-09-02', activity: 3 },
  { date: '2024-09-03', activity: 8 },
  { date: '2024-09-04', activity: 2 },
  { date: '2024-09-05', activity: 6 },
];

const Profileinfo = ({data}) => {
  //console.log(data);
  

  const userData = useSelector((state) => state.auth.userData);
  

  return (
    <div>
      <Navbar />
      <h1 className="heding">My Profile</h1>
      <div data-aos="fade-up" className="profile">
        {userData ? (
          <div className="profile-info">
            <div className="img">
              {userData.gender === "male" ? (
                <h1 className="men">👨🏻</h1>
              ) : (
                <h1 className="girl">👩🏻</h1>
              )}
            </div>
            <div className="ditel">
              <h2>Name: {userData.fullName}</h2>
              <p>Email: {userData.email}</p>
              <p>Gender: {userData.gender}</p>
            </div>
          </div>
        ) : (
          <p>No user data available. Please log in.</p>
        )}
        <div className="points">
            <h1>Total Coins</h1>
            <p>{userData.coins}</p>
            <Link to="/reedem"><button>Reedem</button></Link> <br /> <br />
            <Link to="/leader"><button>LeaderBoard</button></Link>
        </div>
      </div>
      <h2 className="achheading"> Achievements</h2>
      <div  className="achive">
        <div data-aos="fade-right" className="f50">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRey7cJmQmHiB1fw_j1IUXtCcROxKNsvoOrJLMoNCBAPHaQ_qFmV5OXvMSbQo6SqODCMJg&usqp=CAU" alt="" />
        <p>If you've planted 50+ trees, your're eligible!</p>
        </div>
        <div data-aos="fade-left" className="f50">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6F3bs-T5nH16Ma8A1SiPFS7eDAdDaHtlLlQ&s" alt="" />
        <p>If you've planted 50+ trees, your're eligible!</p>
        </div>
      </div>
      {/* Adding the AreaChart */}
      <div data-aos="fade-right " className="chart-container">
        <h2>Recent Activity</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            style={{ backgroundColor: 'var(--darkgrey)' }}
          >
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--green)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'var(--white)' }} 
              label={{ value: 'Date', position: 'insideBottomRight', offset: 0, fill: '#ffffff' }} 
            />
            <YAxis 
              tick={{ fill: 'var(--white)' }} 
              label={{ value: 'Activity', angle: -90, position: 'insideLeft', fill: '#ffffff' }} 
            />
            
            <Legend />
            <Area 
              type="monotone" 
              dataKey="activity" 
              stroke="var(--green)" 
              fillOpacity={1} 
              fill="url(#colorActivity)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Profileinfo;
