import React, { useEffect, useState } from 'react';
import './Faq.css'; // Ensure you have the CSS file
import AOS from "aos";
import "aos/dist/aos.css";

const accordionData = [
  {
    id: 'accordion1',
    title: 'What is EcoCoin?',
    description: 'EcoCoin is a web platform designed to promote sustainable living through gamification. Users can earn EcoCoins by engaging in eco-friendly actions, which are tracked and verified through the platform. These EcoCoins can be redeemed for discounts, products, or donated to environmental causes.',
  },
  {
    id: 'accordion2',
    title: 'How do I sign up for EcoCoin?',
    description: 'To sign up for EcoCoin, visit our registration page and provide your email address, create a password, and fill out a few personal details. You’ll receive a confirmation email to verify your account. Once verified, you can log in and start tracking your eco-friendly activities.',
  },
  {
    id: 'accordion3',
    title: 'How can I track my eco-friendly activities?',
    description: 'Eco-friendly activities can be tracked in two ways:\n\nAutomatic Tracking: We integrate with third-party APIs to automatically track activities such as recycling and reducing electricity usage.\nManual Logging: You can manually log your activities by uploading photo proof and providing details about the action you performed.',
  },
  {
    id: 'accordion4',
    title: 'What are EcoCoins and how do I earn them?',
    description: 'EcoCoins are virtual rewards you earn by performing verified eco-friendly actions. The more actions you complete, the more EcoCoins you earn. Activities include recycling, using public transport, and reducing energy consumption. You can also earn additional EcoCoins through community challenges and achievements.',
  },
  {
    id: 'accordion5',
    title: 'What can I do with the EcoCoins I earn?',
    description: 'EcoCoins can be used in several ways:\n\nRedeem for Discounts and Products: Use your EcoCoins to get discounts or products from our partner eco-friendly businesses.\nDonate: You can donate your EcoCoins to support environmental charities and causes.\nParticipate in Premium Challenges: Use EcoCoins to enter exclusive challenges with additional rewards.',
  },
  {
    id: 'accordion6',
    title: 'How does the community feature work?',
    description: 'The community feature allows you to join or create eco-friendly challenges with other users. You can participate in group activities, share tips, and organize local events. Community engagement helps foster a sense of collaboration and encourages more sustainable practices.',
  },
  {
    id: 'accordion7',
    title: 'What should I do if I encounter an issue or have a question?',
    description: 'If you encounter any issues or have questions, you can contact our support team through the "Contact Us" page on our website. You can also check out our Help Center for detailed articles and guides. For urgent matters, we offer live chat support during business hours.',
  },
];

const Accordion = () => {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div data-aos="fade" className="accordion">
      <h1>Frequently Asked Questions</h1>
      {accordionData.map(item => (
        <div key={item.id} className="accordion-item">
          <input
            type="checkbox"
            id={item.id}
            checked={activeId === item.id}
            onChange={() => handleToggle(item.id)}
            style={{ display: 'none' }}
          />
          <label htmlFor={item.id} className="accordion-item-title">
            <span className="icon"></span>
            {item.title}
          </label>
          <div className={`accordion-item-desc ${activeId === item.id ? 'active' : ''}`}>
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
