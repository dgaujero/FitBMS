import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Container,Row, Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import fire from '../config/fire';
import axios from "axios";

class MemberPortal extends Component{
    constructor(props){
        super(props);
       
        this.state = {
            email: '',
            password : '',
            firstName: '',
            lastName: '',
            bday: '',
            address: '',
            phoneNum: '',
            newEmail: '',
            newPassword : '',
            collapsed : false
            
        }
    }
    
    login = (e) =>{
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((u) => {}).catch((error) => {
            console.log(error);
        })
    }

    signUp = (e) =>{
        e.preventDefault();
        
        fire.auth().createUserWithEmailAndPassword(this.state.newEmail, this.state.newPassword)
        .then((data) => {
            const newMember = {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                address: this.state.address,
                bday: this.state.bday,
                phoneNum : this.state.phoneNum,
                uId : data.user.uid
            }
            axios.post(`/newmember`, newMember)
            .then(res => {
                console.log(res);
            })
        })
        .catch((error) => {
            console.log(error);
        })

    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    toggleModal = () => {
        this.setState({collapsed: !this.state.collapsed});
    };


    render() {
        return(
            <Container className="border mt-5 pb-3">
                <h1>Sign In</h1>
                    <Col>
                        <Form className="text-white">
                        <FormGroup>
                            <Label for="userEmail">Username</Label>
                            <Input type="email" value={this.state.email} onChange={this.handleInputChange} name="email" id="userEmail" placeholder="Enter your email here" />
                            <FormText>99% sure that your email is your username</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="userPassword">Password</Label>
                            <Input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" id="userPassword" placeholder="Password here" />
                        </FormGroup>
                        
                        <Button color="primary" onClick={this.login}>Login</Button>
                        </Form>
                        <h2>Click here to signup</h2>
                        <Button onClick={this.toggleModal}>SignUp</Button>
                    </Col>
                    <Modal isOpen={this.state.collapsed} toggle={this.toggleModal}>
                        <ModalHeader>Sign Up</ModalHeader>
                        <ModalBody>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="newemail">Email</Label>
                                        <Input 
                                        type="email" 
                                        name="newEmail" 
                                        id="newemail" 
                                        value={this.state.newEmail} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="newuserPassword">Password</Label>
                                        <Input 
                                        type="password" 
                                        value={this.state.newPassword} 
                                        onChange={this.handleInputChange} 
                                        name="newPassword" 
                                        id="newuserPassword"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>  
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="firstName">First Name</Label>
                                        <Input 
                                        type="text" 
                                        name="firstName" 
                                        id="firstName" value={this.state.firstName} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lastName">Last Name</Label>
                                        <Input 
                                        type="text" 
                                        name="lastName" 
                                        id="lastName" 
                                        value={this.state.lastName} 
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
                                        value={this.state.address} 
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
                                        value={this.state.bday} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="phone">Phone</Label>
                                        <Input 
                                        type="text" 
                                        name="phoneNum" 
                                        id="phone" 
                                        value={this.state.phoneNum} 
                                        onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                
                            <Row>
                                <Col className="text-center" md={12}>
                                <Button color="primary" onClick={this.signUp}>Sign Up</Button>
                                </Col>
                            </Row>
                        
                        </Form>
                        </ModalBody>
                
                    </Modal>
                    
            </Container>
        )
    }
}

export default MemberPortal;