import baseUrl from "./baseUrl";

const RoleUrl = {
    getAllRole: `${baseUrl}/api/v1/family/getFamilyRoles`,
    getRole: `${baseUrl}/api/v1/role/getRole`,
    assignRole:  `${baseUrl}/api/v1/family/assignFamilyRole`,
}
export default RoleUrl;