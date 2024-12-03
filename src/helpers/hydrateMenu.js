export const hydrateMenu = (productList) => {

  const imageUrl = process.env.IMAGE_URL;
  const  { meals } = productList
  return meals.map((item) => ({
    ...item,
    price: Math.round((Math.random() * 1000), 2),
    imageUrl: `${imageUrl}/${item.strIngredient}.png`,
  }));
};
