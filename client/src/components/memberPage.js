import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Button} from 'reactstrap';
import fire from "../config/fire";
import axios from 'axios';


class MemberPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           uId: '',
           name: '',
           lastName: ''
        }
    }

    componentDidMount(){
        this.authListener();
    }
      
    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
            this.setState({uId: user.uid});
            this.loadMember();
            }
            else{
            this.setState({user: null});
            }
        });
    }
    
    logout = () => {
        fire.auth().signOut();
        this.setState({user: {}});
    }

    loadMember = () => {
        axios.get(`viewmember/id/${this.state.uId}`)
      .then(res => {
        this.setState({name: res.data.member[0].firstName});
        this.setState({lastName: res.data.member[0].lastName});
          console.log(res);
        })
      .catch(err => console.log(err));
    }

    renderMember = () => {
        return(
            <div>
                {this.state.name}
                {this.state.lastName}
            </div>
        )
    }
    
    render() {
        
        return(
        <div>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6">
                FitnessBMS
                </Typography>
                </Toolbar>
            </AppBar>
            
            <h1>Hello</h1>
            {this.renderMember()}
            <br/>
            <Button onClick={this.logout}>Sign Out</Button>


            <Router>
                
            </Router>
        </div>
    )
    }

}
export default MemberPage;