export const getAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? accessToken : null;
};

export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken ? refreshToken : null;
};

export const getAuthorizationHeader = () => `Bearer ${getAccessToken()}`;
export const getAuthorizationRefreshHeader = () => `Bearer ${getRefreshToken()}`;