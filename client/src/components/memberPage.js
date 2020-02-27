import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Button} from 'reactstrap';
import fire from "../config/fire";


class MemberPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           email: ''
        }
    }

    componentDidMount(){
        this.authListener();
    }
      
    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
            this.setState({email: user.email});
            console.log(user);
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
            
            <h1>Hello</h1> {this.state.email}
            <br/>
            <Button onClick={this.logout}>Sign Out</Button>


            <Router>
                <div className = "memberPageDiv">
                    
                </div>
            </Router>
        </div>
    )
    }

}
export default MemberPage;