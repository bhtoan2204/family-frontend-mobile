import baseUrl from './baseUrl';

const ShoppingListUrls = {
  getShoppingListType: `${baseUrl}/api/v1/shopping/getShoppingListType`,
  getAllShoppingListItemType: `${baseUrl}/api/v1/shopping/getShoppingItemType`,
  getShoppingListByFamily: `${baseUrl}/api/v1/shopping/getShoppingList`,
  getShoppingListItem: `${baseUrl}/api/v1/shopping/getShoppingItem`,
  createShoppingList: `${baseUrl}/api/v1/shopping/createShoppingList`,
  updateShoppingList: `${baseUrl}/api/v1/shopping/updateShoppingList`,
  deleteShoppingList: `${baseUrl}/api/v1/shopping/deleteShoppingList`,
  createShoppingListItem: `${baseUrl}/api/v1/shopping/createShoppingItem`,
  updateShoppingListItem: `${baseUrl}/api/v1/shopping/updateShoppingItem`,
  deleteShoppingListItem: `${baseUrl}/api/v1/shopping/deleteShoppingItem`,
};

export default ShoppingListUrls;
