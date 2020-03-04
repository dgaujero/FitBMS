import React, { Component } from "react";
import axios from 'axios';
import './manage.css';

class Trainers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainers: [],
      // id: "",
      firstName: "",
      lastName: "",
      search: ""
    }
  };
  componentDidMount() {
    this.loadTrainers();
  }
  loadTrainers = () => {
    axios.get('/trainers')
      .then((response) => {
        console.log(response)
        this.setState({ trainers: response.data.trainers })
      })
  };
  renderTrainer = () => {
    let filteredList = this.state.trainers.filter(
      (member) => { 
          return member.firstName.toLowerCase().indexOf(this.state.search) === 0;
      }
    );
    return filteredList.map(trainer => (
      <div key={trainer.id}>
        {trainer.firstName} {trainer.lastName}
      </div>
    ))
  };

  updateSearch(event) {
    console.log(event.target.value)
    this.setState({search: event.target.value.substr(0, 25)})
  }

  render() {
  
    return (
      <div className="trainers-container">
        <h1>Trainers</h1>
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search..."></input>
        {this.renderTrainer()}
      </div>
    )
  }
}
export default Trainers;



