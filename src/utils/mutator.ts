import axios from "@/config/axios";


const mutator = async <T>(url: string, body: Record<string, unknown> | null, method: 'post' | 'put' | 'delete')  => {
    switch(method) {
        case 'post': {
            const { data } = await axios.post<T>(url, body, {
                withCredentials: true 
            })
            return data;
        }
        case 'delete': {
            const { data } = await axios.delete<T>(url, {
                withCredentials: true 
            })
            return data;
        }
        case 'put': {
            const { data } = await axios.put<T>(url, body, {
                withCredentials: true 
            })
            return data;
        }
        default: throw new Error('Wrong method specified')
    }
}

export default mutator;