import React, { useEffect, useState } from 'react';
import Leader from '../../components/Leader/Leader';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footerinfo';
import { leaderboard } from '../../connecting';

const LeaderBoard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState(null); // Add state to store the fetched leaderboard data

  useEffect(() => {
    const load = async () => {
      try {
        const res = await leaderboard();
        //console.log(res);
        setLeaderboardData(res.message); // Save the fetched data to state
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Always stop loading, whether success or error
      }
    };

    load();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while waiting for the data
  }

  return (
    <div>
      <Navbar />
      <Leader vdata={leaderboardData} /> {/* Pass the leaderboard data to the Leader component */}
      <Footer />
    </div>
  );
};

export default LeaderBoard;
