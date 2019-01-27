import React, { Component } from 'react';

import Header from 'components/sections/Header';
import Main from 'components/sections/Main';

import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
