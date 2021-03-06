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
    move: {
      direction: "none",
      enable: true,
      // outMode: "bounce",
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: 1,
    },
  },
  detectRetina: true,
}
 // console.log(response)
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    // Object setting the box state and calculating box
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // Used in response, using calculations
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log('click');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
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
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />

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
