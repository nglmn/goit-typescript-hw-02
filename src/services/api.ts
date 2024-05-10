import axios, { AxiosResponse } from "axios";

const userKey = import.meta.env.VITE_ACCESS_KEY;
type ParamsObj = {
    params: {
        query: string;
        page: number;
        per_page: number;
    };
    headers: {
        Authorization: string
    };
}

export const getDataFromAPI = async<T>(inputSearch: string, currentPage: number): Promise<T> | never => {
    const params: ParamsObj = {
        params: {
            query: inputSearch,
            page: currentPage,
            per_page: 5,
        },
        headers: {
            Authorization: `Client-ID ${userKey}`
        }
    };
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, params);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data from API: ${error}`);
    }
};
