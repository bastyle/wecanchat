import axios from "axios";
import { logoutRoute } from "./APIRoutes";
import { jwtDecode } from 'jwt-decode';

export function getToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    //console.log("getToken", token);
    return token ? token : null; 
}

export function getUser() {
    const jsonString = localStorage.getItem("user");
    if (jsonString) {
        try {
            const jsonObject = JSON.parse(jsonString);
            return jsonObject;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }
    return null;
}

export function isUserLogged() {
    const user = getUser();
    return user ? true : false;
}

export function isAdminUser() {
    if (!isUserLogged) return false;
    return getUser().profileId == 1 ? true : false;
}

export async function logoutUser() {
    localStorage.clear();
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    const response = await axios.get(logoutRoute + "/" + localStorage.getItem("userId"));
    console.log("Logout response:", response);
}

export function login(data) {
    localStorage.setItem('userId', JSON.stringify(data.user._id));
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
}

export function loginUpdate(data) {
    const token = data.token;
    const decodedToken = jwtDecode(token);
    console.log("decodedToken in loginUpdate:", decodedToken);
    localStorage.setItem('userId', JSON.stringify(decodedToken.userId));
    localStorage.setItem("user", JSON.stringify(decodedToken.user));
    localStorage.setItem("token", JSON.stringify(token));
}