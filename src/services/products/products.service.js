import { hydrateMenu } from "../../helpers/hydrateMenu.js";

const baseUrl = process.env.BASE_URL;

export const getProductsService = async ()=>{
   const response = await fetch(`${baseUrl}/list.php?i=list`);
   const data = await response.json(); 
   return hydrateMenu(data);
}