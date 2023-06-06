import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div style={{ width: '50%', margin: '0 auto' }}>
        <h2>Welcome to ProperTask!</h2>
        <p>
          ProperTask is an application focused on organization and productivity.
          This React Task Application is designed to help you manage your tasks and
          stay on top of your property management effortlessly. Whether you're a budding entrepreneur 
          or a professsional leasing company, this application is here to help you more efficiently manage
          your properties and propel your business forward. 
        </p>
        <p>
          With this intuitive and user-friendly interface built on the React framework, 
          you can easily create, organize, and track your tasks in a visually appealing 
          and efficient manner. The application offers a seamless experience, allowing you to 
          focus on what matters most - completing your tasks and achieving your goals.
        </p>
        <h2>Technologies Used</h2>
        <ul className='about-list'>
          <li>React with Redux</li>
          <li>Node & Express JS</li>
          <li>PostGreSQL</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Material UI</li>
        </ul>
        <h2>Special Thanks</h2>
        <ul className='about-list'>
          <li>Prime Digital Academy</li>
          <li>Tanzanite Cohort</li>
          <li>Familyl & Friends</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
