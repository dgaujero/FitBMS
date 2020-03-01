import React, { Component } from "react";
import axios from 'axios';
import List from "../List";
import ListItem from "../ListItem";
import './manage.css';

class Members extends Component {

  constructor(props) {
    super(props);
    this.state = {
      members: [],
      id: ""
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
  };

  deleteMember = (e, data) => {
    e.preventDefault();
    axios.delete(`/manage/members/id/${data}`)
      .then(res => this.loadMembers())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="members-container">
        <h1>Hello Members</h1>

        {this.state.members.length ? (
          <List>
            {this.state.members.map(member => {
              return (
                <ListItem
                  key={member.id}>
                  <strong>
                    {member.firstName} {member.lastName} {member.username}
                    {member.password} {member.phoneNum} {member.bday}
                    {member.address} {member.email} {member.emergName}
                    {member.emergNum}
                  </strong>
                  <button type="submit" onClick={e => this.deleteMember(e, member.id)}>Delete</button>
                </ListItem>
              );
            })}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
    )
  }
}
export default Members;