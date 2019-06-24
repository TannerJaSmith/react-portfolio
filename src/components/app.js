import React, { Component } from 'react';
import moment from 'moment';

import PortfolioContainer from './portfolio/portfolio-container.js';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Tanner's Portfolio</h1>
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
        <PortfolioContainer />
      </div>
    );
  }
}
