import { AxiosResponse } from "axios";
import instance from "../httpInterceptor";
import RoleUrl from "../urls/roleUrls";
import LocalStorage from "src/store/localstorage";
import { ERROR_TEXTS } from "src/constants";


const RoleService ={
    getAllRole: async () => {
        try {
          const response: AxiosResponse = await instance.get(
            RoleUrl.getAllRole,
            
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
      assignRole: async (id_user: string, id_family: number, id_family_role: number ) => {
        try {
          const response: AxiosResponse = await instance.post(
            RoleUrl.assignRole,
            {
              id_user, id_family, id_family_role
            }
            
          );
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Failed to asign role');
          }
        } catch (error: any) {
            throw new Error('Failed to asign role');
        }
      },
}
export default RoleService;