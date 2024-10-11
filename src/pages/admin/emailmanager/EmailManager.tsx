import React, { useState } from 'react';
import { Button, Form, Modal, Dropdown, DropdownButton, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

// Interface for email template
interface EmailTemplate {
    id: number;
    title: string;
    subject: string;
    body: string;
    status: string;
    isDefault?: boolean; // Optional field to track default template
}

const EmailTemplateManager: React.FC = () => {
    const [templates, setTemplates] = useState<EmailTemplate[]>([
        { id: 1, title: 'Default Template 1', subject: 'Welcome', body: 'Welcome to our service!', status: 'Preparation', isDefault: true },
        { id: 2, title: 'Default Template 2', subject: 'Order Confirmed', body: 'Your order has been confirmed.', status: 'Ready', isDefault: false },
    ]);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newTemplate, setNewTemplate] = useState<EmailTemplate>({
        id: 0,
        title: '',
        subject: '',
        body: '',
        status: 'Preparation',
        isDefault: false,
    });

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setNewTemplate({ id: 0, title: '', subject: '', body: '', status: 'Preparation', isDefault: false });
        setShowModal(false);
    };

    const handleTemplateSubmit = () => {
        // Reset the 'isDefault' field for all other templates if a new default is set
        if (newTemplate.isDefault) {
            setTemplates(templates.map(t => ({ ...t, isDefault: false })));
        }

        if (newTemplate.id) {
            // Update existing template
            setTemplates(templates.map(t => (t.id === newTemplate.id ? newTemplate : t)));
        } else {
            // Add new template
            setTemplates([...templates, { ...newTemplate, id: templates.length + 1 }]);
            console.log(newTemplate);
            toast.success("Template added successfully");
        }

        handleCloseModal();
    };

    const handleTemplateClick = (template: EmailTemplate) => {
        setSelectedTemplate(template);
        setNewTemplate(template); // Load template details for editing
        handleShowModal();
    };

    const handleDropdownChange = (eventKey: string | null) => {
        if (eventKey !== null) {
            setNewTemplate({ ...newTemplate, status: eventKey });
        }
    };

    const handleDefaultCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTemplate({ ...newTemplate, isDefault: e.target.checked });
    };


    return (
        <>
            <h3>Email Template Manager</h3>

            {/* Add Email Template Button */}
            <Row>
                <Col>
                    <Button variant="primary" onClick={handleShowModal}>
                        Add Email Template
                    </Button>
                </Col>
                <Col>
                    {/* List of default email templates */}
                    <h3 className="mt-4">Default Templates</h3>
                    <Card style={{ width: '24rem' }}>
                        <ListGroup variant="flush">
                            {templates.map(template => (
                                <div key={template.id} className="template-item">
                                    <ListGroup.Item onClick={() => handleTemplateClick(template)} style={{ cursor: 'pointer' }}>
                                        {template.title} {template.isDefault ? <div>({template.status})</div> : "" }
                                    </ListGroup.Item>
                                </div>
                            ))}
                        </ListGroup>
                    </Card>

                </Col>
            </Row>




            {/* Modal for Adding/Editing Email Template */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{newTemplate.id ? 'Edit Email Template' : 'Add Email Template'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTemplateTitle">
                            <Form.Label>Template Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTemplate.title}
                                onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                                placeholder="Enter title"
                            />
                        </Form.Group>

                        <Form.Group controlId="formTemplateSubject" className="mt-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTemplate.subject}
                                onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                                placeholder="Enter subject"
                            />
                        </Form.Group>

                        <Form.Group controlId="formTemplateBody" className="mt-3">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={newTemplate.body}
                                onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
                                placeholder="Enter email body"
                            />
                        </Form.Group>

                        {/* Dropdown for template status */}
                        <Form.Group controlId="formTemplateStatus" className="mt-3">
                            <Form.Label>Status</Form.Label>
                            <DropdownButton
                                id="dropdown-status-button"
                                title={newTemplate.status}
                                onSelect={handleDropdownChange}
                            >
                                <Dropdown.Item eventKey="Preparation">Preparation</Dropdown.Item>
                                <Dropdown.Item eventKey="Ready">Ready</Dropdown.Item>
                                <Dropdown.Item eventKey="Out for Delivery">Out for Delivery</Dropdown.Item>
                                <Dropdown.Item eventKey="Delivered">Delivered</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                        <Form.Group controlId="formDefaultCheckbox" className="mt-3">
                            <Form.Check 
                                type="checkbox"
                                label="Set as default template"
                                checked={newTemplate.isDefault}  // Assuming `isDefault` is part of the `newTemplate` state
                                onChange={handleDefaultCheckboxChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleTemplateSubmit}>
                        {newTemplate.id ? 'Update Template' : 'Add Template'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EmailTemplateManager;
