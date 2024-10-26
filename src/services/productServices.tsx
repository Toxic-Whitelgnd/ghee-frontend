import { toast } from "react-toastify"
import { Product, ProductDTO, ProductUpdateDTO, ImageData, ProductImages } from "../types/productTypes"
import axios, { AxiosResponse } from "axios";
import { APIS, PRODUCT } from "../utils/constants";


export const productManagerAdd = async (product: Product, productImages: ProductImages): Promise<Product | undefined> => {
    
      // Construct the ProductDTO with modified images
      const productdto: ProductDTO = {
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
      };
        
    try {
        const response: AxiosResponse<Product> = await axios.post(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`, productdto, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
        console.log('Product created successfully:', response.data);
        toast.success("Product added successfully");
        await productServicesUploadImages(productImages);
        return response.data;
    } catch (error) {
        return undefined;
    }
}

export const productManagerGet: () => Promise<Product[] | undefined> = async () => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`);
        return response.data;

    } catch (error) {
        toast.error("Failed to get the product list")
        return [];
    }
}

export const productSeriveGet: () => Promise<Product[] | undefined> = async () => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}${PRODUCT.NEWGET}`);
        return response.data;

    } catch (error) {
        toast.error("Failed to get the product list")
        return [];
    }
}

export const productManagerUpdate = async (
    product: Product,
    imageFiles: File[],
    imageData: ImageData[] 
): Promise<Product | undefined> => {
    const productdto: ProductUpdateDTO = {
        id: product.id,
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    };
    

    try {
        const response: AxiosResponse<Product> = await axios.put(
            `${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`, productdto     
        );
        console.log('Product Updated successfully:', response.data);
        toast.success("Product Updated successfully");
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update the product');
        return undefined;
    }
};

export const productManagerDelete = async (product: Product) => {
    const productdto: ProductDTO = {
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    }
    try {
        const response = await axios.delete(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`, {
            data: productdto
        });
        if (response.status === 200) {
            toast.success("Product deleted successfully");
            return true;
        }
    } catch (error) {
        toast.error("Failed to delete the Product")
        return false;
    }
}

export const productServicesUploadImages = async (productimages: ProductImages) =>{
    // const processedImages = productimages.images.map((image) => ({
    //     ...image,
    //     data: image.data.replace(/^data:image\/\w+;base64,/, ''), // Remove MIME type prefix
    //   }));
    try {
        const response = await axios.post(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}${PRODUCT.IMAGES}`,productimages, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        console.log(response.status);

    } catch (error) {
        toast.error("Failed to get the product list")
        return [];
    }
}

export const productServiceUpdate = async (product: Product) : Promise<Product | undefined> => {
    const productdto: ProductUpdateDTO = {
        id: product.id,
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    };
    
    try {
        const response: AxiosResponse<Product> = await axios.put(
            `${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}${PRODUCT.NEWUPDATE}`, productdto     
        );
        console.log('Product Updated successfully:', response.data);
        toast.success("Product Updated successfully");
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update the product');
        return undefined;
    }
};

export const productServiceDelete = async (product: Product) => {
    const productdto: ProductDTO = {
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    }
    try {
        const response = await axios.delete(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}${PRODUCT.NEWDELETE}`, {
            data: productdto
        });
        if (response.status === 200) {
            toast.success("Product deleted successfully");
            return true;
        }
    } catch (error) {
        toast.error("Failed to delete the Product")
        return false;
    }
}