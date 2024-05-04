import axios from "axios";

const userKey = import.meta.env.VITE_ACCESS_KEY;

export const getDataFromAPI = async (inputSearch, currentPage) => {
    const params = {
        params: {
            query: inputSearch,
            page: currentPage,
            per_page: 5
        },
        headers: {
            Authorization: `Client-ID ${userKey}`
        }
    };

    const response = axios.get(`https://api.unsplash.com/search/photos`, params);
    return response;
};
