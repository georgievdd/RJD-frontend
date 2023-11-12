import {API, PATH} from "../../consts";
import { showAlert } from "../../utils";
import {axiosInstance} from "../instance";


export const postLogin = (data, navigateTo) =>
    axiosInstance.post(API.LOGIN, data)
        .then(user => {
            window.localStorage.setItem('accessJwt', user.data.accessJwt);
        })
        .then(() => {
            console.log('home')
            navigateTo('/home')
        })
        .catch(e => {console.log(e); showAlert(e.response?.data?.message)});

export const postRegistration = (data, navigateTo) =>
    axiosInstance.post(API.REGISTRATION, data)
    .then(() => postLogin(data, navigateTo))
    .catch(e => showAlert(e.response?.data?.message));

export const getMe = () => 
    axiosInstance.get(API.ME)
    .catch(e => showAlert(e.response?.data?.message));