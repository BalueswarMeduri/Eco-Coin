import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Profileinfo from '../../components/Profile/Profileinfo';
import Footer from '../../components/Footer/Footerinfo';
import { uploadedImages } from '../../connecting';
import { format } from 'date-fns';

const aggregateByDate = (data) => {
  const activityMap = {};

  data.forEach(item => {
    const date = format(new Date(item.createdAt), 'yyyy-MM-dd');

    // Increment the count for the same day
    if (activityMap[date]) {
      activityMap[date]++;
    } else {
      activityMap[date] = 1;
    }
  });

  const result = Object.entries(activityMap).map(([date, activity]) => ({
    date,
    activity
  }));

  return result;
};


const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await uploadedImages();

        const hold = await aggregateByDate(res.message);
        setData(hold)

        //console.log(hold);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    
    load(); // Call the load function
  }, []); // Empty dependency array to ensure it runs once when the component mounts

  return (
    <div>
      <Navbar />
      {!loading ? <Profileinfo data={data}/> : <p>Loading...</p>}
      <Footer />
    </div>
  );
};

export default Profile;
