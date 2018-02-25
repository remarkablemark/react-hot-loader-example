import React, { Component } from 'react';

class App extends Component {
  render() {
    const style = {
      fontFamily: 'Lucida Grande',
      margin: 50,
    };
    return (
      <main style={style}>
        <h1>Welcome to react-hot-loader-example!</h1>
      </main>
    );
  }
}

if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader');
  App = hot(module)(App);
}

export default App;
