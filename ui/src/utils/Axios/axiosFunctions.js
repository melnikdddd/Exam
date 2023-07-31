import axios from "./axios"

export const fetchPost = async (path, data) => {
    try {
        const response = await axios.post(path, data);

        if (!response.data.token) return {success: false, status: 500};
        return {success: true, data: response.data};

    } catch (error) {
        const status = error.response?.status || 500;

        if (status === 500){
            return {success: false, status: 500}
        }
        return {success: false, status: status}
    }
}

export const fetchGet = async (path) =>{
    try {
        const response = await axios.get(path);
        return {success: true, data: response.data};
    } catch (error) {
        const status = error.response?.status || 500;

        if (status === 500){
            return {success: false, status: 500}
        }
        return {success: false, status: status}
    }
}
export const fetchUpdate = async (path, data) =>{
    try {
        const response = await axios.patch(path, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },});

        return {success: true, data: response.data};
    } catch (error) {
        const status = error.response?.status || 500;

        if (status === 500){
            return {success: false, status: 500}
        }
        return {success: false, status: status}
    }
}
export const fetchUserByToken = async () =>{
    try {
        const response = await axios.get(`users/getUserByToken`);
        const userData = response.data?.userData

        return  userData ? userData : false;
    }
    catch (error){
        return false;
    }
}

