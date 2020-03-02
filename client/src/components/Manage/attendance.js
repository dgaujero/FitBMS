import React, { Component } from "react";
import axios from 'axios';
import './manage.css';

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
    render() {
        return (
            <div className="attendance-container">
                Checked In Members: {this.renderCheckedIn()}

            </div>
        )
    }
}

export default Attendance