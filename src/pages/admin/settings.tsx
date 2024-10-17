import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Settings } from '../../types/settingTypes';
import { settingServiceGet, settingServiceUpdate } from '../../services/settingServices';

const SettingsPage: React.FC = () => {

    // State to manage the toggle switch for email notifications
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState<boolean>(false);
    const [emailCusotmerNotificationsEnabled, setEmailCustomerNotificationsEnabled] = useState<boolean>(false);

    // State to manage the modal visibility
    const [showModal, setShowModal] = useState<boolean>(false);

    // State to store the email subject and body
    const [emailSubject, setEmailSubject] = useState<string>('Initial Subject');
    const [emailBody, setEmailBody] = useState<string>('Initial Body Content...');

    // Toggle email notification switch
    const handleToggleChange = () => {
        setEmailNotificationsEnabled(!emailNotificationsEnabled);
    };
    const handleToggleChange2 = () => {
        setEmailCustomerNotificationsEnabled(!emailCusotmerNotificationsEnabled);
    };

    // Handle modal open and close
    const handleEditInitialMail = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Handle form submission for email template update
    const handleSaveChanges = () => {
        
        setShowModal(false); // Close modal after saving
        saveDocuments();
    };

    const handleSaveChangesfoBtn = () =>{
        saveDocuments();
    }

    const saveDocuments = async () => {
        const setting: Settings = {
            emailsetting: emailNotificationsEnabled,
            intialsubject: emailSubject,
            intialbody: emailBody,
            customeremail: emailCusotmerNotificationsEnabled,
        }

        //send the response to server
        console.log(setting);
        await settingServiceUpdate(setting);
    }

    const getDocuments = async ()=>{
        const res = await  settingServiceGet();
        if(res != undefined){
            setEmailNotificationsEnabled(res?.emailsetting!);
            setEmailCustomerNotificationsEnabled(res.customeremail!);
            setEmailBody(res.intialbody!);
            setEmailSubject(res.intialsubject!);
        }
    }


    useEffect(()=>{
        getDocuments();
    },[])

    return (
        <div className="container mt-5">
            <h2>Settings</h2>

            {/* Toggle Button for Email Notifications */}
            <Row>
                <Col>
                <Form.Group controlId="emailNotificationsToggle" className="my-4">
                <Form.Label>Recieve email notifications on order status</Form.Label>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={emailNotificationsEnabled ? 'Enabled' : 'Disabled'}
                    checked={emailNotificationsEnabled}
                    onChange={handleToggleChange}
                />
                <Form.Label>Customer email notifications on order status</Form.Label>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={emailCusotmerNotificationsEnabled ? 'Enabled' : 'Disabled'}
                    checked={emailCusotmerNotificationsEnabled}
                    onChange={handleToggleChange2}
                />
            </Form.Group>
                </Col>
                <Col>
                <Button variant="primary" onClick={handleSaveChangesfoBtn}>
                        Save Changes
                    </Button>
                </Col>
            </Row>
            

            {/* Edit Initial Mail Button */}
            <Button variant="primary" onClick={handleEditInitialMail}>
                Edit Initial Mail
            </Button>

            <h4>Admin Role</h4>
            <p>Give and revoke admin access</p>
            <p>Input field for email, 2 btn with grant and revoke</p>

            {/* Modal for Editing Initial Mail */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Initial Mail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Email Subject Input */}
                        <Form.Group className="mb-3" controlId="emailSubject">
                            <Form.Label>Email Subject</Form.Label>
                            <Form.Control
                                type="text"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                placeholder="Enter email subject"
                            />
                        </Form.Group>

                        {/* Email Body Input */}
                        <Form.Group className="mb-3" controlId="emailBody">
                            <Form.Label>Email Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                placeholder="Enter email body content"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SettingsPage;
