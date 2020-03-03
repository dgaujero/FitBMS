import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import CheckIn from "./pages/checkIn";
import MemberPortal from './pages/memberPortal';
import MemberPage from "./components/memberPage";
import ModalExample from './components/CheckIn/modal'
import Home from "./components/Manage/home";
import Video from "./components/Video/Video";
import HomeTwo from "./components/CheckIn/hometwo";

class App extends React.Component {

  render() {

    return (
      <div className="App">
        <Router>
          <Route path="/checkin" component={Video} />
          <Route path="/hometwo" component={HomeTwo} />
          <Route path="/memberportal" component={MemberPortal} />
          <Route path="/manage" component={Home} />
          <Route path="/member" component={MemberPage} />
          <Route path="/modal" component={ModalExample} />
        </Router>
      </div>
    )
  };
}



export default App;


// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
// state = {
//     data: null
//   };

//   componentDidMount() {
//       // Call our fetch function below once the component mounts
//     this.callBackendAPI()
//       .then(res => this.setState({ data: res.express }))
//       .catch(err => console.log(err));
//   }
//     // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
//   callBackendAPI = async () => {
//     const response = await fetch('/express_backend');
//     const body = await response.json();

//     if (response.status !== 200) {
//       throw Error(body.message) 
//     }
//     return body;
//   };

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         // Render the newly fetched data inside of this.state.data 
//         <p className="App-intro">{this.state.data}</p>
//       </div>
//     );
//   }
// }

// export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
