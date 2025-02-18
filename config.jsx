const apiUrl = import.meta.env.VITE_APP_API_URL;
const localStorageUserDetails = import.meta.env.VITE_SECURE_LOCAL_STORAGE_USER_KEY;
const localStorageUserToken = import.meta.env.VITE_SECURE_LOCAL_STORAGE_TOKEN_KEY;
const localStorageUserRefreshToken = import.meta.env.VITE_SECURE_LOCAL_STORAGE_REFRESH_TOKEN_KEY;
const VITE_MASTER_TABLE_LISTING = import.meta.env.VITE_MASTER_TABLE_LISTING
const VITE_WEB_SOCKET_URL = import.meta.env.VITE_WEB_SOCKET_URL
const VITE_STAFF_ROLE_EXECUTIVE_CODE = import.meta.env.VITE_STAFF_ROLE_EXECUTIVE_CODE
const VITE_STAFF_ROLE_TEAM_LEADER_CODE = import.meta.env.VITE_STAFF_ROLE_TEAM_LEADER_CODE




const config = {
    apiUrl: apiUrl,
    localStorageUserToken: localStorageUserToken,
    localStorageUserDetails: localStorageUserDetails,
    localStorageUserRefreshToken: localStorageUserRefreshToken,
    masterList: JSON.parse(VITE_MASTER_TABLE_LISTING),
    websocket: VITE_WEB_SOCKET_URL,
    staffRoleExecutive: VITE_STAFF_ROLE_EXECUTIVE_CODE,
    staffRoleTeamLeader: VITE_STAFF_ROLE_TEAM_LEADER_CODE,
};
export default config;