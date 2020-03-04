import React, { Component } from "react";
import axios from 'axios';
import './manage.css';
import fire from '../../config/fire'
import moment from 'moment'

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
                <h1>{member.name} </h1>
                <h1>{member.purpose}</h1>
                <h1>{member.seshTime}</h1>
            </div>
        ))
    }
    logout = () => {
        fire.auth().signOut();

    }
    render() {
        return (
            <div className="attendance-container">
                <h1>Checked In Members</h1>
                <hr className="title-hr"></hr>
                {this.renderCheckedIn()}
                <button type="submit" href="" onClick={this.logout}>Sign Out</button>
            </div>
        )
    }
}

export default Attendance