import React, { Component } from "react";
import axios from 'axios';
import Input from './input'
import FormButton from './formButton'
import List from '../List'
import ListItem from '../ListItem'
import ModalTemplate from './modal'
import './manage.css';

class Classes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            nameOfClass: "",
            classToEdit: "",
            classType: "",
            assignedTrainer: "",
            classSize: ""
        }
    };
    componentDidUpdate() {
        console.log("new state", this.state)
    }
    componentDidMount() {
        this.loadClasses();
    }
    loadClasses = () => {
        axios.get('/classes')
            .then((response) => {
                console.log(response)
                this.setState({ classes: response.data.classes })
            })
    };
    renderClasses = () => {
        return this.state.classes.map(classList => (
            <div key={classList.id}>
                {classList.nameOfClass} {classList.classType}
                {classList.assignedTrainer} {classList.classSize}
            </div>
        ))
    };
    handleInputChange = (event, data) => {
        console.log(event)
        const { name, value } = event.target
        this.setState({ [name]: value });
    };
    handleInputChangeToo = (event) => {
        console.log(event)
        const { name, value } = event.target
        this.setState({ [name]: value });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        const addClass = {
            nameOfClass: this.state.nameOfClass,
            classType: this.state.classType,
            assignedTrainer: this.state.assignedTrainer,
            classSize: this.state.classSize
        };
        console.log(addClass.nameOfClass);
        console.log(addClass.classType)
        axios.post(`/classes/add`, { addClass })
            .then(res => {
                this.loadClasses();
                console.log(res);
                console.log(res.data);
            })
    }
    updateClass = (e, data) => {
        e.preventDefault();
        console.log(this.state.classToEdit)
        const updateClass = {
            nameOfClass: this.state.classToEdit
        }
        axios.put(`/classes/id/${data}`, updateClass)
            .then(res => {
                this.setState({ classToEdit: '' })
                this.loadClasses()
            }
            )
            .catch(err => console.log(err));
    };
    render() {
        return (
            <div className="classes-container">
                <h1>Classes</h1>
                {this.renderClasses()}
                <form>
                    <Input
                        value={this.state.nameOfClass}
                        onChange={this.handleInputChange}
                        name="nameOfClass"
                        placeholder="Class Name (required)"
                    />
                    <Input
                        value={this.state.classType}
                        onChange={this.handleInputChange}
                        name="classType"
                        placeholder="Class Type (required)"
                    />
                    <Input
                        value={this.state.assignedTrainer}
                        onChange={this.handleInputChange}
                        name="assignedTrainer"
                        placeholder="Assigned Trainer (required)"
                    />
                    <Input

                        value={this.state.classSize}
                        onChange={this.handleInputChange}
                        name="classSize"
                        placeholder="Class Size (required)"
                    />
                    <FormButton
                        onClick={this.handleFormSubmit}
                    >
                        Add Class
                    </FormButton>
                </form>
                <List>
                    {this.state.classes.map(classUpdate => {
                        return (
                            <ListItem
                                key={classUpdate.id}>
                                <strong>
                                    {classUpdate.nameOfClass} {classUpdate.classType}
                                    {classUpdate.assignedTrainer} {classUpdate.classSize}
                                </strong>
                                <ModalTemplate value={this.state.classToEdit} statename="classToEdit" id={classUpdate.id} updateClass={this.updateClass} changeFunction={this.handleInputChangeToo} name={classUpdate.classType} />
                                <button type="submit" onClick={e => this.updateClass(e, classUpdate.id)}>Update Class</button>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        )
    }
}
export default Classes;