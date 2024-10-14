import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Dropdown, DropdownButton, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUser } from '../../../slice/userSlice';
import { EmailTemplate } from '../../../types/emailTypes';
import { EmailTemplateManagerAdd, EmailTemplateManagerDelete, EmailTemplateManagerGet, EmailTemplateManagerUpdate } from '../../../services/emailService';
import Offcanvas from 'react-bootstrap/Offcanvas';

// TODO: NEED TO CHECK ONLY ONE DEAFULT TEMPALTE FOR EACH ONE OF THE STATUS, SHOULD IMPLEMENT IN THE FROTNED
//TODO: Implemt the email store for this,
const EmailTemplateManager: React.FC = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newTemplate, setNewTemplate] = useState<EmailTemplate>({
        id: 0,
        title: '',
        subject: '',
        body: '',
        status: 'Preparation',
        isdefault: false,
    });
    const [show, setShow] = useState(false);
    const [showDefault, setShowDefault] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowDefault = () => setShowDefault(true);
    const handleCloseforDefault = () => setShowDefault(false);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setNewTemplate({ id: 0, title: '', subject: '', body: '', status: 'Preparation', isdefault: false });
        setShowModal(false);
    };

    const handleTemplateSubmit = async () => {

        if (newTemplate.id) {
            // Check for existing templates with the same status and default
            const isDuplicate = templates.some(t =>
                t.id !== newTemplate.id && t.status === newTemplate.status && t.isdefault === newTemplate.isdefault
            );

            if (isDuplicate) {
                // Handle case where a duplicate status and default template is found
                toast.error("A template with the same status and default already exists. Update failed.");
            } else {
                // Proceed with updating the existing template
                setTemplates(templates.map(t => (t.id === newTemplate.id ? newTemplate : t)));
                console.log(newTemplate);

                // Update the template in the backend
                await EmailTemplateManagerUpdate(newTemplate);

            }
        } else {
            // Add new template
            setTemplates([...templates, { ...newTemplate, id: templates.length + 1 }]);
            await EmailTemplateManagerAdd(newTemplate, dispatch);
        }

        handleCloseModal();
    };

    const handleTemplateClick = (template: EmailTemplate) => {
        setSelectedTemplate(template);
        setNewTemplate(template); // Load template details for editing
        handleShowModal();
    };

    const handleTempalteDelete = async () => {
        if (newTemplate.isdefault) {
            //show popup model
            handleShowDefault();
        }
        else {
            const res = await EmailTemplateManagerDelete(newTemplate);
            if (res) {
                handleCloseModal();
                //update in the store
                window.location.reload();
            }
        }

    }

    const handleDropdownChange = (eventKey: string | null) => {
        if (eventKey !== null) {
            setNewTemplate({ ...newTemplate, status: eventKey });
        }
    };

    const handleDefaultCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTemplate({ ...newTemplate, isdefault: e.target.checked });
    };

    //temporary will be moved to navbar
    const fetchEmailTemplates = async () => {
        console.log(sessionStorage.getItem('token'));
        const templates = await EmailTemplateManagerGet();
        if (templates) {

            setTemplates(templates);

        }
    };
    useEffect(() => {
        fetchEmailTemplates();
    }, []);

    return (
        <>
            <h3>Email Template Manager</h3>

            <div>
                <Modal show={showDefault} onHide={handleCloseforDefault}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deleting a Default</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are deleting a default template of the Email!
                        <br></br> Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer className='d-flex'>
                        <Button variant="secondary" onClick={handleCloseforDefault}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={handleCloseforDefault}>
                            Yes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
            <Row>

                <Col sm={4}>
                    <Button variant="primary" onClick={handleShowModal}>
                        Add Email Template
                    </Button>
                    <div className='mt-4'>
                        <h6>Important Note</h6>
                        <Button variant="primary" onClick={handleShow} className="me-2">
                            NOTE
                        </Button>
                        <Offcanvas show={show} onHide={handleClose} placement='top'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>For Email - use placeholder (for replacing ) </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <b>CUSTOMERNAME</b> -- for replacing customer name
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </Col>

                <Col lg={5}>
                    {/* List of default email templates */}
                    <h3 className="mt-4">Default Templates</h3>
                    <Card style={{ width: '24rem' }}>
                        <ListGroup variant="flush">
                            {templates.map(template => (
                                <div key={template.id} className="template-item">
                                    <ListGroup.Item onClick={() => handleTemplateClick(template)} style={{ cursor: 'pointer' }}>
                                        {template.title} {template.isdefault ? <span>({template.status})
                                        </span>
                                            : ""}

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
                                checked={newTemplate.isdefault}  // Assuming `isdefault` is part of the `newTemplate` state
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
                    {
                        newTemplate.id ? <Button variant='danger' onClick={handleTempalteDelete} style={{ cursor: 'pointer' }}>
                            Delete
                        </Button> : ""
                    }

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EmailTemplateManager;
