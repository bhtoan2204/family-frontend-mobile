import baseUrl from './baseUrl';

export const ShoppingListUrls = {
  getShoppingItemType: baseUrl + '/api/v1/shopping/getShoppingItemType',
  getFamilyShoppingList: baseUrl + '/api/v1/shopping/getShoppingList', ///{id_family},
  getFamilyShoppingListDetail: baseUrl + '/api/v1/shopping/getShoppingItem', ///{id_family}/{id_list}
  createShoppingList: baseUrl + '/api/v1/shopping/createShoppingList',
  getShoppingListType: baseUrl + '/api/v1/shopping/getShoppingListType',
  createShoppingItem: baseUrl + '/api/v1/shopping/createShoppingItem',
  updateShoppingList: baseUrl + '/api/v1/shopping/updateShoppingList',
};
