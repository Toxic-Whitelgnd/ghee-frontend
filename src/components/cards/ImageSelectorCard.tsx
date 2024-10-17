import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

// Define the structure for images with base64 encoding
interface ImageData {
    fileName: string;
    contentType: string;
    data: string; // Base64 encoded data
}

interface ImageSelectorProps {
    images: ImageData[]; // Array of images with base64 data
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images }) => {
    // Initialize the main image to the first image's data URL
    const [mainImage, setMainImage] = useState<string>(
        images.length > 0
            ? `data:${images[0].contentType};base64,${images[0].data}`
            : ''
    );

    const handleImageClick = (img: ImageData) => {
        // Construct the image source using base64 data
        const imageUrl = `data:${img.contentType};base64,${img.data}`;
        setMainImage(imageUrl);
    };

    return (
        <Container>
            <Row className="justify-content-center mb-3">
                {/* Main image display */}
                <Col xs={12} md={8}>
                    <Card className="p-3" style={{ maxWidth: '800px', height: '300px' }}>
                        {mainImage ? (
                            <Image src={mainImage} style={{ objectFit: 'contain', width: '100%', height: '100%' }} rounded />
                        ) : (
                            <p>No Image Selected</p>
                        )}
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center">
                {/* Preview images display */}
                {images.map((img, index) => (
                    <Col xs={3} md={2} key={index} className="mb-2">
                        <Card
                            onClick={() => handleImageClick(img)}
                            className={`p-1 ${mainImage === `data:${img.contentType};base64,${img.data}` ? 'border-primary' : ''}`} // Highlight selected image
                            style={{ cursor: 'pointer' }}
                        >
                            <Image
                                src={`data:${img.contentType};base64,${img.data}`}
                                thumbnail
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ImageSelector;
