import React from "react";
import { Button } from "react-bootstrap";
import { APIS } from "../../../utils/constants";


//TODO: NEED TO ADD EDIT , DELETE AND GET PRODUCT

const ProductManager: React.FC = () => {

    

    function handleSanityStudio(): void {
        window.open(APIS.SANITYAPI, '_blank');
    }

    return (
        <>
            <Button
                onClick={handleSanityStudio}
            >
                View Product DashBoard
            </Button>
           
        </>
    );
};

export default ProductManager;
