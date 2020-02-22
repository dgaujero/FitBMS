import React, { Component } from 'react';
import MemTrainBTN from '../components/CheckIn/Buttons/index'
import axios from 'axios'

class CheckIn extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: 'Check-In App',
            members: []
        }
    }

    componentDidMount() {
        axios.get('/displayallmembers')
          .then(res => {
            this.setState({members: res.membersTable})
          });
      }

    // fSubmit = (event) =>  {
    //     event.preventDefault();`

  
    // }
    renderMembers() {
        return this.state.members.map(member => (
            <div key={member.id}>
                {member.first_name}
            </div>
        ))
    }
    render() {
        return(
            <div>
                <h2>{this.state.title}</h2>
                <form>
                    <input type='text' ref='username' placeholder='Enter your username'></input>
                    <input type='text' ref='password' placeholder='Enter your password'></input>
                    <button onClick={this.fSubmit} className='checkinBTN'>Check Me In!</button>
                    <MemTrainBTN/>

                    <p>Members here {this.renderMembers()}</p>
                </form>
            </div>
        )
    }
}

export default CheckIn