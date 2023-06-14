import axios from "@/config/axios";

const fetcher = async <T>(url: string, headers = {}): Promise<T | null> => {
    const { data } = await axios.get<T>(url, {
      headers,
      withCredentials: true,
    });

    return data;
};

export default fetcher;