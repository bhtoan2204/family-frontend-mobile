import baseUrl from './baseUrl';

const ShoppingListUrls = {
  getAllShoppingListType: `${baseUrl}/api/v1/shopping/getShoppingItemType`,
  getShoppingListByFamily: `${baseUrl}/api/v1/shopping/getShoppingList`,
  getShoppingListItem: `${baseUrl}/api/v1/shopping/getShoppingItem`,
  createShoppingList: `${baseUrl}/api/v1/shopping/createShoppingList`,
  createShoppingListItem: `${baseUrl}/api/v1/shopping/createShoppingItem`,
};

export default ShoppingListUrls;
