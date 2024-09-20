import axios from "axios";

const baseURL = String(import.meta.env.VITE_URI);

const apiClient2 = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
});

const apiClient = axios.create({
    baseURL : baseURL,
    headers:{
        'Content-Type' : 'application/json'
    }
})


const handleApiResponse = (apiCall) => {
    return new Promise((resolve, reject) => {
        apiCall
            .then((res) => resolve(res.data))
            .catch((error) => {
                const errorMessage = error.response?.data?.message;
                if (errorMessage) reject(errorMessage);
                else reject("unknown error");
            });
    });
};

export const login = (credentials) => handleApiResponse(
    apiClient.post(`${baseURL}/users/login`, {email : credentials.email , password : credentials.password} , {withCredentials:true})
);

export const logout = () => handleApiResponse(
    apiClient.post(`${baseURL}/users/logout` , {} , {withCredentials : true})
)

export const register = (credentials) => handleApiResponse(
    apiClient.post(`${baseURL}/users/register`, {...credentials} , {withCredentials : true})
);

export const forgetPassword = (credentials) => handleApiResponse(
    apiClient.post(`${baseURL}/users/forget-password`, {email : credentials.email}, { withCredentials: true })
);

export const newPassword = (credentials) => handleApiResponse(
    apiClient.post(`${baseURL}/users/new-password`, {...credentials}, { withCredentials: true })
);

export const refreshToken = () => handleApiResponse(
    apiClient.post(`${baseURL}/users/refresh-token`, {}, { withCredentials: true })
);

export const changePassword = (credentials) => handleApiResponse(
    apiClient.post(`${baseURL}/users/change-password`, {...credentials}, { withCredentials: true })
);

export const currentUser = () => handleApiResponse(
    apiClient.get(`${baseURL}/users/current-user`, { withCredentials: true })
);


export const uploadImage = (data) => handleApiResponse(
    apiClient2.post(`${baseURL}/plant/upload-image` , data , {withCredentials : true})
);

export const uploadedImages = () => handleApiResponse(
    apiClient.get(`${baseURL}/plant/uploaded-images` , {withCredentials : true})
);

export const getCounts = () => handleApiResponse(
    apiClient.get(`${baseURL}/plant/get-count` , {withCredentials : true})
);

export const leaderboard = () => handleApiResponse(
    apiClient.get(`${baseURL}/plant/get-leaderboard` , {withCredentials : true})
);

export const redeem = (data) => handleApiResponse(
    apiClient.patch(`${baseURL}/plant/redeem` ,data, {withCredentials : true})
);