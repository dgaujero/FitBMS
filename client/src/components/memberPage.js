import React,{Component} from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { Alert, Media, Button, Form, FormGroup, Label, Input, Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody} from 'reactstrap';
import fire from "../config/fire";
import axios from 'axios'; 
import moment from 'moment';
import placeholderImage from '../utils/profile-placeholder.jpg';


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
           profilePic: placeholderImage,
           profilePicToChange: '',
           emailToChange: '',
           passwordToChange: '',
           passwordToAuth: '',
           alertMessage: '',
           collapsed: false,
           emailCollapsed: false,
           passwordCollapsed: false,
           alertVisible: false,
           successVisible: false
        }
    }
    
    componentDidMount(){
        this.authListener();
    }
      
    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if(user){
            this.setState({uId: user.uid});
            this.setState({email: user.email});
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
        this.setState({bday: moment(res.data.member[0].bday).format("YYYY-MM-DD")});
        this.setState({phoneNum: res.data.member[0].phoneNum});
        this.setState({address: res.data.member[0].address});
        this.setState({ePhoneNum: res.data.member[0].ePhoneNum});
        this.setState({profilePic: res.data.member[0].profilePic});
          console.log(res.data.member[0]);
        })
      .catch(err => console.log(err));
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    toggleNavbar = () => {
        this.setState({collapsed: !this.state.collapsed});
    };

    toggleEmailUpdate = () =>{
        this.setState({emailCollapsed: !this.state.emailCollapsed, passwordToAuth: '', emailToChange: ''});
    }

    togglePasswordUpdate = () =>{
        this.setState({passwordCollapsed: !this.state.passwordCollapsed, passwordToAuth: '', passwordToChange: ''});
    }

    toggleAlert = () => {
        this.setState({alertVisible: true} , ()=>{
            window.setTimeout(()=>{
                this.setState({alertVisible:false})
              },2000)
        });
       
    }

    toggleSuccess = () => {
        this.setState({successVisible: true} , ()=>{
            window.setTimeout(()=>{
                this.setState({successVisible:false})
              },2000)
        });
        
    }

    updateEmail = () => {
        const pass = this.state.passwordToAuth;
        const email = this.state.emailToChange;
        const this2 = this;
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                fire.auth()
                    .signInWithEmailAndPassword(user.email, pass)
                    .then(function(userCredential) {
                        userCredential.user.updateEmail(email).then(() => {
                            this2.toggleSuccess();
                        }).catch((error) => {
                            this2.toggleAlert();
                        });
                    }).catch((error) => {
                        this2.toggleAlert();
                    })
            }
            else{
            this2.setState({user: null});
            }
        });
        this.setState({emailCollapsed: !this.state.emailCollapsed});
    }

    updatePassword = () => {
        const pass = this.state.passwordToAuth;
        const newPass = this.state.passwordToChange;
        const this2 = this;
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                fire.auth()
                    .signInWithEmailAndPassword(user.email, pass)
                    .then(function(userCredential) {
                        userCredential.user.updatePassword(newPass).then(() => {
                            this2.toggleSuccess();
                            
                        }).catch((error) => {
                            this2.toggleAlert();
                        });
                    }).catch((error) => {
                        this2.toggleAlert();
                    })
            }
            else{
            this.setState({user: null});
            }
        });
        this.setState({passwordCollapsed: !this.state.passwordCollapsed});
    }

    updateProfile = (event) => {
        event.preventDefault();
        const profileUpdate= { 
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            address: this.state.address,
            bday: this.state.bday,
            phoneNum: this.state.phoneNum,
            ePhoneNum: this.state.ePhoneNum,
            profilePic: this.state.profilePicToChange,
            uId: this.state.uId
          };
          console.log(profileUpdate);
      
      axios.put(`/updatemember/`, { profileUpdate })
      .then(res => {
          console.log(res);
          window.location.reload();
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
            <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.state.toggleAlert}>
                    Something went wrong with that request.
            </Alert>
            <Alert color="success" isOpen={this.state.successVisible} toggle={this.state.toggleSuccess}>
                    Update was successful.
            </Alert>
                   
            
            <Container className="border mt-5 pb-3">
                <h1>Profile</h1>
                    
                        <Row className = "mb-3">
                            <Col md={6}>
                                <Media
                                    src={this.state.profilePic || placeholderImage} 
                                    style={ 
                                        {   maxHeight: 256,
                                            maxWidth: 256,
                                    }}/>
                            </Col>
                        </Row>                
                        
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input 
                                        type="text" 
                                        name="firstName" 
                                        id="firstName" 
                                        value={this.state.firstName || ''} 
                                        onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input 
                                        type="text" 
                                        name="lastName" 
                                        id="lastName" 
                                        value={this.state.lastName || ''} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="address">Address</Label>
                                        <Input 
                                        type="text" 
                                        name="address" 
                                        id="address" 
                                        value={this.state.address || ''} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleDate">Birthday</Label>
                                        <Input
                                        type="date"
                                        name="bday"
                                        id="bday"
                                        value={this.state.bday || ''} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                        
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input 
                                        type="text" 
                                        name="phoneNum" 
                                        id="phone" 
                                        value={this.state.phoneNum || ''} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="ePhone">Emergency Phone</Label>
                                        <Input 
                                        type="text" 
                                        name="ePhoneNum" 
                                        id="ePhone" 
                                        value={this.state.ePhoneNum || ''} 
                                        onChange={this.handleInputChange}
                                        placeholder="Enter emergency phone number here" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="profilepic">Profile Picture Link</Label>
                                        <Input 
                                        type="text" 
                                        name="profilePicToChange" 
                                        id="profilePic" 
                                        value={this.state.profilePicToChange || ''} 
                                        onChange={this.handleInputChange}
                                        placeholder="Enter link to image source here" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        
                        <Row>
                            <Button className="mr-3 ml-3" color="primary" onClick={this.updateProfile}>Update Profile</Button>
                            <Button className="mr-3 ml-3" color="warning" onClick={this.toggleEmailUpdate}>Change Email</Button>
                            <Button className="mr-3 ml-3" color="secondary" onClick={this.togglePasswordUpdate}>Change Password</Button>
                        </Row>
                    </Form>
                                
                    <Modal isOpen={this.state.emailCollapsed} toggle={this.toggleEmailUpdate}>
                        <ModalHeader>Change Your Email</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="password">Current Password</Label>
                                            <Input 
                                            type="password" 
                                            name="passwordToAuth" 
                                            id="password" 
                                            value={this.state.passwordToAuth} 
                                            onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="emailToChange">New Email</Label>
                                            <Input 
                                            type="email" 
                                            value={this.state.emailToChange} 
                                            onChange={this.handleInputChange} 
                                            name="emailToChange" 
                                            id="emailToChange"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="mr-3" color="warning" onClick={this.updateEmail}>Update Email</Button>           
                            </Form>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.passwordCollapsed} toggle={this.togglePasswordUpdate}>
                        <ModalHeader>Change Your Password</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="password">Current Password</Label>
                                            <Input 
                                            type="password" 
                                            name="passwordToAuth" 
                                            id="password" 
                                            value={this.state.passwordToAuth} 
                                            onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="emailToChange">New Password</Label>
                                            <Input 
                                            type="password" 
                                            value={this.state.passwordToChange} 
                                            onChange={this.handleInputChange} 
                                            name="passwordToChange" 
                                            id="passwordToChange"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button className="mr-3" color="warning" onClick={this.updatePassword}>Update Password</Button>           
                            </Form>
                        </ModalBody>
                    </Modal>

                   
            
            </Container>
        
        </div>
    )
    }

}
export default MemberPage;