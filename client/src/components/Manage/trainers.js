import React, { Component } from "react";
import axios from 'axios';

class Trainers extends Component {
    constructor(props) {
        super(props);
        this.state={
            trainers: [],
            // id: "",
            firstName: "",
            lastName: ""
        }
    };
    componentDidMount() {
        this.loadTrainers();
    }
    loadTrainers = () => {
        axios.get('/trainers')
          .then((response) => {
            console.log(response)
            this.setState({trainers: response.data.trainers})
          })
      };
    renderTrainer = () => {
        return this.state.trainers.map(trainer => (
          <div key={trainer.id}>
            {trainer.firstName} {trainer.lastName}
          </div>
        ))
      };
   
    render() {
        return (
            <div>
                 <h1>Trainers</h1>
        {this.renderTrainer()}
            </div>
        )
    }
}
export default Trainers;



