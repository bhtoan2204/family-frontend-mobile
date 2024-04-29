import { AxiosResponse } from "axios";
import instance from "../httpInterceptor";
import RoleUrl from "../urls/roleUrls";
import LocalStorage from "../../store/localstorage";
import { ERROR_TEXTS } from "../../constants";


const RoleService ={
    getAllRole: async () => {
        try {
          const response: AxiosResponse = await instance.get(
            RoleUrl.getAllRole,
            {
              headers: {
                Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
              },
            },
          );
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Failed to get all role');
          }
        } catch (error: any) {
            throw new Error('Failed to get all role');
        }
      },
}
export default RoleService;