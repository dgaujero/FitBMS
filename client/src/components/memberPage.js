import React,{Component} from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import fire from "../config/fire";
import axios from 'axios';
import moment from 'moment';


class MemberPage extends Component{
    constructor(props){
        super(props);
        this.state = {
           uId: '',
           firstName: '',
           lastName: '',
           bday: '',
           email: '',
           address: '',
           phoneNum: '',
           ePhoneNum: '',
           collapsed: false
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
        this.setState({firstName: res.data.member[0].firstName});
        this.setState({lastName: res.data.member[0].lastName});
        this.setState({bday: moment(res.data.member[0].bday).format("YYYY/MM/DD")});
        this.setState({phoneNum: res.data.member[0].phoneNum});
        this.setState({email: res.data.member[0].email});
        this.setState({address: res.data.member[0].address});
        this.setState({ePhoneNum: res.data.member[0].emergNum});
          console.log(res);
        })
      .catch(err => console.log(err));
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    toggleNavbar = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    updateProfile = (event) => {
        event.preventDefault();
        const profileUpdate= { 
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            bday: this.state.bday,
            phoneNum: this.state.phoneNum,
            ePhoneNum: this.state.ePhoneNum,
            uId: this.state.uId
          };
          console.log(profileUpdate);
      
      axios.put(`updatemember/`, { profileUpdate })
      .then(res => {
          console.log(res);
          console.log(res.data);
      })
    }
    
    render() {
        
        return(
        <div>
            <div>
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">FitBMS</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="" onClick={this.logout}>Sign Out</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
            </div>
            
            <Container className="border mt-5 pb-3">
                <h1>Profile</h1>
                    <Col>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input type="text" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input type="text" name="address" id="address" value={this.state.address} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="bday">Birthday</Label>
                                        <Input type="text" name="bday" id="bday" value={this.state.bday} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="text" name="email" id="email" value={this.state.email} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input type="text" name="phone" id="phone" value={this.state.phoneNum} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="ePhone">Emergency Phone</Label>
                                        <Input type="text" name="ePhone" id="ePhone" value={this.state.ePhoneNum} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        
                        
                        <Button color="primary" onClick={this.updateProfile}>Update</Button>
                        </Form>
                
                    </Col>
                    
                    
            </Container>
        
        </div>
    )
    }

}
export default MemberPage;