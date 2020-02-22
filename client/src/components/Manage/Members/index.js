import React, { Component } from "react";
import axios from 'axios';
class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
    };
    componentDidMount() {
        this.loadMembers();
    };
    loadMembers = () => {
        axios.get('/getmembers')
            .then((response) => {
                console.log(response)
                this.setState({ members: response.data.members })
            })
    }
    renderMember = () => {
        return this.state.members.map(member => (
            <div key={member.id}>
                {member.firstName}
            </div>
        ))
    }
    render() {
        return (
            <div>
                Members: {this.renderMember()}
            </div>
        )
    }
}
export default Members;
