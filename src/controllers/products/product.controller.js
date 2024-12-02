import {getProductsService} from "../../services/products/products.service.js"

export const getProducts = async (_req, res)=>{
    try {
        const response = await getProductsService();
        if(!response) return res.status(404).send({ message:"not found" });
        return res.json(response);

    } catch (error) {
        res.status(500).json({message:'internal error', error})
    }   
}