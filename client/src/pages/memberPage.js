import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'


class MemberPage extends React.Component{
    
    
    render() {
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
        
        HELLO 


        <Router>
            <div className = "memberPageDiv">
                
            </div>
        </Router>
    </div>
    
    }

}
export default MemberPage;