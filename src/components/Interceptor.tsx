import axios from "axios";
import {toast} from 'react-toastify'

export const Interceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            if (error.response?.status) {
                if (error.response.status === 400) {
                    console.error(error.response.data?.data);
                    console.error(error.response.data?.message);
                } else if (error.response.status === 401) {
                    console.error('Unauthorized', error.response.data?.message);
                    toast.error('Unauthorized');
                } else if (error.response.status === 403) {
                    console.error('Access forbidden', error.response.data?.message);
                    toast.error('Access forbidden');
                }
            }

            return Promise.reject(error.response);
        }
    );

    return null;
};
