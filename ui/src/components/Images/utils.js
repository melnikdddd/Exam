
export function decodeBase64Image(data, ext) {
    if (!data){
        return  {userImage: process.env.PUBLIC_URL + "/user-avatar.png", isDefaultImage: true}
    }

    const base64 = arrayBufferToBase64(data);

    return {userImage: `data:image/${ext};base64,` + base64.toString('base64'), isDefaultImage: false}
}

export const defaultImage = () =>{
    return  {userImage: process.env.PUBLIC_URL + "/user-avatar.png", isDefaultImage: true};
}


export function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode.apply(null, buffer);
    return btoa(binary);
}