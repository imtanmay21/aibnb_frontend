export const cacheQueries = {
    getAccessToken: () => {
        return localStorage.getItem("access_token");
    },
};
