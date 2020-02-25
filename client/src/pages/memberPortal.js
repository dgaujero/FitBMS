import React, { Component } from 'react';
import Login from '../components/LogIn';
import fire from '../../../config/fire';

class LogInForm extends Component{

    render() {
        return(
            <div>
                <Login></Login>
            </div>
        )
    }
}

export default LogInForm