import baseUrl from './baseUrl';

const HouseHoldUrls = {
  getHouseHoldCategory: baseUrl + '/api/v1/household/getHouseholdCategory',
  getHouseHoldItem: baseUrl + '/api/v1/household/getHouseholdItem', // /{id_family}
  getHouseHoldItemDetail: baseUrl + '/api/v1/household/getHouseholdItemDetail', ///{id_family}/{id_item}
  createHouseHoldItem: baseUrl + '/api/v1/household/createHouseholdItem',
  updateHouseHoldItem: baseUrl + '/api/v1/household/updateHouseholdItem',
  updateConsumableItem:
    baseUrl + '/api/v1/household/inputHouseholdConsumableItem',
  getAllRoom: baseUrl + '/api/v1/room/getRooms', // /{id_family}
  createRoom: baseUrl + '/api/v1/room/createRoom',
  updateRoom: baseUrl + '/api/v1/room/updateRoom',
  deleteRoom: baseUrl + '/api/v1/room/deleteRoom',
  deleteHouseHoldItem: baseUrl + '/api/v1/household/deleteHouseholdItem',///{id_family}/{id_item}
};
export default HouseHoldUrls;
