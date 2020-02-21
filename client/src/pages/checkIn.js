import React, { Component } from 'react';
import MemTrainBTN from '../components/CheckIn/Buttons/index'
// import axios from 'axios'

class CheckIn extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: 'Check-In App',
            datas: []
        }
    }

    // componentDidMount() {
    //     axios.get('/displayallmembers')
    //       .then(res => {
    //         debugger
    //       });
    //   }

    // fSubmit = (event) =>  {
    //     event.preventDefault();`

  
    // }

    render() {
        return(
            <div>
                <h2>{this.state.title}</h2>
                <form>
                    <input type='text' ref='username' placeholder='Enter your username'></input>
                    <input type='text' ref='password' placeholder='Enter your password'></input>
                    <button onClick={this.fSubmit} className='checkinBTN'>Check Me In!</button>
                    <MemTrainBTN/>
                </form>
            </div>
        )
    }
}

export default CheckIn