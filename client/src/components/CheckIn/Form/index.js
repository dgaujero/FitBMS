// import React, { useState } from 'react';
import React from 'react'
import axios from 'axios';
import List from "../../List";
import ListItem from "../../ListItem";
// import Buttons from '../Buttons'
// import { Button, ButtonGroup } from 'reactstrap';


class CheckinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      name: ""
    }

  };
  componentDidUpdate() {
    console.log("new state", this.state)
  }

  componentDidMount() {
    this.loadMembers();
  };
  loadMembers() {
    axios.get('/getmembers')
      .then((response) => {
        console.log("members", response)
        this.setState({ members: response.data.members })
      })
  }
  renderMember() {
    return this.state.members.map(member => (
      <div key={member.id}>
        {member.firstName + " " + member.lastName}
      </div>
    ))
  }

  selectMember(e, memberName) {
    this.setState({
      name: memberName
    })
  };

  handleInputChange = (event, data) => {
    // e.preventDefault();
    this.setState({ name: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const signIn = {
      name: this.state.name
    };
    console.log("session post data", signIn);

    axios.post(`checkin/session`, signIn)
      .then(res => {
        console.log("checkin sessino res", res);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            {this.state.members.length ? (
              <List>
                {this.state.members.map(member => {
                  return (
                    <ListItem key={member.id}>
                      <strong>
                        {member.firstName} {member.lastName}
                      </strong>
                      <button type="button" onClick={e => this.selectMember(e, member.firstName)}>Thats me!??</button>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}

          </div>
          {/* <Buttons></Buttons> */}
          <button type="submit">Check Me In!</button>
        </form>
      </div>
    )
  }

}

export default CheckinForm

