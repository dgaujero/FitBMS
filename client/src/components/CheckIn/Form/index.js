// import React, { useState } from 'react';
import React from 'react'
import axios from 'axios';
import List from "../../List";
import ListItem from "../../ListItem";
import fire from '../../../config/fire'
// import Buttons from '../Buttons'
// import { Button, ButtonGroup } from 'reactstrap';


class CheckinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      name: "",
      purpose: ""
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

  logout = () => {
    fire.auth().signOut();
    window.location.href="/checkin"
  }

  // selectMember(e, memberName) {
  //   this.setState({
  //     name: memberName
  //   })
  // };

  // selectPurpose(e, purpose) {
  //   this.setState({
  //     purpose: purpose
  //   })
  // };

  /*
    
  */
  select = (field) => {
    return (e) => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleInputChange = (event, data) => {
    // e.preventDefault();
    this.setState({
      name: event.target.value,
      purpose: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(event);
    const signIn = {
      name: this.state.name,
      purpose: this.state.purpose
    };
    console.log("session post data", signIn);

    axios.post(`/signin`, signIn)
      .then(res => {
        console.log("checkin session res", res);
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
                      <button type="button" onClick={this.select("name")} value={member.firstName + " " + member.lastName}>Thats me!</button>
                      <button type="button" onClick={this.select("purpose")} value="Trainer">Trainer</button>
                      <button type="button" onClick={this.select("purpose")} value="Class">Class</button>
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
          <button type ="submit" href="" onClick={this.logout}>Sign Out</button>
        </form>
      </div>
    )
  }

}

export default CheckinForm

