import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
    <h2>TOURS</h2>
    <div className="container">
      <div className="event-container">
        <ul className="event-list">
          <li className="event-item">
            <p>JUL 16</p>
            <p>DETROIT, MI</p>
            <p>DTE ENERGY MUSIC THEATRE</p>
            <button className="buy-tickets">BUY TICKETS</button>
          </li>
          <li className="event-item">
            <h3>JUL 19</h3>
            <p>TORONTO, ON</p>
            <p>BUDWEISER STAGE</p>
            <button className="buy-tickets">BUY TICKETS</button>
          </li>
          <li className="event-item">
            <h3>JUL 22</h3>
            <p>BRISTOW, VA</p>
            <p>JIGGY LUBE LIVE</p>
            <button className="buy-tickets">BUY TICKETS</button>
          </li>
          <li className="event-item">
            <h3>JUL 29</h3>
            <p>PHOENIX, AZ</p>
            <p>AK-CHIN PAVILION</p>
            <button className="buy-tickets">BUY TICKETS</button>
          </li>
          <li className="event-item">
            <h3>AUG 2</h3>
            <p>LAS VEGAS, NV</p>
            <p>T-MOBILE ARENA</p>
            <button className="buy-tickets">BUY TICKETS</button>
          </li>
          <li className="event-item">
            <h3>AUG 7</h3>
            <p>CONCORD, CA</p>
            <p>CONCORD PAVILION</p>
            <button className="buy-tickets">BUY TICKETS</button>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default Home;
