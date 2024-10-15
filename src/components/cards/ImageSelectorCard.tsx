import React, { useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

interface ImageSelectorProps {
    images: string[]; // Array of image URLs
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images }) => {
    const [mainImage, setMainImage] = useState<string>(images[0]); // Set the first image as the main image by default

    const handleImageClick = (img: string) => {
        setMainImage(img); // Set clicked image as the main image
    };

    return (
        <Container>
            <Row className="justify-content-center mb-3">
                {/* Main image display */}
                <Col xs={12} md={8}>
                    <Card className="p-3" style={{ maxWidth: '800px', height: '300px' }}>
                        <Image src={mainImage} style={{ objectFit: 'contain', width: '100%', height: '100%' }} rounded />
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                {/* Preview images display */}
                {images.map((img, index) => (
                    <Col xs={3} md={2} key={index} className="mb-2">
                        <Card
                            onClick={() => handleImageClick(img)}
                            className={`p-1 ${mainImage === img ? 'border-primary' : ''}`} // Highlight selected image
                            style={{ cursor: 'pointer' }}
                        >
                            <Image src={img} thumbnail />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ImageSelector;
