import './App.css';
import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/* <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    );
    }
}

export default App;
