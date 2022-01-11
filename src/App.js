import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-tsparticles";
import Clarifai from 'clarifai';

 // Clarifai API setup
const app = new Clarifai.App({
  apiKey: '72876add4fc5469998d8b1e86d2124a6'
});

const particleOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 2,
    },
  },
  detectRetina: true,
}
// const particlesInit = (main) => {
//   // console.log(main);
// };
// const particlesLoaded = (container) => {
//   // console.log(container);
// };
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }
  onButtonSubmit = () => {
    console.log('click');
    // console.log(Clarifai);
    app.models.predict("a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg").then(
      function(response){
        // do something with repsonse
        console.log(response);
      },
      function(err){
        // there was an error
      }
    );
  }

  render() {
    return(
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} 
      />
      <FaceRecognition />

      <Particles 
        className="particles"
        id="tsparticles"
        // init={particlesInit}
        // loaded={particlesLoaded}
        options={particleOptions}
      />
    </div>
    )
  };
}

export default App;
