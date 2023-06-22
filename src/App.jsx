import { Component } from 'react'
import Navgation from './components/Navgation/Navgation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
// import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank'
import './App.css'

const returnClarifaiJSONRequest = (imageURL) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '6fa9cc7a46c44c98802cef43b313cfdc';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'howard999';       
  const APP_ID = 'my-first-application';
  // Change these to whatever model and image URL you want to use
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions;
}
  
 
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map((region) => region.region_info.bounding_box );
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    let faces = [];

    // this map function is to get the position of all faces on the image
    clarifaiFace.map((face) => {
      faces.push({
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height),
        leftCol: face.left_col * width,
      });
    });
   
    return faces;
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
 
    const response = await fetch(
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      returnClarifaiJSONRequest(this.state.input)
    );
    const data = await response.json();
  
    if (data.status.description === "Ok") {
      const faces = this.calculateFaceLocation(data);
      this.displayFaceBox(faces);

      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, { entries: count}))
      })
      //.catch(console.log(err))
    }
      /*fetch(
        "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
        returnClarifaiJSONRequest(this.state.input)
      )
      .then((response) => response.json())
      .then((response) => {
        if (response.status.description === "Ok") {
          const faces = this.calculateFaceLocation(response);
          this.displayFaceBox(faces);
           
        } 
      })*/
       
  };

    onRouteChange = (route) => {
      if (route === 'signout'){
        this.setState(initialState);
      } else if (route === 'home'){
        this.setState({isSignedIn: true});
      }

      this.setState({route:route});
    }
  render() {
    return (
      <div className="App">

        
          {this.state.route === 'home' 
          ?  
           <div>
              <Navgation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition
                boxes={this.state.boxes}
                imageUrl={this.state.imageUrl}
              />
            </div>
          : (
            this.state.route === 'signin' || this.state.route === 'signout'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}

export default App 
 