import React, { useState } from 'react';
import './Footer.css';
import * as Fiico from 'react-icons/fi';
import { Modal, Button } from 'react-bootstrap';
import { ADDITIONAL } from '../../utils/constants';

export default function Footer() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    // Function to handle opening the modal
    const handleShowModal = (title: string, content: string) => {
        setModalTitle(title);
        setModalContent(content);
        setShowModal(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <div className="footer-basic">
                <footer>
                    <div className="socialico">
                        <a href="https://www.facebook.com/people/Codecademy-JU-Chapter/100073383202752/?sk=grid"><Fiico.FiFacebook className='ml-2 mt-2' /></a>
                        <a href="https://www.instagram.com/codecademyjuchapter/"><Fiico.FiInstagram className='ml-2 mt-2' /></a>
                        <a href="https://twitter.com/codecademyjuch"><Fiico.FiTwitter className='ml-2 mt-2'/></a>
                        <a href="https://github.com/Codecademy-JU-Chapter"><Fiico.FiGithub className='ml-2 mt-2'/></a>
                    </div>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">Home</a></li>
                        <li className="list-inline-item"><a href="#">Services</a></li>
                        <li className="list-inline-item"><a  onClick={() => handleShowModal(ADDITIONAL.ABOUTUS, ADDITIONAL.ABOUTUSDESC)}>About</a></li>
                        <li className="list-inline-item"><a  onClick={() => handleShowModal(ADDITIONAL.TERMSANDCONDITION, ADDITIONAL.TERMSANDCONDITIONDESC)}>Terms</a></li>
                        <li className="list-inline-item"><a  onClick={() => handleShowModal(ADDITIONAL.PRIVACYPOLICY,ADDITIONAL.PRIVACYPOLICYDESC)}>Privacy Policy</a></li>
                    </ul>
                    <p className="copyright">Made by Tarun 💖 © 2024</p>
                </footer>
            </div>

            {/* Modal for displaying content */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ whiteSpace: 'pre-wrap' }}>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
