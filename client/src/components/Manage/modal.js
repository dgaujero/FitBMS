import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from './input'

const ModalTemplate = (props) => {
    console.log(props)
    const {
        buttonLabel,
        className
    } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}Update</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update Class Information</ModalHeader>
                <ModalBody>
                    <Input value={props.value} placeholder={props.name} name={props.statename} onChange={props.changeFunction} />
                    {/* <Input value={props.value} placeholder={props.name} name={props.statename}onChange={props.changeFunction} />
         <Input value={props.value} placeholder={props.name} name={props.statename}onChange={props.changeFunction} /> */}
                </ModalBody>
                <ModalFooter>
                    <button type="submit" onClick={e => props.updateClass(e, props.id)}>Update Class</button>
                    <Button color="primary" onClick={toggle}>Update Class</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default ModalTemplate;




