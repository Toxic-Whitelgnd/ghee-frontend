import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Settings } from '../../types/settingTypes';
import { settingServiceAdminAccess, settingServiceAdminRevoke, settingServiceGet, settingServiceUpdate } from '../../services/settingServices';

const SettingsPage: React.FC = () => {
    // Existing state for settings
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState<boolean>(false);
    const [emailCustomerNotificationsEnabled, setEmailCustomerNotificationsEnabled] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [emailSubject, setEmailSubject] = useState<string>('Initial Subject');
    const [emailBody, setEmailBody] = useState<string>('Initial Body Content...');
    
    // Admin control state
    const [adminEmail, setAdminEmail] = useState<string>(''); // To capture admin email input

    // Toggle email notification switches
    const handleToggleChange = () => setEmailNotificationsEnabled(!emailNotificationsEnabled);
    const handleToggleChange2 = () => setEmailCustomerNotificationsEnabled(!emailCustomerNotificationsEnabled);

    // Handle modal open and close
    const handleEditInitialMail = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Save changes
    const handleSaveChanges = () => {
        setShowModal(false); // Close modal after saving
        saveDocuments();
    };

    const handleSaveChangesfoBtn = () => saveDocuments();

    const saveDocuments = async () => {
        const setting: Settings = {
            emailsetting: emailNotificationsEnabled,
            intialsubject: emailSubject,
            intialbody: emailBody,
            customeremail: emailCustomerNotificationsEnabled,
        };
        await settingServiceUpdate(setting);
    };

    const getDocuments = async () => {
        const res = await settingServiceGet();
        if (res !== undefined) {
            setEmailNotificationsEnabled(res.emailsetting!);
            setEmailCustomerNotificationsEnabled(res.customeremail!);
            setEmailBody(res.intialbody!);
            setEmailSubject(res.intialsubject!);
        }
    };

    useEffect(() => {
        getDocuments();
    }, []);

    // Grant admin access function (you will need to implement this in your service/backend)
    const grantAdminAccess = async () => {
        if (adminEmail) {
            // Call the backend API to grant access
            console.log(`Granting admin access to ${adminEmail}`);
           await settingServiceAdminAccess(adminEmail);
           setAdminEmail('');
        }
    };

    // Revoke admin access function (you will need to implement this in your service/backend)
    const revokeAdminAccess = async () => {
        if (adminEmail) {
            // Call the backend API to revoke access
            console.log(`Revoking admin access for ${adminEmail}`);
            await settingServiceAdminRevoke(adminEmail);
            setAdminEmail('');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Settings</h2>

            {/* Toggle Button for Email Notifications */}
            <Row>
                <Col>
                    <Form.Group controlId="emailNotificationsToggle" className="my-4">
                        <Form.Label>Receive email notifications on order status</Form.Label>
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
                            label={emailCustomerNotificationsEnabled ? 'Enabled' : 'Disabled'}
                            checked={emailCustomerNotificationsEnabled}
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

            {/* Admin Role Access Control */}
            <h4 className="mt-4">Admin Role</h4>
            <p>Grant and revoke admin access</p>
            
            <Form>
                {/* Input for Admin Email */}
                <Form.Group controlId="adminEmail" className="mb-3">
                    <Form.Label>Enter Email Address for Admin Access</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                </Form.Group>

                {/* Buttons for Grant and Revoke Admin Access */}
                <Row>
                    <Col>
                        <Button variant="success" onClick={grantAdminAccess} disabled={!adminEmail}>
                            Grant Admin Access
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={revokeAdminAccess} disabled={!adminEmail}>
                            Revoke Admin Access
                        </Button>
                    </Col>
                </Row>
            </Form>

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
