import axios from "./axios"

export const fetchPost = async (path, data) => {
    try {
        const response = await axios.post(path, data);

        if (!response.data.token) return {success: false, status: 500};
        return {success: true, data: response.data};

    } catch (error) {
        alert(error)
        return {success: false, status: error.response.status}
    }
}

