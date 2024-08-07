export interface ShoppingListType {
    id_shopping_list_type: number;
    type_name_en: string;
    type_name_vn: string;
    icon_url: string;
}


export interface ShoppingListItemType {
    id_item_type: number;
    item_type_name_en: string;
    item_type_name_vn: string;
    icon_url: string;
}

// {
//     "id_list": 1,
//     "id_family": 96,
//     "id_shopping_list_type": 2,
//     "title": "Adu dark",
//     "description": "string",
//     "status": null,
//     "created_at": "2024-07-05T19:26:03.642Z",
//     "updated_at": "2024-07-05T19:26:03.642Z",
//     "listType": {
//       "id_shopping_list_type": 2,
//       "type_name_en": "Electronics",
//       "type_name_vn": "Đồ điện tử",
//       "icon_url": "https://drive.google.com/file/d/1Kfk42FkrBe3dfITrRApY0s7eKQUMYgGH/view?usp=sharing"
//     }
//   }

export interface ShoppingList {
    id_list: number;
    id_family: number;
    id_shopping_list_type: number;
    title: string;
    description: string;
    status: string | null;
    created_at: string;
    updated_at: string;
    listType: ShoppingListType;
    items?: ShoppingListItem[];
}

// {
//     "id_item": 1,
//     "id_list": 1,
//     "id_item_type": 2,
//     "item_name": "adu hell",
//     "description": "string",
//     "quantity": 2,
//     "is_purchased": false,
//     "priority_level": 100,
//     "reminder_date": "2024-08-01T00:00:00.000Z",
//     "price": "$200.00",
//     "created_at": "2024-07-05T19:29:47.607Z",
//     "updated_at": "2024-07-05T19:29:47.607Z",
//     "itemType": {
//       "id_item_type": 2,
//       "item_type_name_en": "Dairy",
//       "item_type_name_vn": "Các nguyên liệu từ sữa",
//       "icon_url": "https://drive.google.com/file/d/1AtTtJFvCVKahXBF9xdnxf7Tpdx35RYd1/view?usp=sharing"
//     },
//     "shoppingList": {
//       "id_list": 1,
//       "id_family": 96,
//       "id_shopping_list_type": 2,
//       "title": "Adu dark",
//       "description": "string",
//       "status": null,
//       "created_at": "2024-07-05T19:26:03.642Z",
//       "updated_at": "2024-07-05T19:26:03.642Z"
//     }
//   }

export interface ShoppingListItem {
    id_item: number;
    id_list: number;
    id_item_type: number;
    item_name: string;
    description: string;
    quantity: number;
    is_purchased: boolean;
    priority_level: number;
    reminder_date: string;
    price: number;
    created_at: string;
    updated_at: string;
    itemType: ShoppingListItemType;
    // shoppingList: ShoppingList;
}