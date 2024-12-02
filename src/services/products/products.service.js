
const baseUrl = process.env.BASE_URL;

export const getProductsService = async ()=>{
   const response = await fetch(`${baseUrl}/list.php?i=list`);
   return await response.json(); 
}