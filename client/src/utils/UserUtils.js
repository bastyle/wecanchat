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
    return user?true:false;    
}

export function isAdminUser() {
    if(!isUserLogged) return false;
    return getUser().profileId==1?true:false;    
}