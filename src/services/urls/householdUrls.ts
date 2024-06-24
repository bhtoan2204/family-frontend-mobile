const HouseHoldUrls = {
  getHouseHoldCategory: '/api/v1/household/getHouseholdCategory',
  getHouseHoldItem: '/api/v1/household/getHouseholdItem', // /{id_family}
  getHouseHoldItemDetail: '/api/v1/household/getHouseholdItemDetail', ///{id_family}/{id_item}
  createHouseHoldItem: '/api/v1/household/createHouseholdItem',
  updateHouseHoldItem: '/api/v1/household/updateHouseholdItem',
  updateConsumableItem: '/api/v1/household/inputHouseholdConsumableItem',
  getAllRoom: '/api/v1/room/getRooms', // /{id_family}
  createRoom: '/api/v1/room/createRoom',
  updateRoom: '/api/v1/room/updateRoom',
  deleteRoom: '/api/v1/room/deleteRoom',
};
export default HouseHoldUrls;
