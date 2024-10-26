import React, { useEffect, useState } from "react";
import { Button, Form, Table, Modal } from "react-bootstrap";
import { Product, ImageData, ProductImages } from "../../../types/productTypes";
import { toast } from "react-toastify";
import { productManagerAdd, productManagerDelete, productManagerGet, productManagerUpdate, productSeriveGet, productServiceDelete, productServicesUploadImages, productServiceUpdate } from "../../../services/productServices";

//TODO: NEED TO ADD EDIT , DELETE AND GET PRODUCT

const ProductManager: React.FC = () => {

    const productInitialState: Product = {
        id: 0,
        name: "",
        price: [],
        offerpercentage: 0,
        quantity: 0,
        quantitysize: [],
        instock: true,
        ratings: 0,
        ratingStar: "0",
        description: "",
        images: [],  // Initialize with an empty array
    };

    const [products, setProducts] = useState<Product[]>([]); // Stores the list of products
    const [product, setProduct] = useState<Product>(productInitialState); // Stores the current product
    const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Stores the product being edited
    const [showModal, setShowModal] = useState(false); // Controls the modal visibility
    const [priceInput, setPriceInput] = useState(""); // Input for product prices
    const [quantitySizeInput, setQuantitySizeInput] = useState(""); // Input for product quantity sizes
    const [pimages, setImages] = useState<ImageData[]>([]);

    // Handle changes for product fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
      
        setProduct({
            ...product,
            [name]: value,
        });

    };

    const handleQuantitychange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const val = parseInt(e.target.value);
        console.log(val);
        setProduct({
            ...product,
            quantity:val,
        })
    }

    // Handle price and quantity size inputs
    const handleAddPrice = () => {
        const price = parseFloat(priceInput);
        if (!isNaN(price)) {
            setProduct({
                ...product,
                price: [...product.price, price],
            });
            setPriceInput(""); // Clear input after adding
        }
    };

    const handleAddQuantitySize = () => {
        const size = parseInt(quantitySizeInput, 10);
        if (!isNaN(size)) {
            setProduct({
                ...product,
                quantitysize: [...product.quantitysize!, size],
            });
            setQuantitySizeInput(""); // Clear input after adding
        }
    };

    const isFile = (img: any): img is File => {
        return img instanceof File;
    };

    // Handle form submission for adding/updating products
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (product.price.length !== product.quantitysize!.length) {
            toast.error("The price and quantity size arrays must have the same length.");
            return; // Stop submission if the arrays are not the same length
        }

        if (editingProduct) {
            // Update the existing product
            const imageFiles: File[] = product.images?.filter(isFile) || []; // Filter only File instances
            const imageData: ImageData[] = product.images?.filter((img) => !isFile(img)) as ImageData[]; // Filter only ImageData instances

            console.log("edited product", editingProduct);
            // Make sure to pass both imageFiles and imageData if needed
            // const res = await productManagerUpdate(product, imageFiles, imageData);
            const res = await productServiceUpdate(product);
            if (res) {
                setProducts((prevProducts) =>
                    prevProducts.map((p) => (p.id === res.id ? res : p))
                );
            } else {
                toast.error('Failed to add the product');
            }
        } else {
            console.log(product);
            const productimages : ProductImages ={
                name: product.name,
                images: pimages
            }
            const res = await productManagerAdd(product,productimages);
            // await productServicesUploadImages(productimages);
            if (res) {
                setProducts((prevProducts) => [...prevProducts, res]);
            } else {
                toast.error('Failed to add the product');
            }
        }
        setProduct(productInitialState); // Reset form
        setEditingProduct(null); // Reset edit state
        setShowModal(false); // Close modal
    };

    // Handle deleting a product
    const handleDelete = async (product: Product) => {
        const res = await productServiceDelete(product)
        if (res) {
            setProducts(products.filter(p => p.name !== product.name));
        }

    };

    // Handle editing a product
    const handleEdit = (product: Product) => {
        setProduct(product);
        setEditingProduct(product);
        setShowModal(true); // Open modal for editing
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImagesPromises: Promise<ImageData>[] = Array.from(files).map((file) => {
                return new Promise<ImageData>((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file); // Read as base64
                    reader.onloadend = () => {
                        if (reader.result) {
                            resolve({
                                fileName: file.name,
                                contentType: file.type,
                                data: reader.result as string, // Cast to string (base64)
                            });
                        }
                    };
                });
            });
            console.log(pimages);
            // Use Promise.all to wait for all files to be processed
            Promise.all(newImagesPromises).then((imageData) => {
                setImages((prevImages) => [...prevImages, ...imageData]);
            });
        }
    };

    const handleRemovePrice = (index: number) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            price: prevProduct.price.filter((_, i) => i !== index), // Remove price at the specified index
        }));
    };

    const handleRemoveQuantity = (index: number) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            quantitysize: prevProduct.quantitysize!.filter((_, i) => i !== index), // Remove price at the specified index
        }));
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove the image at the specified index
      };

    //TODO: SHOULD MOVE
    const getProductlist = async () => {
        const product = await productSeriveGet();
        if (product) {
            setProducts(product);
        }

    }
    useEffect(() => {
        getProductlist();
    }, []);

    return (
        <>
            <Button
                onClick={() => {
                    setProduct(productInitialState); // Reset the form to initial values
                    setEditingProduct(null); // Ensure no product is being edited
                    setShowModal(true); // Show the modal
                }}
            >
                Add Product
            </Button>

            {/* Table to display products */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity Sizes</th>
                        <th>In Stock</th>
                        <th>Ratings</th>
                        <th>Rating Star</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price.join(", ")}</td>
                            <td>{product.quantitysize!.join(", ")}</td>
                            <td>{product.instock ? "Yes" : "No"}</td>
                            <td>{product.ratings}</td>
                            <td>{product.ratingStar}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(product)}>
                                    Edit
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleDelete(product)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for adding/editing product */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                                disabled={editingProduct? true: false}
                            />
                        </Form.Group>

                        <Form.Group controlId="offerpercentage">
                            <Form.Label>Offer Percentage</Form.Label>
                            <Form.Control
                                type="number"
                                name="offerpercentage"
                                value={product.offerpercentage}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>


                        <Form.Group controlId="price">
                            <Form.Label>Prices</Form.Label>
                            <Form.Control
                                type="text"
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                                placeholder="Enter price and click Add"
                            />
                            <Button variant="secondary" onClick={handleAddPrice}>
                                Add Price
                            </Button>
                            <ul>
                                {product.price.map((p, index) => (
                                    <li key={index}>
                                        {p}
                                        <span onClick={() => handleRemovePrice(index)} style={{ marginLeft: '10px' }}>
                                            x
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>

                        <Form.Group controlId="quantitysize">
                            <Form.Label>Quantity Sizes</Form.Label>
                            <Form.Control
                                type="text"
                                value={quantitySizeInput}
                                onChange={(e) => setQuantitySizeInput(e.target.value)}
                                placeholder="Enter size and click Add"
                            />
                            <Button variant="secondary" onClick={handleAddQuantitySize}>
                                Add Quantity Size
                            </Button>
                            <ul>
                                {product.quantitysize!.map((q, index) => (
                                    <li key={index}>
                                        {q}
                                        <span onClick={() => handleRemoveQuantity(index)} style={{ marginLeft: '10px' }}>
                                            x
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>

                        <Form.Group controlId="instock">
                            <Form.Check
                                type="checkbox"
                                label="In Stock"
                                name="instock"
                                checked={product.instock}
                                onChange={(e) => setProduct({ ...product, instock: e.target.checked })}
                            />
                        </Form.Group>

                        <Form.Group controlId="quantity">
                            <Form.Label>Default Quantity</Form.Label>
                            <Form.Control
                                as="select"
                                name="quantity"
                                value={product.quantity}
                                onChange={handleQuantitychange}
                                required
                            >
                                {/* Render options based on quantitysize */}
                                {product.quantitysize?.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="ratings">
                            <Form.Label>Ratings</Form.Label>
                            <Form.Control
                                type="number"
                                name="ratings"
                                value={product.ratings}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="ratingStar">
                            <Form.Label>Rating Star</Form.Label>
                            <Form.Control
                                type="text"
                                name="ratingStar"
                                value={product.ratingStar}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                name="images"
                                accept="image/*"
                                onChange={handleImageFileChange}
                                multiple  // Allow multiple image uploads
                                disabled={editingProduct ? true : false}
                            />
                            <ul>
                         
                                {product?.images?.map((image, index) => (
                                    <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                              
                                        {image instanceof File ? (
                                            <span>{image.name}</span>
                                        ) : (
                                  
                                            <>
                                                <span>{(image as ImageData).fileName}</span>
                                                <img src={image.data} alt={image.fileName} width="100" />
                                            </>
                                        )}

                          
                                        {!editingProduct && (
                                            <span
                                                onClick={() => handleRemoveImage(index)}
                                                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                            >
                                                Remove
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* <ul>
                                {pimages.map((img, index) => (
                                    <li key={index}>
                                        <p>{img.fileName.slice(0,20)} - {img.contentType}</p>
                                 
                                        <img src={img.data} alt={img.fileName} width="100" />
                                        <button onClick={() => handleRemoveImage(index)}>Remove</button>
                                    </li>
                                ))}
                            </ul> */}

                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editingProduct ? "Update Product" : "Add Product"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProductManager;
