import React, { Component } from "react";
import axios from 'axios';

class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedIn: []
        }
    };
    componentDidMount() {
        this.loadCheckedInMembers();
    };
    loadCheckedInMembers = () => {
        axios.get('/manage/attendance')
            .then((response) => {
                console.log(response)
                this.setState({ checkedIn: response.data.checkedIn })
            })
    }
    renderCheckedIn = () => {
        return this.state.checkedIn.map(member => (
          <div key={member.id}>
            {member.name}
            { member.purpose }
            { member.timestamp }
          </div>
        ))
      }
      render() {
        return (
            <div>
                Checked In Members: {this.renderCheckedIn()}
    
            </div>
        )
    }
    }

export default Attendance