import axios from "axios";
import { logoutRoute } from "./APIRoutes";



export function getToken() {
    const token = localStorage.getItem("token");
    console.log("getToken", token);
    return token ? token : null; 
}


export function getUser() {
    //console.log("getUser");
    const jsonString = localStorage.getItem("user");
    //console.log(jsonString);
    if (jsonString) {
        try {
            //console.log("getUser try");            
            const jsonObject = JSON.parse(jsonString);
            //console.log(jsonObject);
            return jsonObject;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }
    return null;
}

export function isUserLogged() {
    //console.log("isUserLogged");
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
    //localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY || 'user',JSON.stringify(data.user) );
    localStorage.setItem('userId', JSON.stringify(data.user._id));
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
}