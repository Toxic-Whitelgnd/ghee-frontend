import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { urlFor } from '../../lib/client';

// Define the structure for images with base64 encoding
interface Image {
    asset: {
      _id: string;
      url: string;
    };
    caption: string;
  }


interface ImageSelectorProps {
    images: Image[]; // Array of images with base64 data
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images }) => {
    // Initialize the main image to the first image's data URL
    const [mainImage, setMainImage] = useState<Image>(images[0]);

    const handleImageClick = (img: Image) => {
        setMainImage(img);
    };

    return (
        <Container>
            <Row className="justify-content-center mb-3">
                {/* Main image display */}
                <Col xs={12} md={8}>
                    <Card className="p-3" style={{ maxWidth: '800px', height: '300px' }}>
                        {mainImage ? (
                            <Image src={urlFor(mainImage.asset).width(300).url()} style={{ objectFit: 'contain', width: '100%', height: '100%' }} rounded />
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
                            className={`p-1 ${mainImage ? 'border-primary' : ''}`} // Highlight selected image
                            style={{ cursor: 'pointer' }}
                        >
                            <Image
                                src={urlFor(img.asset).width(300).height(300).url()}
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
